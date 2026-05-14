'use client';

import type { CanvasState } from '@/types';

interface PaddingControlsProps {
  state: CanvasState;
  onChange: (updates: Partial<CanvasState>) => void;
}

type AspectRatioOption = { id: string; label: string; desc: string };

const ASPECT_RATIOS: AspectRatioOption[] = [
  { id: '1:1',   label: '1:1',   desc: 'Square' },
  { id: '9:16',  label: '9:16',  desc: 'Stories' },
  { id: '16:9',  label: '16:9',  desc: 'YouTube' },
  { id: '4:5',   label: '4:5',   desc: 'Feed' },
  { id: 'custom',label: 'Free',  desc: 'Custom' },
];

function PaddingSlider({
  label, value, onChange,
}: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{label}</span>
        <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--accent)', fontFamily: 'monospace' }}>
          {value}px
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={120}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="sf-slider"
      />
    </div>
  );
}

export function PaddingControls({ state, onChange }: PaddingControlsProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Aspect ratio */}
      <div>
        <span className="panel-label">Aspect Ratio</span>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {ASPECT_RATIOS.map((r) => (
            <button
              key={r.id}
              onClick={() => onChange({ aspectRatio: r.id as CanvasState['aspectRatio'] })}
              className={state.aspectRatio === r.id ? 'chip active' : 'chip'}
              style={{ flexDirection: 'column', gap: 1, padding: '6px 10px' }}
            >
              <span style={{ fontSize: 12, fontWeight: 700 }}>{r.label}</span>
              <span style={{ fontSize: 9 }}>{r.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Padding sliders */}
      <div>
        <span className="panel-label">Padding</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <PaddingSlider label="Top"    value={state.paddingTop}    onChange={(v) => onChange({ paddingTop: v })} />
          <PaddingSlider label="Bottom" value={state.paddingBottom} onChange={(v) => onChange({ paddingBottom: v })} />
          <PaddingSlider label="Left"   value={state.paddingLeft}   onChange={(v) => onChange({ paddingLeft: v })} />
          <PaddingSlider label="Right"  value={state.paddingRight}  onChange={(v) => onChange({ paddingRight: v })} />
        </div>

        {/* Quick uniform preset buttons */}
        <div style={{ display: 'flex', gap: 4, marginTop: 8, flexWrap: 'wrap' }}>
          {[16, 32, 48, 64].map((v) => (
            <button
              key={v}
              onClick={() => onChange({ paddingTop: v, paddingBottom: v, paddingLeft: v, paddingRight: v })}
              className="chip"
              style={{ fontSize: 11 }}
            >
              {v}px
            </button>
          ))}
          <button
            onClick={() => onChange({ paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0 })}
            className="chip"
            style={{ fontSize: 11 }}
          >
            None
          </button>
        </div>
      </div>
    </div>
  );
}
