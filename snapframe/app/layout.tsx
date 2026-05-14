import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SnapFrame — Turn Screenshots into Visual Gold',
  description:
    'Transform raw social media screenshots into polished, shareable visual cards. Stop sharing ugly screenshots. Make your wins look intentional.',
  keywords: ['screenshot beautifier', 'social media', 'creator tools', 'snapframe'],
  openGraph: {
    title: 'SnapFrame — Screenshot Beautifier',
    description: 'Turn your social wins into beautiful proof.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}

function Nav() {
  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        background: 'rgba(10,10,15,0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {/* Logo */}
      <a
        href="/"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          textDecoration: 'none',
          color: 'var(--text-primary)',
          fontWeight: 700,
          fontSize: '18px',
          letterSpacing: '-0.02em',
        }}
      >
        <span
          style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14,
          }}
        >
          ✦
        </span>
        <span>
          Snap<span style={{ color: '#7c3aed' }}>Frame</span>
        </span>
      </a>

      {/* Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <a href="/app" className="btn-ghost" style={{ padding: '7px 16px', textDecoration: 'none', fontSize: '14px' }}>
          Editor
        </a>
        <a href="/pricing" className="btn-ghost" style={{ padding: '7px 16px', textDecoration: 'none', fontSize: '14px' }}>
          Pricing
        </a>
        <a
          href="/app"
          className="btn-accent"
          style={{ padding: '7px 18px', textDecoration: 'none', fontSize: '14px' }}
        >
          Try Free →
        </a>
      </div>
    </nav>
  );
}
