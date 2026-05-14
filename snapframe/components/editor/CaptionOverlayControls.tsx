'use client';

import type { CanvasState, CaptionPosition, CaptionBackground } from '@/types';
import { GOOGLE_FONTS } from '@/lib/presets';

interface CaptionOverlayProps {
  state: CanvasState;
  onChange: (updates: Partial<CanvasState>) => void;
}

const POSITIONS: { id: CaptionPosition; label: string }[] = [
  { id: 'top',      label: '⬆ Top' },
  { id: 'bottom',   label: '⬇ Bottom' },
  { id: 'floating', label: '✦ Float' },
];

const BG_OPTIONS: { id: CaptionBackground; label: string }[] = [
  { id: 'transparent',  label: 'None' },
  { id: 'blurred-pill', label: 'Blur pill' },
  { id: 'solid',        label: 'Solid' },
];

export function CaptionOverlayControls({ state, onChange }: CaptionOverlayProps) {
  const { caption } = state;

  const update = (updates: Partial<CanvasState['caption']>) => {
    onChange({ caption: { ...caption, ...updates } });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', display: 'block' }}>
            Caption / Text
          </span>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Add quote or username overlay</span>
        </div>
        <label className="sf-toggle">
          <input
            type="checkbox"
            checked={caption.enabled}
            onChange={(e) => update({ enabled: e.target.checked })}
          />
          <span className="sf-toggle-thumb" />
        </label>
      </div>

      {caption.enabled && (
        <>
          {/* Text input */}
          <textarea
            value={caption.text}
            onChange={(e) => update({ text: e.target.value })}
            placeholder='e.g. "Consistency beats talent every time." — @yourhandle'
            className="sf-input"
            rows={3}
            style={{ resize: 'vertical', lineHeight: 1.5 }}
          />

          {/* Font selector */}
          <div>
            <span className="panel-label">Font</span>
            <select
              value={caption.font}
              onChange={(e) => update({ font: e.target.value })}
              className="sf-input"
              style={{ fontFamily: caption.font }}
            >
              {GOOGLE_FONTS.map((f) => (
                <option key={f} value={f} style={{ fontFamily: f }}>
                  {f}
                </option>
              ))}
            </select>
          </div>

          {/* Font size */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Font Size</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)', fontFamily: 'monospace' }}>
                {caption.fontSize}px
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={64}
              value={caption.fontSize}
              onChange={(e) => update({ fontSize: Number(e.target.value) })}
              className="sf-slider"
            />
          </div>

          {/* Text color */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)', width: 60, flexShrink: 0 }}>Color</span>
            <input
              type="color"
              value={caption.color}
              onChange={(e) => update({ color: e.target.value })}
              style={{ width: 36, height: 32, borderRadius: 6, border: '1px solid var(--border)', cursor: 'pointer', padding: 2, background: 'transparent' }}
            />
            <input
              type="text"
              value={caption.color}
              onChange={(e) => update({ color: e.target.value })}
              className="sf-input"
              style={{ flex: 1, fontSize: 12, fontFamily: 'monospace' }}
            />
          </div>

          {/* Position */}
          <div>
            <span className="panel-label">Position</span>
            <div style={{ display: 'flex', gap: 4 }}>
              {POSITIONS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => update({ position: p.id })}
                  className={caption.position === p.id ? 'chip active' : 'chip'}
                  style={{ flex: 1, justifyContent: 'center', fontSize: 11 }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Background style */}
          <div>
            <span className="panel-label">Background</span>
            <div style={{ display: 'flex', gap: 4 }}>
              {BG_OPTIONS.map((b) => (
                <button
                  key={b.id}
                  onClick={() => update({ background: b.id })}
                  className={caption.background === b.id ? 'chip active' : 'chip'}
                  style={{ flex: 1, justifyContent: 'center', fontSize: 11 }}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {caption.background === 'solid' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)', width: 60, flexShrink: 0 }}>Bg Color</span>
              <input
                type="color"
                value={caption.backgroundColor}
                onChange={(e) => update({ backgroundColor: e.target.value })}
                style={{ width: 36, height: 32, borderRadius: 6, border: '1px solid var(--border)', cursor: 'pointer', padding: 2, background: 'transparent' }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
