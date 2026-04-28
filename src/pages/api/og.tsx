import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

const SITE_HOST = 'alchemistjacks.com';

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

const clipText = { display: 'inline-block' as const };

const goldTitle = {
  ...clipText,
  backgroundImage:
    'linear-gradient(168deg, #fffef5 0%, #ffe066 18%, #e6b800 38%, #b8860b 58%, #7a5c0e 82%, #3d2a05 100%)',
  backgroundClip: 'text',
  color: 'transparent',
} as const;

const nickelTitle = {
  ...clipText,
  backgroundImage:
    'linear-gradient(to bottom right, #64748b, #e2e8f0, #334155)',
  backgroundClip: 'text',
  color: 'transparent',
} as const;

const accentWord = {
  ...clipText,
  backgroundImage:
    'linear-gradient(to bottom right, rgba(238,230,208,0.95), rgba(190,154,68,0.95), rgba(88,62,30,0.95))',
  backgroundClip: 'text',
  color: 'transparent',
} as const;

function splitAlchemistTitle(
  siteName: string
): { prefix: string; suffix: string } | null {
  const i = siteName.indexOf('Jack');
  if (i <= 0) return null;
  return { prefix: siteName.slice(0, i), suffix: siteName.slice(i) };
}

export default function handler(req: Request) {
  const { searchParams } = new URL(req.url);
  const siteName =
    searchParams.get('siteName')?.trim().slice(0, 140) ?? "AlchemistJack's";
  const description =
    searchParams.get('description')?.trim().slice(0, 320) ?? '';
  const templateTitle = searchParams.get('templateTitle')?.trim().slice(0, 140);

  const brandSplit =
    !templateTitle && siteName.includes('Jack')
      ? splitAlchemistTitle(siteName)
      : null;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          padding: 72,
          background:
            'linear-gradient(152deg, #0e1111 0%, #151c1c 42%, #0a0c0c 100%)',
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 8,
            background:
              'linear-gradient(90deg, rgb(238,230,208), rgb(190,154,68), rgb(88,62,30))',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 56,
            left: 72,
            right: 72,
            height: 2,
            background: 'rgba(190,154,68,0.25)',
          }}
        />

        {templateTitle ? (
          <>
            <div
              style={{
                fontSize: 64,
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                color: '#f1f5f9',
                marginBottom: 24,
              }}
            >
              {templateTitle}
            </div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 600,
                color: 'rgba(190,154,68,0.9)',
                marginBottom: 28,
              }}
            >
              {siteName}
            </div>
          </>
        ) : brandSplit ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'baseline',
              fontSize: 72,
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
              marginBottom: 32,
            }}
          >
            <span style={accentWord}>{brandSplit.prefix}</span>
            <span style={nickelTitle}>{brandSplit.suffix}</span>
          </div>
        ) : (
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
              marginBottom: 32,
            }}
          >
            <span style={goldTitle}>{siteName}</span>
          </div>
        )}

        <div
          style={{
            fontSize: templateTitle ? 30 : 34,
            fontWeight: 500,
            lineHeight: 1.45,
            color: 'rgba(226,232,240,0.88)',
            maxWidth: 980,
          }}
        >
          {description}
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 40,
            right: 72,
            fontSize: 22,
            fontWeight: 600,
            color: 'rgba(148,163,184,0.85)',
          }}
        >
          {SITE_HOST}
        </div>
      </div>
    ),
    { width: OG_WIDTH, height: OG_HEIGHT }
  );
}
