import type { Platform, DetectionResult } from '@/types';

interface ColorSignature {
  hues: number[];
  saturationLevel: 'low' | 'medium' | 'high' | 'very-high';
}

const PLATFORM_SIGNATURES: Record<Exclude<Platform, 'unknown'>, ColorSignature> = {
  instagram: { hues: [280, 320, 40, 15], saturationLevel: 'high' },
  twitter:   { hues: [205, 210],          saturationLevel: 'medium' },
  tiktok:    { hues: [355, 180, 170],     saturationLevel: 'very-high' },
  youtube:   { hues: [0, 5, 355],         saturationLevel: 'high' },
  linkedin:  { hues: [210, 215],          saturationLevel: 'medium' },
  facebook:  { hues: [215, 220],          saturationLevel: 'medium' },
};

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function getSaturationLevel(saturation: number): 'low' | 'medium' | 'high' | 'very-high' {
  if (saturation < 20) return 'low';
  if (saturation < 50) return 'medium';
  if (saturation < 75) return 'high';
  return 'very-high';
}

function hueDifference(h1: number, h2: number): number {
  const diff = Math.abs(h1 - h2);
  return Math.min(diff, 360 - diff);
}

function scorePlatform(
  dominantHues: number[],
  saturationLevel: 'low' | 'medium' | 'high' | 'very-high',
  signature: ColorSignature
): number {
  let score = 0;

  // Saturation match
  if (saturationLevel === signature.saturationLevel) score += 30;
  else if (Math.abs(['low','medium','high','very-high'].indexOf(saturationLevel) - 
                    ['low','medium','high','very-high'].indexOf(signature.saturationLevel)) === 1) {
    score += 15;
  }

  // Hue proximity scoring
  for (const domHue of dominantHues) {
    for (const sigHue of signature.hues) {
      const diff = hueDifference(domHue, sigHue);
      if (diff < 15) score += 25;
      else if (diff < 30) score += 15;
      else if (diff < 50) score += 5;
    }
  }

  return score;
}

export async function detectPlatformFromImage(imageElement: HTMLImageElement): Promise<DetectionResult> {
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('No canvas context');

    // Sample a smaller version for speed
    const sampleSize = 100;
    canvas.width = sampleSize;
    canvas.height = sampleSize;
    ctx.drawImage(imageElement, 0, 0, sampleSize, sampleSize);

    const imageData = ctx.getImageData(0, 0, sampleSize, sampleSize);
    const data = imageData.data;

    // Collect HSL values
    const hues: number[] = [];
    const saturations: number[] = [];

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i], g = data[i + 1], b = data[i + 2];
      const [h, s, l] = rgbToHsl(r, g, b);
      // Skip near-black and near-white pixels
      if (l > 10 && l < 90 && s > 15) {
        hues.push(h);
        saturations.push(s);
      }
    }

    if (hues.length === 0) {
      return { platform: 'unknown', confidence: 0 };
    }

    const avgSaturation = saturations.reduce((a, b) => a + b, 0) / saturations.length;
    const satLevel = getSaturationLevel(avgSaturation);

    // Get most dominant hues (simple bucketing)
    const hueBuckets: Record<number, number> = {};
    for (const h of hues) {
      const bucket = Math.floor(h / 20) * 20;
      hueBuckets[bucket] = (hueBuckets[bucket] || 0) + 1;
    }

    const topHues = Object.entries(hueBuckets)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([h]) => parseInt(h));

    // Score each platform
    const scores: Array<{ platform: Platform; score: number }> = [];
    for (const [platform, signature] of Object.entries(PLATFORM_SIGNATURES)) {
      const score = scorePlatform(topHues, satLevel, signature);
      scores.push({ platform: platform as Platform, score });
    }

    scores.sort((a, b) => b.score - a.score);
    const best = scores[0];
    const maxPossibleScore = 30 + 25 * 3; // approx max
    const confidence = Math.min(Math.round((best.score / maxPossibleScore) * 100), 99);

    return {
      platform: confidence >= 40 ? best.platform : 'unknown',
      confidence,
    };
  } catch {
    return { platform: 'unknown', confidence: 0 };
  }
}
