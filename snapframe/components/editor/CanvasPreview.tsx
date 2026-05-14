'use client';

import { useMemo } from 'react';
import { Heart, MessageCircle, Repeat, Eye, Bookmark } from 'lucide-react';
import type { CanvasState } from '@/types';
import { buildGradientCSS, getAspectRatioPadding, formatStatNumber } from '@/lib/utils';

interface CanvasPreviewProps {
  state: CanvasState;
  canvasId: string;
}

const STATS_ICONS: Record<string, React.ReactNode> = {
  likes: <Heart size={16} fill="currentColor" />,
  comments: <MessageCircle size={16} fill="currentColor" />,
  shares: <Repeat size={16} />,
  views: <Eye size={16} />,
  saves: <Bookmark size={16} fill="currentColor" />,
};

export function CanvasPreview({ state, canvasId }: CanvasPreviewProps) {
  const background = useMemo(() => {
    switch (state.backgroundType) {
      case 'gradient':
        return { background: buildGradientCSS(state.backgroundGradient.colors, state.backgroundGradient.direction) };
      case 'solid':
        return { background: state.backgroundColor };
      case 'custom-image':
        return state.backgroundImage
          ? { backgroundImage: `url(${state.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
          : { background: '#1a1a24' };
      case 'blur':
        return {
          background: state.uploadedImage
            ? `url(${state.uploadedImage})`
            : buildGradientCSS(state.backgroundGradient.colors, state.backgroundGradient.direction),
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(0px)',
        };
      case 'glass':
        return {
          background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.12)',
        };
      default:
        return { background: '#1a1a24' };
    }
  }, [state.backgroundType, state.backgroundGradient, state.backgroundColor, state.backgroundImage, state.uploadedImage]);

  const shadowStyle = useMemo(() => {
    if (state.shadowIntensity === 0) return {};
    const a = state.shadowIntensity / 100;
    const shadowColor = state.shadowColor + Math.round(a * 255).toString(16).padStart(2, '0');
    return { boxShadow: `0 ${20 * a}px ${60 * a}px ${shadowColor}` };
  }, [state.shadowIntensity, state.shadowColor]);

  // Stats bar active entries
  const activeStats = Object.entries(state.statsBar.stats).filter(([, v]) => v && v.trim() !== '');

  // Stats bar style
  const getStatsBarStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16,
      fontSize: state.statsBar.fontSize,
      color: state.statsBar.textColor,
      fontWeight: 600,
      padding: '10px 16px',
      position: 'absolute',
      left: 0,
      right: 0,
      zIndex: 10,
      [state.statsBar.position === 'top' ? 'top' : 'bottom']: 0,
    };

    const bgColor = state.statsBar.backgroundColor;
    const opacity = state.statsBar.opacity;

    switch (state.statsBar.style) {
      case 'minimal':
        return { ...base, background: `${bgColor}${Math.round(opacity * 200).toString(16).padStart(2,'0')}` };
      case 'pill':
        return {
          ...base,
          background: `${bgColor}${Math.round(opacity * 220).toString(16).padStart(2,'0')}`,
          borderRadius: 99,
          margin: '0 16px',
          left: 16,
          right: 16,
          backdropFilter: 'blur(8px)',
        };
      case 'bold':
        return {
          ...base,
          background: bgColor,
          opacity,
          fontWeight: 800,
          letterSpacing: '0.04em',
          fontSize: state.statsBar.fontSize + 2,
        };
      case 'glass':
        return {
          ...base,
          background: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderTop: state.statsBar.position === 'bottom' ? '1px solid rgba(255,255,255,0.15)' : undefined,
          borderBottom: state.statsBar.position === 'top' ? '1px solid rgba(255,255,255,0.15)' : undefined,
        };
      default:
        return base;
    }
  };

  // Caption style
  const getCaptionStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: 'absolute',
      left: 12,
      right: 12,
      zIndex: 11,
      textAlign: 'center',
      color: state.caption.color,
      fontSize: state.caption.fontSize,
      fontFamily: `'${state.caption.font}', sans-serif`,
      lineHeight: 1.4,
      padding: '8px 12px',
      wordBreak: 'break-word',
    };

    switch (state.caption.position) {
      case 'top':    return { ...base, top: 12 };
      case 'bottom': return { ...base, bottom: state.statsBar.enabled ? state.statsBar.fontSize + 36 : 12 };
      case 'floating': return { ...base, top: '50%', transform: 'translateY(-50%)' };
      default:       return { ...base, bottom: 12 };
    }
  };

  const captionBg = (): React.CSSProperties => {
    switch (state.caption.background) {
      case 'blurred-pill':
        return {
          background: 'rgba(0,0,0,0.35)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          borderRadius: 99,
          padding: '6px 16px',
        };
      case 'solid':
        return { background: state.caption.backgroundColor, borderRadius: 8, padding: '6px 12px' };
      default:
        return {};
    }
  };

  return (
    <div
      style={{
        width: '100%',
        position: 'relative',
      }}
    >
      {/* Aspect ratio wrapper */}
      <div id={canvasId} style={{ position: 'relative', paddingBottom: getAspectRatioPadding(state.aspectRatio) }}>
        {/* Outer canvas (background) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            ...background,
          }}
        >
          {/* Blur overlay for blur mode */}
          {state.backgroundType === 'blur' && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
              }}
            />
          )}

          {/* Screenshot card */}
          {state.uploadedImage && (
            <div
              style={{
                position: 'absolute',
                top: state.paddingTop,
                bottom: state.paddingBottom,
                left: state.paddingLeft,
                right: state.paddingRight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  overflow: 'hidden',
                  borderRadius: state.borderRadius,
                  ...shadowStyle,
                  position: 'relative',
                  ...(state.showDeviceMockup ? {
                    outline: '6px solid rgba(255,255,255,0.15)',
                    outlineOffset: '3px',
                  } : {}),
                }}
              >
                <img
                  src={state.uploadedImage}
                  alt="Screenshot"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </div>
          )}

          {/* Empty state */}
          {!state.uploadedImage && (
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(255,255,255,0.25)',
              gap: 8,
            }}>
              <span style={{ fontSize: 32 }}>📸</span>
              <span style={{ fontSize: 12 }}>Upload a screenshot to preview</span>
            </div>
          )}

          {/* Platform badge */}
          {state.showPlatformBadge && state.detectedPlatform !== 'unknown' && (
            <div
              style={{
                position: 'absolute',
                bottom: state.paddingBottom + 8,
                right: state.paddingRight + 8,
                width: 28,
                height: 28,
                borderRadius: 7,
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
                zIndex: 12,
              }}
            >
              <img
                src={`/platform-icons/${state.detectedPlatform}.svg`}
                alt={state.detectedPlatform}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          )}

          {/* Stats bar */}
          {state.statsBar.enabled && activeStats.length > 0 && (
            <div style={getStatsBarStyle()}>
              {activeStats.map(([key, value]) => (
                <span key={key} style={{ display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}>
                  <span style={{ display: 'flex', alignItems: 'center', opacity: 0.9 }}>
                    {STATS_ICONS[key]}
                  </span>
                  <span>{formatStatNumber(value ?? '')}</span>
                </span>
              ))}
            </div>
          )}

          {/* Caption */}
          {state.caption.enabled && state.caption.text && (
            <div style={getCaptionStyle()}>
              <span style={captionBg()}>{state.caption.text}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
