import { ImageResponse } from 'next/og';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export const runtime = 'nodejs';
export const alt = 'Maxterz | Web Design, Branding and AI Agency';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const iconData = readFileSync(join(process.cwd(), 'public', 'images', 'maxterz-icon.svg'));
  const iconSrc = `data:image/svg+xml;base64,${iconData.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1044ff 0%, #0020bf 100%)',
          padding: '80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* White dot pattern overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Icon */}
        <img
          src={iconSrc}
          width={80}
          height={80}
          alt=""
          style={{ marginBottom: '32px', position: 'relative', zIndex: 1 }}
        />

        {/* Wordmark */}
        <div
          style={{
            fontSize: '72px',
            fontWeight: 900,
            color: '#ffffff',
            letterSpacing: '-2px',
            lineHeight: 1,
            position: 'relative',
            zIndex: 1,
            marginBottom: '20px',
          }}
        >
          Maxterz
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '28px',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.75)',
            position: 'relative',
            zIndex: 1,
            maxWidth: '600px',
            lineHeight: 1.4,
          }}
        >
          One Hub, Endless Digital Solutions
        </div>
      </div>
    ),
    { ...size }
  );
}
