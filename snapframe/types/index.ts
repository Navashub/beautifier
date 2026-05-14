export type Platform =
  | 'instagram'
  | 'twitter'
  | 'tiktok'
  | 'youtube'
  | 'linkedin'
  | 'facebook'
  | 'unknown';

export type AspectRatio = '1:1' | '9:16' | '16:9' | '4:5' | 'custom';

export type BackgroundType = 'gradient' | 'solid' | 'custom-image' | 'blur' | 'glass';

export type StatsStyle = 'minimal' | 'pill' | 'bold' | 'glass';

export type CaptionPosition = 'top' | 'bottom' | 'floating';

export type CaptionBackground = 'transparent' | 'blurred-pill' | 'solid';

export type ExportFormat = 'png' | 'jpg' | 'webp';

export type ExportResolution = '1x' | '2x';

export interface GradientPreset {
  id: string;
  name: string;
  colors: string[];
  direction: string;
}

export interface StatsData {
  likes?: string;
  comments?: string;
  shares?: string;
  views?: string;
  saves?: string;
}

export interface StatsBarConfig {
  enabled: boolean;
  stats: StatsData;
  style: StatsStyle;
  position: 'bottom' | 'top';
  fontSize: number;
  textColor: string;
  backgroundColor: string;
  opacity: number;
}

export interface CaptionConfig {
  enabled: boolean;
  text: string;
  font: string;
  fontSize: number;
  color: string;
  position: CaptionPosition;
  background: CaptionBackground;
  backgroundColor: string;
}

export interface CanvasState {
  // Upload
  uploadedImage: string | null;
  detectedPlatform: Platform;
  detectionConfidence: number;

  // Background
  backgroundType: BackgroundType;
  backgroundGradient: GradientPreset;
  backgroundColor: string;
  backgroundImage: string | null;

  // Frame
  borderRadius: number;
  shadowIntensity: number;
  shadowColor: string;
  shadowDirection: string;
  showPlatformBadge: boolean;
  showDeviceMockup: boolean;

  // Padding
  paddingTop: number;
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;

  // Aspect ratio
  aspectRatio: AspectRatio;

  // Stats bar
  statsBar: StatsBarConfig;

  // Caption
  caption: CaptionConfig;
}

export interface PlatformPreset {
  id: string;
  name: string;
  platform: Platform;
  vibe: string;
  gradient: GradientPreset;
  font: string;
  textColor: string;
  borderRadius: number;
  shadowIntensity: number;
}

export interface ExportOptions {
  format: ExportFormat;
  resolution: ExportResolution;
  watermark: boolean;
}

export interface DetectionResult {
  platform: Platform;
  confidence: number;
}
