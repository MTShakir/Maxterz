// Converts the pdf2htmlEX exports in src/case-studies/source into site-native pages:
//  - text becomes real <h2>/<p> markup (crawlable, selectable, in reading order)
//  - the flat background image is cut into separate visual pieces (no single "page image")
//  - all geometry is expressed in cqw units, so the layout scales with CSS only (no JS)
// Output: src/case-studies/<slug>.{html,css} and public/case-study-assets/<slug>/*
//
// Run: node tools/build-case-studies.mjs
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const root = process.cwd();
const srcDir = path.join(root, 'src/case-studies/source');
const outData = path.join(root, 'src/case-studies');

const studies = {
  'mm-window-cleaning': { file: 'MM WINDOW CLEANING CASE STUDY.html', title: 'MM Window Cleaning', bg: [255, 255, 255] },
  bwld: { file: 'BWLD CASE STUDY.html', title: 'BWLD', bg: [255, 255, 255] },
  'areeka-o-karak': { file: 'AREEKA O KARAK CASE STUDY.html', title: 'Areeka O Karak', bg: [255, 251, 245] },
  'logo-and-graphic-design': { file: 'CASE STUDY LOGO AND GRAPHIC DESIGN.html', title: 'Logo & Graphic Design',
    bg: [255, 255, 255],
    // thin PDF page frame around the artwork: paint it out so slices join cleanly
    frame: 14,
    // this paragraph was outlined into the raster by the PDF export: paint it out and re-add as real text
    erase: [{ x: 150, y: 1940, w: 2061, h: 260 }],
    text: [
      {
        x: 219, y: 1965, w: 1860, size: 1.2, lh: 2.05, color: '#6b6b6b',
        body:
          "Indulge in the vibrant world of flavor at La Roma, where passion for food meets the fast-paced rhythm of urban life. As the creative mind shaping the identity of La Roma, I embarked on a culinary journey to capture the essence of quick, delicious, and unforgettable dining experiences. La Roma is not just a fast-food brand; it's a celebration of bold tastes, fresh ingredients, and a commitment to delivering mouthwatering moments to our patrons. The brand's visual identity is a fusion of modern aesthetics and the timeless allure of traditional flavors. From the dynamic logo that reflects the energy of our kitchen to the color palette that mirrors the diverse range of our menu, every design element is meticulously curated to enhance the sensory experience.",
      },
    ],
  },
};

const HEADING_MIN = 100; // canvas px (after the .m0 scale) above which a line is a heading
const hex = (rgb) => '#' + rgb.map((v) => v.toString(16).padStart(2, '0')).join('');

// ---------- CSS helpers ----------
function blocks(css) {
  const out = [];
  let depth = 0, start = 0;
  for (let i = 0; i < css.length; i++) {
    if (css[i] === '{') depth++;
    else if (css[i] === '}') {
      depth--;
      if (depth === 0) { out.push(css.slice(start, i + 1).trim()); start = i + 1; }
    }
  }
  return out;
}
function scope(css, sc) {
  return blocks(css).map((b) => {
    const open = b.indexOf('{');
    const head = b.slice(0, open).trim();
    const body = b.slice(open + 1, -1);
    if (head.startsWith('@font-face') || head.startsWith('@media print')) return '';
    if (head.startsWith('@media')) return `${head}{${scope(body, sc)}}`;
    if (head.startsWith('@')) return b;
    return head.split(',').map((s) => `${sc} ${s.trim()}`).join(',') + `{${body}}`;
  }).join('\n');
}

const base = `.pf{position:relative;overflow:hidden;margin:0;border:0}.pc{position:absolute;border:0;padding:0;margin:0;top:0;left:0;width:100%;height:100%;overflow:hidden;display:block;transform-origin:0 0}.bs{position:absolute;left:0;width:100%;background-repeat:no-repeat;background-size:100% 100%;user-select:none;-webkit-user-select:none;pointer-events:none}.t{position:absolute;white-space:pre;font-size:1px;transform-origin:0 100%;unicode-bidi:bidi-override}.t:after{content:''}.t:before{content:'';display:inline-block}.t span{position:relative;unicode-bidi:bidi-override}._{display:inline-block;color:transparent;z-index:-1}h2,p{display:contents;margin:0;padding:0;font:inherit}p.cs-extra{display:block;position:absolute;text-align:center;font-weight:500}`;

// ---------- fragment helpers ----------
const num = (css, re) => { const m = css.match(re); return m ? parseFloat(m[1]) : 0; };
const strip = (h) => h.replace(/<[^>]+>/g, '').replace(/&apos;/g, "'").replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();

function parseLines(frag, css) {
  const lines = [];
  for (const m of frag.matchAll(/<div class="t ([^"]*)">([\s\S]*?)<\/div>/g)) {
    const cls = m[1].split(' ');
    const find = (re) => cls.find((c) => re.test(c));
    const fs = find(/^fs\d+$/), mc = find(/^m\d+$/), xc = find(/^x[0-9a-f]+$/), yc = find(/^y[0-9a-f]+$/);
    const scale = num(css, new RegExp(`\\.${mc}\\{transform:matrix\\(([\\d.]+)`)) || 1;
    lines.push({
      cls: m[1],
      inner: m[2],
      text: strip(m[2]),
      size: num(css, new RegExp(`\\.${fs}\\{font-size:([\\d.]+)px`)) * scale,
      x: num(css, new RegExp(`\\.${xc}\\{left:([\\d.]+)px`)),
      y: num(css, new RegExp(`\\.${yc}\\{bottom:([\\d.]+)px`)),
      rotated: mc !== 'm0',
    });
  }
  return lines;
}

const isDecor = (l) => l.rotated || /^(.{3,}?)\s+\1\s+\1/.test(l.text) || l.text === '“';
const line = (l, extra = '') => `<span class="t ${l.cls}"${extra}>${l.inner}</span>`;

function buildText(lines) {
  const real = lines.filter((l) => l.text && !isDecor(l)).sort((a, b) => b.y - a.y || a.x - b.x);
  const decor = lines.filter((l) => l.text && isDecor(l));
  const groups = [];
  for (const l of real) {
    const head = l.size >= HEADING_MIN;
    const g = groups[groups.length - 1];
    const prev = g && g.lines[g.lines.length - 1];
    let join = false;
    if (g && g.head === head && prev) {
      const dy = prev.y - l.y;
      if (head) join = dy < prev.size * 1.3 && Math.abs(prev.x - l.x) < 800;
      else join = dy < l.size * 2.4 && Math.abs(prev.size - l.size) < 1;
    }
    if (join) g.lines.push(l);
    else groups.push({ head, lines: [l] });
  }
  const html = groups.map((g) => {
    const tag = g.head ? 'h2' : 'p';
    return `<${tag}>${g.lines.map((l) => line(l)).join(' ')}</${tag}>`;
  });
  const dec = decor.map((l) => line(l, ' aria-hidden="true"'));
  return html.concat(dec).join('\n');
}

// ---------- background slicing ----------
async function slicePieces(buf, bg, outDir, label) {
  const { data, info } = await sharp(buf, { limitInputPixels: false }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;
  const x0 = Math.floor(W * 0.03), x1 = Math.ceil(W * 0.97);
  const blank = new Uint8Array(H);
  for (let y = 0; y < H; y++) {
    let ok = 1;
    for (let x = x0; x < x1 && ok; x += 3) {
      const i = (y * W + x) * 3;
      if (Math.abs(data[i] - bg[0]) > 3 || Math.abs(data[i + 1] - bg[1]) > 3 || Math.abs(data[i + 2] - bg[2]) > 3) ok = 0;
    }
    blank[y] = ok;
  }
  // content chunks = maximal runs of non-blank rows, bridging blank gaps < 6 rows
  const chunks = [];
  let y = 0;
  while (y < H) {
    while (y < H && blank[y]) y++;
    if (y >= H) break;
    const start = y;
    let end = y;
    while (y < H) {
      if (!blank[y]) { end = y; y++; continue; }
      let g = y; while (g < H && blank[g]) g++;
      if (g - y < 6 && g < H) { y = g; continue; }
      break;
    }
    chunks.push([Math.max(0, start - 1), Math.min(H - 1, end + 1)]);
  }
  const pieces = [];
  let n = 0;
  for (const [a, b] of chunks) {
    // split very tall chunks so no single file reproduces a whole page
    const maxH = 2200;
    const parts = Math.ceil((b - a + 1) / maxH);
    const ph = Math.ceil((b - a + 1) / parts);
    for (let p = 0; p < parts; p++) {
      const top = a + p * ph, h = Math.min(ph, b - top + 1);
      const name = `part-${++n}.webp`;
      await sharp(buf, { limitInputPixels: false }).extract({ left: 0, top, width: W, height: h }).webp({ quality: 88 }).toFile(path.join(outDir, name));
      pieces.push({ name, top, h });
    }
  }
  return { pieces, H, W, label };
}

// ---------- main ----------
const extMap = { 'image/png': 'png', 'application/font-woff': 'woff', 'image/svg+xml': 'svg' };

for (const [slug, cfg] of Object.entries(studies)) {
  const html = fs.readFileSync(path.join(srcDir, cfg.file), 'utf8');
  const assetDir = path.join(root, 'public/case-study-assets', slug);
  fs.rmSync(assetDir, { recursive: true, force: true });
  fs.mkdirSync(assetDir, { recursive: true });

  let fontN = 0, bgBuf = null;
  const cache = new Map();
  const extract = (mime, b64) => {
    const key = b64.length + b64.slice(0, 100);
    if (cache.has(key)) return cache.get(key);
    let url;
    if (mime === 'image/png') { bgBuf = Buffer.from(b64, 'base64'); url = '/bg'; }
    else if (mime.includes('font')) { const name = `font-${++fontN}.woff`; fs.writeFileSync(path.join(assetDir, name), Buffer.from(b64, 'base64')); url = `/case-study-assets/${slug}/${name}`; }
    else url = '';
    cache.set(key, url);
    return url;
  };
  const rewrite = (s) => s.replace(/data:([a-z]+\/[a-z0-9.+-]+);base64,([A-Za-z0-9+\/=]+)/g, (_, m, d) => extract(m, d));

  const styles = [...html.matchAll(/<style type="text\/css">([\s\S]*?)<\/style>/g)].map((m) => m[1]);
  // the page's own bg png lives in the <img class="bi"> in the body — extract it there
  const body = html.match(/<div id="page-container">\s*([\s\S]*?)\s*<\/div>\s*<div class="loading-indicator">/)[1];
  const frag = rewrite(body);
  let custom = rewrite(styles[2]);
  custom = custom
    .replace(/\.ff(\d+)\{font-family:ff\1;/g, (_, k) => `.ff${k}{font-family:cs-${slug}-ff${k};`)
    .replace(/@font-face\{font-family:ff(\d+)/g, (_, k) => `@font-face{font-family:cs-${slug}-ff${k}`);

  const cw = num(custom, /\.w0\{width:([\d.]+)px/), ch = num(custom, /\.h0\{height:([\d.]+)px/);
  const faces = (custom.match(/@font-face\{[^}]*\}/g) || []).map((f) => f.replace(/url\('[^']*(\/case-study-assets[^']*)'\)/, "url('$1')"));
  const sc = `.cs-${slug}`;
  let css = scope(base, sc) + '\n' + scope(custom.replace(/@font-face\{[^}]*\}/g, ''), sc);
  css += `\n${sc} .pf{background-color:${hex(cfg.bg)}}`;

  if (cfg.frame || cfg.erase) {
    const md = await sharp(bgBuf, { limitInputPixels: false }).metadata();
    const F = cfg.frame || 0;
    const rects = [...(cfg.erase || [])];
    if (F) rects.push({ x: 0, y: 0, w: F, h: md.height }, { x: md.width - F, y: 0, w: F, h: md.height }, { x: 0, y: 0, w: md.width, h: F }, { x: 0, y: md.height - F, w: md.width, h: F });
    const bgc = { r: cfg.bg[0], g: cfg.bg[1], b: cfg.bg[2] };
    bgBuf = await sharp(bgBuf, { limitInputPixels: false })
      .composite(rects.map((r) => ({ input: { create: { width: r.w, height: r.h, channels: 3, background: bgc } }, left: r.x, top: r.y })))
      .png().toBuffer();
  }
  const { pieces, H: imgH, W: imgW } = await slicePieces(bgBuf, cfg.bg, assetDir, slug);

  // px -> cqw so the whole canvas scales with its container, in pure CSS
  css = css.replace(/(-?[\d.]+)px/g, (_, v) => `${+((parseFloat(v) / cw) * 100).toFixed(5)}cqw`);
  css = faces.join('\n') + '\n' + css;

  const visuals = pieces.map((p, i) =>
    `<div class="bs" role="img" aria-label="${cfg.title} project visual ${i + 1}" style="top:${((p.top / imgH) * 100).toFixed(4)}%;height:${((p.h / imgH) * 100).toFixed(4)}%;background-image:url('/case-study-assets/${slug}/${p.name}')"></div>`).join('\n');

  const lines = parseLines(frag.replace(/<div class="pi"[^>]*><\/div>/, ''), custom);
  const text = buildText(lines);
  const extra = (cfg.text || []).map((t) => {
    const body = t.body.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    const pos = `left:${((t.x / imgW) * 100).toFixed(4)}%;top:${((t.y / imgH) * 100).toFixed(4)}%;width:${((t.w / imgW) * 100).toFixed(4)}%`;
    return `<p class="cs-extra" style="${pos};font-size:${t.size}cqw;line-height:${t.lh}cqw;color:${t.color}">${body}</p>`;
  }).join('\n');
  const out = `<div class="pf w0 h0"><div class="pc w0 h0">\n${visuals}\n${text}\n${extra}\n</div></div>`;
  fs.writeFileSync(path.join(outData, `${slug}.html`), out);
  fs.writeFileSync(path.join(outData, `${slug}.css`), css);
  console.log(slug, { canvas: [cw, ch], pieces: pieces.length, lines: lines.length, headings: (text.match(/<h2>/g) || []).length, paras: (text.match(/<p>/g) || []).length });
}
