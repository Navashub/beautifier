'use client';

import Link from 'next/link';

const PLATFORMS = [
  { name: 'Instagram', icon: '📸', gradient: 'linear-gradient(135deg,#f9a825,#e91e8c,#9c27b0)', preset: 'Golden Hour', desc: 'Warm amber gradients, serif fonts' },
  { name: 'Twitter/X', icon: '𝕏',  gradient: 'linear-gradient(135deg,#0f1923,#1a2a3a)',         preset: 'Dark Mode',   desc: 'Near-black, minimal, clean' },
  { name: 'TikTok',   icon: '♪',  gradient: 'linear-gradient(135deg,#010101,#69c9d0,#ee1d52)',   preset: 'Viral Clip', desc: 'Hot pink-black, bold fonts' },
  { name: 'YouTube',  icon: '▶',  gradient: 'linear-gradient(135deg,#0f0f0f,#ff0000)',            preset: 'Studio',     desc: 'Deep red accent, dark bg' },
  { name: 'LinkedIn', icon: 'in', gradient: 'linear-gradient(135deg,#0a66c2,#064499)',            preset: 'Professional', desc: 'Navy, corporate clean' },
  { name: 'Facebook', icon: 'f',  gradient: 'linear-gradient(135deg,#1877f2,#1a6ae0)',            preset: 'Highlight',  desc: 'Blue gradient, rounded' },
];

const FEATURES = [
  { icon: '⚡', title: 'One-second wow', desc: 'Your beautified preview appears the moment you upload. No waiting, no loading spinners.' },
  { icon: '🎨', title: 'Platform presets', desc: '6 curated presets matching Instagram, TikTok, Twitter/X, YouTube, LinkedIn and Facebook vibes.' },
  { icon: '📊', title: 'Stats bar overlay', desc: 'Manually add likes, comments, shares and views in a beautiful stylized bar at the bottom.' },
  { icon: '🌈', title: 'Rich backgrounds', desc: 'Gradients, solid colors, your own image, blur bokeh, or glassmorphism — all live-updating.' },
  { icon: '📐', title: 'Aspect ratio presets', desc: 'Export at 1:1, 9:16, 16:9 or 4:5 — perfectly sized for every feed and story format.' },
  { icon: '🔎', title: 'Auto detection', desc: 'Color fingerprinting detects your platform automatically and applies the matching preset.' },
];

const STEPS = [
  { n: '01', title: 'Upload', desc: 'Drag & drop or pick your screenshot — PNG, JPG or WebP, up to 10MB.' },
  { n: '02', title: 'Detect', desc: 'Platform auto-detected. Confirm or pick manually. Preset loads instantly.' },
  { n: '03', title: 'Customize', desc: 'Tweak background, padding, shadow, stats bar and caption to taste.' },
  { n: '04', title: 'Export', desc: 'Download PNG/JPG/WebP in 1x or 2x resolution, or copy to clipboard.' },
];

export default function LandingPage() {
  return (
    <div style={{ paddingTop: 60 }}>
      {/* ── HERO ── */}
      <section style={{
        minHeight: 'calc(100vh - 60px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '80px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)',
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '5px 14px', borderRadius: 99,
          background: 'rgba(124,58,237,0.1)',
          border: '1px solid rgba(124,58,237,0.3)',
          marginBottom: 28,
          fontSize: 12, fontWeight: 600, color: '#c4b5fd',
        }}>
          <div className="pulse-dot" /> Now in public beta · free to try
        </div>

        <h1 style={{
          fontSize: 'clamp(36px, 6vw, 72px)',
          fontWeight: 900,
          lineHeight: 1.08,
          letterSpacing: '-0.04em',
          marginBottom: 24,
          maxWidth: 800,
        }}>
          Stop sharing{' '}
          <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>ugly</span>{' '}
          screenshots.
          <br />
          <span className="gradient-text">Make them beautiful.</span>
        </h1>

        <p style={{
          fontSize: 'clamp(16px, 2vw, 20px)',
          color: 'var(--text-secondary)',
          maxWidth: 560,
          lineHeight: 1.6,
          marginBottom: 40,
        }}>
          SnapFrame wraps your social media screenshots in polished, branded frames with engagement stats — ready to share in seconds.
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/app" className="btn-accent" style={{ fontSize: 16, padding: '14px 32px', textDecoration: 'none' }}>
            ✦ Beautify a Screenshot — free
          </Link>
          <Link href="/pricing" className="btn-ghost" style={{ fontSize: 16, padding: '14px 24px', textDecoration: 'none' }}>
            See pricing →
          </Link>
        </div>

        {/* Social proof */}
        <p style={{ marginTop: 24, fontSize: 13, color: 'var(--text-muted)' }}>
          No account required · 5 free exports per month
        </p>
      </section>

      {/* ── PLATFORM PRESETS SHOWCASE ── */}
      <section style={{ padding: '80px 24px', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ textAlign: 'center', fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 12 }}>
            Platform Presets
          </p>
          <h2 style={{ textAlign: 'center', fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 48 }}>
            One click. Right vibe.
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
            {PLATFORMS.map((p) => (
              <div
                key={p.name}
                style={{
                  borderRadius: 16,
                  overflow: 'hidden',
                  border: '1px solid var(--border)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.4)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = '';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '';
                }}
              >
                <div style={{ height: 100, background: p.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 36, fontWeight: 900, color: 'rgba(255,255,255,0.9)' }}>{p.icon}</span>
                </div>
                <div style={{ padding: '12px', background: 'var(--bg-card)' }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>{p.preset}</p>
                  <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>{p.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p style={{ textAlign: 'center', fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 12 }}>
            How it works
          </p>
          <h2 style={{ textAlign: 'center', fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 56 }}>
            Upload → Customize → Export
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 24 }}>
            {STEPS.map((step) => (
              <div key={step.n} style={{ textAlign: 'center' }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 16,
                  background: 'var(--accent-glow)', border: '1px solid var(--accent)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 16px',
                  fontSize: 13, fontWeight: 800, color: '#c4b5fd', fontFamily: 'monospace',
                }}>
                  {step.n}
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{step.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding: '80px 24px', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ textAlign: 'center', fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 12 }}>
            Features
          </p>
          <h2 style={{ textAlign: 'center', fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 48 }}>
            Everything creators need
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {FEATURES.map((f) => (
              <div key={f.title} className="glass-card" style={{ padding: 24 }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING TEASER ── */}
      <section style={{ padding: '80px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 12 }}>
          Simple, creator-friendly pricing
        </h2>
        <p style={{ fontSize: 16, color: 'var(--text-secondary)', marginBottom: 32 }}>
          Start free. Upgrade when you need more.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/app" className="btn-accent" style={{ fontSize: 15, padding: '12px 28px', textDecoration: 'none' }}>
            Start for free
          </Link>
          <Link href="/pricing" className="btn-ghost" style={{ fontSize: 15, padding: '12px 28px', textDecoration: 'none' }}>
            View pricing
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        padding: '24px',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
      }}>
        <span style={{ fontSize: 13, fontWeight: 700 }}>
          ✦ Snap<span style={{ color: '#7c3aed' }}>Frame</span>
        </span>
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
          © 2026 SnapFrame · Built for creators
        </span>
      </footer>
    </div>
  );
}
