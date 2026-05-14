import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatStatNumber(value: string): string {
  const num = parseFloat(value.replace(/[^0-9.]/g, ''));
  if (isNaN(num)) return value;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toLocaleString();
}

export function buildGradientCSS(colors: string[], direction: string): string {
  return `linear-gradient(${direction}, ${colors.join(', ')})`;
}

export function getAspectRatioPadding(ratio: string): string {
  const map: Record<string, string> = {
    '1:1': '100%',
    '9:16': '177.78%',
    '16:9': '56.25%',
    '4:5': '125%',
    'custom': '100%',
  };
  return map[ratio] ?? '100%';
}
