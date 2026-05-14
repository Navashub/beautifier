import type { ExportOptions } from '@/types';

export async function exportCanvas(
  elementId: string,
  options: ExportOptions,
  filename = 'snapframe-export'
): Promise<void> {
  const { default: html2canvas } = await import('html2canvas');

  const element = document.getElementById(elementId);
  if (!element) throw new Error('Canvas element not found');

  const scale = options.resolution === '2x' ? 2 : 1;

  const canvas = await html2canvas(element, {
    scale,
    useCORS: true,
    allowTaint: true,
    backgroundColor: null,
    logging: false,
  });

  // Add watermark if needed
  if (options.watermark) {
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.save();
      ctx.font = `${14 * scale}px Inter, sans-serif`;
      ctx.fillStyle = 'rgba(255,255,255,0.45)';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'bottom';
      ctx.fillText(
        'snapframe.app',
        canvas.width - 12 * scale,
        canvas.height - 10 * scale
      );
      ctx.restore();
    }
  }

  const mimeType =
    options.format === 'jpg'
      ? 'image/jpeg'
      : options.format === 'webp'
      ? 'image/webp'
      : 'image/png';

  const quality = options.format === 'png' ? 1 : 0.92;

  canvas.toBlob(
    (blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename}.${options.format}`;
      a.click();
      URL.revokeObjectURL(url);
    },
    mimeType,
    quality
  );
}

export async function copyCanvasToClipboard(elementId: string): Promise<boolean> {
  try {
    const { default: html2canvas } = await import('html2canvas');
    const element = document.getElementById(elementId);
    if (!element) return false;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      logging: false,
    });

    return new Promise((resolve) => {
      canvas.toBlob(async (blob) => {
        if (!blob) { resolve(false); return; }
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob }),
          ]);
          resolve(true);
        } catch {
          resolve(false);
        }
      }, 'image/png');
    });
  } catch {
    return false;
  }
}
