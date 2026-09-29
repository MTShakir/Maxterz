#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const EXTRACTION_REGEX = {
  metadata: /export\s+const\s+metadata\s*=\s*\{([\s\S]*?)\n\};/,
  title: /title:\s*(['"`])((?:(?!\1).)*)\1/,
  description: /description:\s*(['"`])((?:(?!\1).)*)\1/,
};

function findPageFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findPageFiles(fullPath, files);
    } else if (entry.isFile() && entry.name === 'page.jsx') {
      files.push(fullPath);
    }
  }

  return files;
}

function urlFromPageFile(appDir, filePath) {
  const relative = path.relative(appDir, path.dirname(filePath));
  if (!relative || relative === '.') return '/';

  const segments = relative.split(path.sep).filter(Boolean);
  // Skip dynamic segments like [id] - no concrete URL to list.
  if (segments.some((segment) => segment.startsWith('['))) return null;

  return `/${segments.join('/')}`;
}

function extractMetadata(content) {
  const metadataMatch = content.match(EXTRACTION_REGEX.metadata);
  if (!metadataMatch) return null;

  const metadataBlock = metadataMatch[1];
  const titleMatch = metadataBlock.match(EXTRACTION_REGEX.title);
  const descMatch = metadataBlock.match(EXTRACTION_REGEX.description);

  if (!titleMatch && !descMatch) return null;

  return {
    title: titleMatch?.[2] || 'Untitled Page',
    description: descMatch?.[2] || 'No description available',
  };
}

function processPageFile(appDir, filePath) {
  try {
    const url = urlFromPageFile(appDir, filePath);
    if (!url) return null;

    const content = fs.readFileSync(filePath, 'utf8');
    const metadata = extractMetadata(content);
    if (!metadata) return null;

    return { url, ...metadata };
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return null;
  }
}

function generateLlmsTxt(pages) {
  const sortedPages = pages.sort((a, b) => a.title.localeCompare(b.title));
  const pageEntries = sortedPages
    .map((page) => `- [${page.title}](${page.url}): ${page.description}`)
    .join('\n');

  return `## Pages\n${pageEntries}`;
}

function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function main() {
  const appDir = path.join(process.cwd(), 'src', 'app');
  const pageFiles = findPageFiles(appDir);

  const pages = pageFiles
    .map((filePath) => processPageFile(appDir, filePath))
    .filter(Boolean);

  if (pages.length === 0) {
    console.error('No pages with metadata found!');
    process.exit(1);
  }

  const llmsTxtContent = generateLlmsTxt(pages);
  const outputPath = path.join(process.cwd(), 'public', 'llms.txt');

  ensureDirectoryExists(path.dirname(outputPath));
  fs.writeFileSync(outputPath, llmsTxtContent, 'utf8');
}

const isMainModule = import.meta.url === `file://${process.argv[1]}`;

if (isMainModule) {
  main();
}
