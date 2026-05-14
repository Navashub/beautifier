'use client';

import type { CanvasState } from '@/types';

interface FrameControlsProps {
  state: CanvasState;
  onChange: (updates: Partial<CanvasState>) => void;
}

export function FrameControls({ state, onChange }: FrameControlsProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Border Radius */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Corner Radius</span>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)', fontFamily: 'monospace' }}>
            {state.borderRadius}px
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={48}
          value={state.borderRadius}
          onChange={(e) => onChange({ borderRadius: Number(e.target.value) })}
          className="sf-slider"
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
          <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>Sharp</span>
          <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>Round</span>
        </div>
      </div>

      {/* Shadow Intensity */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Drop Shadow</span>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)', fontFamily: 'monospace' }}>
            {state.shadowIntensity}%
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={state.shadowIntensity}
          onChange={(e) => onChange({ shadowIntensity: Number(e.target.value) })}
          className="sf-slider"
        />
      </div>

      {/* Shadow Color */}
      <div>
        <span style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
          Shadow Color
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            type="color"
            value={state.shadowColor}
            onChange={(e) => onChange({ shadowColor: e.target.value })}
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              border: '1px solid var(--border)',
              background: 'transparent',
              cursor: 'pointer',
              padding: 2,
            }}
          />
          <input
            type="text"
            value={state.shadowColor}
            onChange={(e) => onChange({ shadowColor: e.target.value })}
            className="sf-input"
            style={{ flex: 1, fontFamily: 'monospace', fontSize: 12 }}
          />
        </div>
      </div>

      {/* Platform Badge Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <span style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block' }}>Platform Badge</span>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Pin platform icon to corner</span>
        </div>
        <label className="sf-toggle">
          <input
            type="checkbox"
            checked={state.showPlatformBadge}
            onChange={(e) => onChange({ showPlatformBadge: e.target.checked })}
          />
          <span className="sf-toggle-thumb" />
        </label>
      </div>

      {/* Device Mockup Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <span style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block' }}>Device Frame</span>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Wrap in phone mockup</span>
        </div>
        <label className="sf-toggle">
          <input
            type="checkbox"
            checked={state.showDeviceMockup}
            onChange={(e) => onChange({ showDeviceMockup: e.target.checked })}
          />
          <span className="sf-toggle-thumb" />
        </label>
      </div>
    </div>
  );
}
