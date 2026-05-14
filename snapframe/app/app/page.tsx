'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import type { CanvasState, Platform, PlatformPreset } from '@/types';
import { PLATFORM_GRADIENTS, PLATFORM_PRESETS } from '@/lib/presets';
import { detectPlatformFromImage } from '@/lib/platform-detector';
import { DropZone } from '@/components/upload/DropZone';
import { CanvasPreview } from '@/components/editor/CanvasPreview';
import { BackgroundPicker } from '@/components/editor/BackgroundPicker';
import { FrameControls } from '@/components/editor/FrameControls';
import { PaddingControls } from '@/components/editor/PaddingControls';
import { StatsBarControls } from '@/components/editor/StatsBarControls';
import { CaptionOverlayControls } from '@/components/editor/CaptionOverlayControls';
import { ExportButton } from '@/components/editor/ExportButton';
import { PlatformPresets } from '@/components/editor/PlatformPresets';
import { CheckCircle, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

const PLATFORM_LABELS: Record<Platform, string> = {
  instagram: 'Instagram', twitter: 'Twitter/X', tiktok: 'TikTok',
  youtube: 'YouTube',  linkedin: 'LinkedIn', facebook: 'Facebook', unknown: 'Unknown',
};

const ALL_PLATFORMS: Platform[] = ['instagram','twitter','tiktok','youtube','linkedin','facebook'];

const DEFAULT_STATE: CanvasState = {
  uploadedImage: null,
  detectedPlatform: 'unknown',
  detectionConfidence: 0,
  backgroundType: 'gradient',
  backgroundGradient: PLATFORM_GRADIENTS.unknown[0],
  backgroundColor: '#1a1a24',
  backgroundImage: null,
  borderRadius: 16,
  shadowIntensity: 50,
  shadowColor: '#000000',
  shadowDirection: '0deg',
  showPlatformBadge: true,
  showDeviceMockup: false,
  paddingTop: 40,
  paddingBottom: 40,
  paddingLeft: 40,
  paddingRight: 40,
  aspectRatio: '1:1',
  statsBar: {
    enabled: false,
    stats: { likes: '', comments: '', shares: '', views: '', saves: '' },
    style: 'glass',
    position: 'bottom',
    fontSize: 14,
    textColor: '#ffffff',
    backgroundColor: '#000000',
    opacity: 0.7,
  },
  caption: {
    enabled: false,
    text: '',
    font: 'Inter',
    fontSize: 18,
    color: '#ffffff',
    position: 'bottom',
    background: 'transparent',
    backgroundColor: '#000000',
  },
};

type Panel = 'presets' | 'background' | 'frame' | 'layout' | 'stats' | 'caption' | 'export';

const PANELS: { id: Panel; label: string; icon: string }[] = [
  { id: 'presets',    label: 'Platform Presets', icon: '✦' },
  { id: 'background', label: 'Background',        icon: '🌈' },
  { id: 'frame',      label: 'Frame & Border',    icon: '⬡' },
  { id: 'layout',     label: 'Layout & Padding',  icon: '⊞' },
  { id: 'stats',      label: 'Stats Bar',          icon: '📊' },
  { id: 'caption',    label: 'Caption / Text',     icon: '✏️' },
  { id: 'export',     label: 'Export',             icon: '⬇' },
];

export default function EditorPage() {
  const [state, setState] = useState<CanvasState>(DEFAULT_STATE);
  const [detecting, setDetecting] = useState(false);
  const [openPanel, setOpenPanel] = useState<Panel>('presets');
  const imgRef = useRef<HTMLImageElement | null>(null);

  const update = useCallback((updates: Partial<CanvasState>) => {
    setState((s) => ({ ...s, ...updates }));
  }, []);

  // Apply platform preset
  const applyPreset = useCallback((preset: PlatformPreset) => {
    setState((s) => ({
      ...s,
      detectedPlatform: preset.platform,
      backgroundType: 'gradient',
      backgroundGradient: preset.gradient,
      borderRadius: preset.borderRadius,
      shadowIntensity: preset.shadowIntensity,
      showPlatformBadge: true,
      caption: { ...s.caption, font: preset.font, color: preset.textColor },
    }));
  }, []);

  // Handle image upload + detection
  const handleImageLoad = useCallback(async (dataUrl: string, file: File) => {
    update({ uploadedImage: dataUrl });
    setDetecting(true);

    // Create temp img element for detection
    const img = new window.Image();
    img.onload = async () => {
      imgRef.current = img;
      const result = await detectPlatformFromImage(img);
      setDetecting(false);

      if (result.platform !== 'unknown' && result.confidence >= 40) {
        // Auto-apply matching preset
        const matchingPreset = PLATFORM_PRESETS.find((p) => p.platform === result.platform);
        if (matchingPreset) {
          setState((s) => ({
            ...s,
            detectedPlatform: result.platform,
            detectionConfidence: result.confidence,
            backgroundType: 'gradient',
            backgroundGradient: matchingPreset.gradient,
            borderRadius: matchingPreset.borderRadius,
            shadowIntensity: matchingPreset.shadowIntensity,
            showPlatformBadge: true,
          }));
        }
      } else {
        update({ detectedPlatform: result.platform, detectionConfidence: result.confidence });
      }
    };
    img.src = dataUrl;
  }, [update]);

  const togglePanel = (id: Panel) => setOpenPanel((p) => (p === id ? 'presets' : id));

  return (
    <div style={{ minHeight: '100vh', paddingTop: 60, display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)' }}>
      {/* Page header */}
      <div style={{
        padding: '16px 24px',
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg-secondary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
      }}>
        <div>
          <h1 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            Screenshot Editor
          </h1>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '2px 0 0' }}>
            Upload a screenshot and make it beautiful
          </p>
        </div>

        {/* Detection badge */}
        {state.uploadedImage && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '6px 12px', borderRadius: 20,
            background: state.detectedPlatform !== 'unknown' ? 'rgba(16,185,129,0.1)' : 'var(--bg-tertiary)',
            border: `1px solid ${state.detectedPlatform !== 'unknown' ? 'var(--success)' : 'var(--border)'}`,
          }}>
            {detecting ? (
              <><div className="pulse-dot" /><span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Detecting…</span></>
            ) : state.detectedPlatform !== 'unknown' ? (
              <><CheckCircle size={13} style={{ color: 'var(--success)' }} />
              <span style={{ fontSize: 12, color: 'var(--success)', fontWeight: 500 }}>
                Detected: {PLATFORM_LABELS[state.detectedPlatform]} ({state.detectionConfidence}%)
              </span></>
            ) : (
              <><AlertCircle size={13} style={{ color: 'var(--text-muted)' }} />
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Platform unknown — pick a preset</span></>
            )}
          </div>
        )}
      </div>

      {/* Main layout */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '320px 1fr', overflow: 'hidden' }}>
        {/* LEFT PANEL */}
        <div style={{
          borderRight: '1px solid var(--border)',
          background: 'var(--bg-secondary)',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {/* Upload zone */}
          <div style={{ padding: '16px', borderBottom: '1px solid var(--border)' }}>
            <p className="panel-label">Screenshot</p>
            <DropZone onImageLoad={handleImageLoad} />

            {/* Manual platform picker */}
            {state.uploadedImage && (
              <div style={{ marginTop: 10 }}>
                <p className="panel-label" style={{ marginBottom: 6 }}>Platform</p>
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                  {ALL_PLATFORMS.map((p) => (
                    <button
                      key={p}
                      onClick={() => {
                        const preset = PLATFORM_PRESETS.find((pr) => pr.platform === p);
                        if (preset) applyPreset(preset);
                        else update({ detectedPlatform: p });
                      }}
                      className={state.detectedPlatform === p ? 'chip active' : 'chip'}
                      style={{ fontSize: 11 }}
                    >
                      <img src={`/platform-icons/${p}.svg`} alt={p} width={12} height={12} style={{ borderRadius: 2 }} />
                      {PLATFORM_LABELS[p]}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Accordion panels */}
          {PANELS.map(({ id, label, icon }) => (
            <div key={id} style={{ borderBottom: '1px solid var(--border)' }}>
              <button
                onClick={() => togglePanel(id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  background: openPanel === id ? 'var(--bg-hover)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: openPanel === id ? 'var(--text-primary)' : 'var(--text-secondary)',
                  transition: 'all 0.15s',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600 }}>
                  <span>{icon}</span> {label}
                </span>
                {openPanel === id
                  ? <ChevronUp size={14} />
                  : <ChevronDown size={14} />}
              </button>

              {openPanel === id && (
                <div style={{ padding: '0 16px 16px', animation: 'fadeIn 0.15s ease' }}>
                  {id === 'presets' && (
                    <PlatformPresets
                      activePresetId={PLATFORM_PRESETS.find((p) => p.platform === state.detectedPlatform)?.id ?? null}
                      onSelectPreset={applyPreset}
                    />
                  )}
                  {id === 'background' && <BackgroundPicker state={state} onChange={update} />}
                  {id === 'frame'      && <FrameControls state={state} onChange={update} />}
                  {id === 'layout'     && <PaddingControls state={state} onChange={update} />}
                  {id === 'stats'      && <StatsBarControls state={state} onChange={update} />}
                  {id === 'caption'    && <CaptionOverlayControls state={state} onChange={update} />}
                  {id === 'export'     && <ExportButton canvasId="snapframe-canvas" />}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* RIGHT: Canvas preview */}
        <div style={{
          background: 'var(--bg-primary)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px',
          overflowY: 'auto',
          backgroundImage: 'radial-gradient(var(--border) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}>
          {/* Canvas container */}
          <div style={{
            width: '100%',
            maxWidth: 520,
            boxShadow: '0 0 0 1px var(--border)',
            borderRadius: 4,
            overflow: 'hidden',
          }}>
            <CanvasPreview state={state} canvasId="snapframe-canvas" />
          </div>

          {/* Canvas hint */}
          <p style={{ marginTop: 16, fontSize: 11, color: 'var(--text-muted)', textAlign: 'center' }}>
            Live preview · All edits update instantly
          </p>
        </div>
      </div>
    </div>
  );
}
