'use client';

import type { CanvasState, StatsStyle } from '@/types';
import { formatStatNumber } from '@/lib/utils';

interface StatsBarProps {
  state: CanvasState;
  onChange: (updates: Partial<CanvasState>) => void;
}

const STATS_STYLES: { id: StatsStyle; label: string }[] = [
  { id: 'minimal', label: 'Minimal' },
  { id: 'pill',    label: 'Pill' },
  { id: 'bold',    label: 'Bold' },
  { id: 'glass',   label: 'Glass' },
];

const STAT_FIELDS: { key: string; label: string; placeholder: string }[] = [
  { key: 'likes',    label: 'Likes',    placeholder: '7,584' },
  { key: 'comments', label: 'Comments', placeholder: '56' },
  { key: 'shares',   label: 'Shares',   placeholder: '787' },
  { key: 'views',    label: 'Views',    placeholder: '90.8K' },
  { key: 'saves',    label: 'Saves',    placeholder: '1.2K' },
];

export function StatsBarControls({ state, onChange }: StatsBarProps) {
  const { statsBar } = state;

  const update = (updates: Partial<CanvasState['statsBar']>) => {
    onChange({ statsBar: { ...statsBar, ...updates } });
  };

  const updateStat = (key: string, value: string) => {
    update({ stats: { ...statsBar.stats, [key]: value } });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Enable toggle */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', display: 'block' }}>
            Stats Bar
          </span>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Show engagement overlay</span>
        </div>
        <label className="sf-toggle">
          <input
            type="checkbox"
            checked={statsBar.enabled}
            onChange={(e) => update({ enabled: e.target.checked })}
          />
          <span className="sf-toggle-thumb" />
        </label>
      </div>

      {statsBar.enabled && (
        <>
          {/* Stat inputs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {STAT_FIELDS.map(({ key, label, placeholder }) => (
              <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 12, width: 80, flexShrink: 0, color: 'var(--text-secondary)' }}>
                  {label}
                </span>
                <input
                  type="text"
                  value={statsBar.stats[key as keyof typeof statsBar.stats] ?? ''}
                  onChange={(e) => updateStat(key, e.target.value)}
                  placeholder={placeholder}
                  className="sf-input"
                  style={{ flex: 1, fontSize: 12 }}
                />
              </div>
            ))}
          </div>

          {/* Style */}
          <div>
            <span className="panel-label">Style</span>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {STATS_STYLES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => update({ style: s.id })}
                  className={statsBar.style === s.id ? 'chip active' : 'chip'}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Position */}
          <div>
            <span className="panel-label">Position</span>
            <div style={{ display: 'flex', gap: 4 }}>
              {(['bottom', 'top'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => update({ position: p })}
                  className={statsBar.position === p ? 'chip active' : 'chip'}
                >
                  {p === 'top' ? '⬆ Top' : '⬇ Bottom'}
                </button>
              ))}
            </div>
          </div>

          {/* Font size */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Font Size</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)', fontFamily: 'monospace' }}>
                {statsBar.fontSize}px
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={32}
              value={statsBar.fontSize}
              onChange={(e) => update({ fontSize: Number(e.target.value) })}
              className="sf-slider"
            />
          </div>

          {/* Colors */}
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>Text</span>
              <input
                type="color"
                value={statsBar.textColor}
                onChange={(e) => update({ textColor: e.target.value })}
                style={{ width: '100%', height: 34, borderRadius: 6, border: '1px solid var(--border)', cursor: 'pointer', padding: 2, background: 'transparent' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>Background</span>
              <input
                type="color"
                value={statsBar.backgroundColor}
                onChange={(e) => update({ backgroundColor: e.target.value })}
                style={{ width: '100%', height: 34, borderRadius: 6, border: '1px solid var(--border)', cursor: 'pointer', padding: 2, background: 'transparent' }}
              />
            </div>
          </div>

          {/* Opacity */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Bar Opacity</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)', fontFamily: 'monospace' }}>
                {Math.round(statsBar.opacity * 100)}%
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={Math.round(statsBar.opacity * 100)}
              onChange={(e) => update({ opacity: Number(e.target.value) / 100 })}
              className="sf-slider"
            />
          </div>
        </>
      )}
    </div>
  );
}
