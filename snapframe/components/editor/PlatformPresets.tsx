'use client';

import type { PlatformPreset } from '@/types';
import { PLATFORM_PRESETS } from '@/lib/presets';
import Image from 'next/image';

const PLATFORM_LABELS: Record<string, string> = {
  instagram: 'Instagram',
  twitter: 'Twitter/X',
  tiktok: 'TikTok',
  youtube: 'YouTube',
  linkedin: 'LinkedIn',
  facebook: 'Facebook',
};

const PLATFORM_COLORS: Record<string, string> = {
  instagram: 'linear-gradient(135deg,#f9a825,#e91e8c,#9c27b0)',
  twitter:   'linear-gradient(135deg,#1da1f2,#0d7bc4)',
  tiktok:    'linear-gradient(135deg,#010101,#69c9d0,#ee1d52)',
  youtube:   'linear-gradient(135deg,#0f0f0f,#ff0000)',
  linkedin:  'linear-gradient(135deg,#0a66c2,#064499)',
  facebook:  'linear-gradient(135deg,#1877f2,#1a6ae0)',
};

interface PlatformPresetsProps {
  activePresetId: string | null;
  onSelectPreset: (preset: PlatformPreset) => void;
}

export function PlatformPresets({ activePresetId, onSelectPreset }: PlatformPresetsProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {PLATFORM_PRESETS.map((preset) => {
        const isActive = activePresetId === preset.id;
        return (
          <button
            key={preset.id}
            onClick={() => onSelectPreset(preset)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 12px',
              borderRadius: 10,
              border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`,
              background: isActive ? 'var(--accent-glow)' : 'var(--bg-tertiary)',
              cursor: 'pointer',
              transition: 'all 0.15s',
              textAlign: 'left',
              width: '100%',
            }}
          >
            {/* Platform icon */}
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: PLATFORM_COLORS[preset.platform],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                overflow: 'hidden',
                padding: 4,
              }}
            >
              <img
                src={`/platform-icons/${preset.platform}.svg`}
                alt={preset.platform}
                width={24}
                height={24}
                style={{ objectFit: 'contain' }}
              />
            </div>

            {/* Labels */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: isActive ? '#c4b5fd' : 'var(--text-primary)' }}>
                  {preset.name}
                </span>
                <span style={{ fontSize: 10, color: 'var(--text-muted)', flexShrink: 0 }}>
                  {PLATFORM_LABELS[preset.platform]}
                </span>
              </div>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginTop: 1 }}>
                {preset.vibe}
              </span>
            </div>

            {/* Preview swatch */}
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: 6,
                background: `linear-gradient(135deg, ${preset.gradient.colors.join(', ')})`,
                flexShrink: 0,
              }}
            />
          </button>
        );
      })}
    </div>
  );
}
