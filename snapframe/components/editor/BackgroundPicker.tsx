'use client';

import { useState, useCallback, useRef } from 'react';
import type { CanvasState, GradientPreset, BackgroundType } from '@/types';
import { PLATFORM_GRADIENTS } from '@/lib/presets';
import { buildGradientCSS } from '@/lib/utils';

interface BackgroundPickerProps {
  state: CanvasState;
  onChange: (updates: Partial<CanvasState>) => void;
}

const BG_TYPES: { id: BackgroundType; label: string; icon: string }[] = [
  { id: 'gradient', label: 'Gradient', icon: '🌈' },
  { id: 'solid', label: 'Solid', icon: '🎨' },
  { id: 'blur', label: 'Blur', icon: '✨' },
  { id: 'glass', label: 'Glass', icon: '🔮' },
  { id: 'custom-image', label: 'Image', icon: '🖼' },
];

export function BackgroundPicker({ state, onChange }: BackgroundPickerProps) {
  const [activeTab, setActiveTab] = useState<BackgroundType>(state.backgroundType);
  const fileRef = useRef<HTMLInputElement>(null);

  const presets = PLATFORM_GRADIENTS[state.detectedPlatform] ?? PLATFORM_GRADIENTS.unknown;

  const setType = (t: BackgroundType) => {
    setActiveTab(t);
    onChange({ backgroundType: t });
  };

  const handleBgImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      onChange({ backgroundImage: result, backgroundType: 'custom-image' });
      setActiveTab('custom-image');
    };
    reader.readAsDataURL(file);
  }, [onChange]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Type tabs */}
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {BG_TYPES.map((t) => (
          <button
            key={t.id}
            onClick={() => setType(t.id)}
            className={activeTab === t.id ? 'chip active' : 'chip'}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Gradient presets */}
      {activeTab === 'gradient' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {presets.map((g: GradientPreset) => {
            const isActive = state.backgroundGradient.id === g.id;
            return (
              <button
                key={g.id}
                onClick={() => onChange({ backgroundGradient: g })}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 10px',
                  borderRadius: 8,
                  border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`,
                  background: isActive ? 'var(--accent-glow)' : 'var(--bg-tertiary)',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 20,
                    borderRadius: 5,
                    background: buildGradientCSS(g.colors, g.direction),
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: 12, color: isActive ? '#c4b5fd' : 'var(--text-secondary)' }}>
                  {g.name}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Solid color */}
      {activeTab === 'solid' && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <input
            type="color"
            value={state.backgroundColor}
            onChange={(e) => onChange({ backgroundColor: e.target.value })}
            style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              border: '1px solid var(--border)',
              background: 'transparent',
              cursor: 'pointer',
              padding: 2,
            }}
          />
          <input
            type="text"
            value={state.backgroundColor}
            onChange={(e) => onChange({ backgroundColor: e.target.value })}
            className="sf-input"
            style={{ flex: 1, fontFamily: 'monospace' }}
          />
        </div>
      )}

      {/* Blur */}
      {activeTab === 'blur' && (
        <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>
          Extracts dominant colors from your screenshot and creates a soft bokeh background automatically.
        </p>
      )}

      {/* Glass */}
      {activeTab === 'glass' && (
        <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>
          Frosted glass effect — dark tinted backdrop with blur. Looks great on any screenshot.
        </p>
      )}

      {/* Custom image */}
      {activeTab === 'custom-image' && (
        <div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleBgImage} />
          <button
            onClick={() => fileRef.current?.click()}
            className="btn-ghost"
            style={{ width: '100%', fontSize: 13 }}
          >
            {state.backgroundImage ? '🖼 Change background image' : '🖼 Upload background image'}
          </button>
          {state.backgroundImage && (
            <img
              src={state.backgroundImage}
              alt="bg"
              style={{ marginTop: 8, width: '100%', height: 60, objectFit: 'cover', borderRadius: 8 }}
            />
          )}
        </div>
      )}
    </div>
  );
}
