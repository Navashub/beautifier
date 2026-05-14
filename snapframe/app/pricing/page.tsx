import Link from 'next/link';

export const metadata = {
  title: 'Pricing — SnapFrame',
  description: 'Simple, creator-friendly pricing. Start free, upgrade when you need more.',
};

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: 'forever',
    desc: 'Perfect for trying it out',
    cta: 'Get started free',
    ctaHref: '/app',
    featured: false,
    features: [
      '5 exports per month',
      'SnapFrame watermark on exports',
      '3 background presets',
      'All 6 platform presets',
      'Manual stats bar input',
      'PNG export only',
    ],
    missing: [
      'No project saving',
      'No custom backgrounds',
      'No watermark removal',
    ],
  },
  {
    id: 'creator',
    name: 'Creator',
    price: '$9',
    period: 'per month',
    desc: 'For active creators and influencers',
    cta: 'Start Creator plan',
    ctaHref: '/app',
    featured: true,
    features: [
      'Unlimited exports',
      'No watermark',
      'All gradient presets + custom backgrounds',
      'Save up to 20 projects',
      'PNG, JPG & WebP export',
      '2x retina resolution export',
      'Priority support',
    ],
    missing: [],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$19',
    period: 'per month',
    desc: 'For agencies and power users',
    cta: 'Start Pro plan',
    ctaHref: '/app',
    featured: false,
    features: [
      'Everything in Creator',
      'Unlimited saved projects',
      'Brand kit (colors, fonts, logo)',
      'Bulk upload (up to 10 screenshots)',
      'API access (coming soon)',
      'Dedicated support',
    ],
    missing: [],
  },
];

const COMPARE_ROWS = [
  { feature: 'Monthly exports',         free: '5', creator: 'Unlimited', pro: 'Unlimited' },
  { feature: 'Watermark on exports',    free: '✓ Yes', creator: '✗ Removed', pro: '✗ Removed' },
  { feature: 'Platform presets',        free: 'All 6', creator: 'All 6', pro: 'All 6' },
  { feature: 'Custom backgrounds',      free: '✗', creator: '✓', pro: '✓' },
  { feature: 'Export formats',          free: 'PNG', creator: 'PNG/JPG/WebP', pro: 'PNG/JPG/WebP' },
  { feature: '2x retina resolution',    free: '✗', creator: '✓', pro: '✓' },
  { feature: 'Save projects',           free: '✗', creator: 'Up to 20', pro: 'Unlimited' },
  { feature: 'Brand kit',               free: '✗', creator: '✗', pro: '✓' },
  { feature: 'Bulk upload',             free: '✗', creator: '✗', pro: '✓' },
  { feature: 'API access',              free: '✗', creator: '✗', pro: 'Soon' },
];

export default function PricingPage() {
  return (
    <div style={{ paddingTop: 60 }}>
      {/* Header */}
      <section style={{ textAlign: 'center', padding: '80px 24px 60px' }}>
        <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 12 }}>
          Pricing
        </p>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 56px)', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: 16 }}>
          Creator-friendly pricing.
          <br />
          <span className="gradient-text">No BS.</span>
        </h1>
        <p style={{ fontSize: 18, color: 'var(--text-secondary)', maxWidth: 480, margin: '0 auto' }}>
          Start free. No credit card. Upgrade when your screenshots deserve better.
        </p>
      </section>

      {/* Plans */}
      <section style={{ padding: '0 24px 80px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              style={{
                borderRadius: 20,
                border: plan.featured ? '1px solid var(--accent)' : '1px solid var(--border)',
                background: plan.featured ? 'linear-gradient(160deg, rgba(124,58,237,0.08), var(--bg-card))' : 'var(--bg-card)',
                padding: 28,
                position: 'relative',
                boxShadow: plan.featured ? '0 0 40px rgba(124,58,237,0.15)' : 'none',
              }}
            >
              {plan.featured && (
                <div style={{
                  position: 'absolute',
                  top: -12,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'linear-gradient(135deg,#7c3aed,#06b6d4)',
                  color: 'white',
                  fontSize: 11,
                  fontWeight: 700,
                  padding: '3px 12px',
                  borderRadius: 99,
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.04em',
                }}>
                  ✦ MOST POPULAR
                </div>
              )}

              <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>{plan.name}</h2>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 20 }}>{plan.desc}</p>

              <div style={{ marginBottom: 24 }}>
                <span style={{ fontSize: 42, fontWeight: 900, letterSpacing: '-0.04em' }}>{plan.price}</span>
                <span style={{ fontSize: 14, color: 'var(--text-muted)', marginLeft: 6 }}>/{plan.period}</span>
              </div>

              <Link
                href={plan.ctaHref}
                style={{
                  display: 'block',
                  textAlign: 'center',
                  textDecoration: 'none',
                  padding: '11px 20px',
                  borderRadius: 10,
                  fontWeight: 600,
                  fontSize: 14,
                  marginBottom: 24,
                  ...(plan.featured
                    ? { background: 'linear-gradient(135deg,#7c3aed,#6d28d9)', color: 'white', boxShadow: '0 0 20px rgba(124,58,237,0.3)' }
                    : { background: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border)' }),
                }}
              >
                {plan.cta}
              </Link>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {plan.features.map((f) => (
                  <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
                    <span style={{ color: 'var(--success)', flexShrink: 0, marginTop: 1 }}>✓</span> {f}
                  </div>
                ))}
                {plan.missing.map((f) => (
                  <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: 'var(--text-muted)' }}>
                    <span style={{ flexShrink: 0 }}>✗</span> {f}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section style={{ padding: '0 24px 80px', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', paddingTop: 60 }}>
          <h2 style={{ textAlign: 'center', fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 40 }}>
            Full comparison
          </h2>
          <div style={{ borderRadius: 16, border: '1px solid var(--border)', overflow: 'hidden' }}>
            {/* Header */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', background: 'var(--bg-card)', padding: '12px 20px', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Feature</span>
              {['Free', 'Creator', 'Pro'].map((h) => (
                <span key={h} style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', textAlign: 'center' }}>{h}</span>
              ))}
            </div>
            {COMPARE_ROWS.map((row, i) => (
              <div
                key={row.feature}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1fr 1fr',
                  padding: '11px 20px',
                  borderBottom: i < COMPARE_ROWS.length - 1 ? '1px solid var(--border)' : 'none',
                  background: i % 2 === 0 ? 'transparent' : 'var(--bg-hover)',
                }}
              >
                <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{row.feature}</span>
                {[row.free, row.creator, row.pro].map((val, j) => (
                  <span
                    key={j}
                    style={{
                      fontSize: 12,
                      textAlign: 'center',
                      color: val.startsWith('✓') ? 'var(--success)'
                           : val.startsWith('✗') ? 'var(--text-muted)'
                           : 'var(--text-primary)',
                      fontWeight: val.startsWith('✓') || val.startsWith('✗') ? 600 : 400,
                    }}
                  >
                    {val}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ textAlign: 'center', padding: '80px 24px' }}>
        <h2 style={{ fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 12 }}>
          Ready to make your screenshots shine?
        </h2>
        <p style={{ fontSize: 16, color: 'var(--text-secondary)', marginBottom: 32 }}>
          No account required to start. Free, forever.
        </p>
        <Link href="/app" className="btn-accent" style={{ fontSize: 16, padding: '14px 36px', textDecoration: 'none' }}>
          ✦ Beautify a Screenshot
        </Link>
      </section>

      {/* Footer */}
      <footer style={{ padding: '24px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <span style={{ fontSize: 13, fontWeight: 700 }}>✦ Snap<span style={{ color: '#7c3aed' }}>Frame</span></span>
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>© 2026 SnapFrame · Built for creators</span>
      </footer>
    </div>
  );
}
