'use client';

import { useState } from 'react';
import { Download, Copy, Check, Loader2 } from 'lucide-react';
import type { ExportFormat, ExportResolution } from '@/types';
import { exportCanvas, copyCanvasToClipboard } from '@/lib/canvas-export';

interface ExportButtonProps {
  canvasId: string;
  filename?: string;
}

export function ExportButton({ canvasId, filename = 'snapframe-export' }: ExportButtonProps) {
  const [format, setFormat] = useState<ExportFormat>('png');
  const [resolution, setResolution] = useState<ExportResolution>('2x');
  const [watermark, setWatermark] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportCanvas(canvasId, { format, resolution, watermark }, filename);
    } catch (e) {
      console.error(e);
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopy = async () => {
    setIsCopying(true);
    const ok = await copyCanvasToClipboard(canvasId);
    setIsCopying(false);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Format */}
      <div>
        <span className="panel-label">Format</span>
        <div style={{ display: 'flex', gap: 4 }}>
          {(['png', 'jpg', 'webp'] as ExportFormat[]).map((f) => (
            <button
              key={f}
              onClick={() => setFormat(f)}
              className={format === f ? 'chip active' : 'chip'}
              style={{ flex: 1, justifyContent: 'center', textTransform: 'uppercase', fontSize: 11, fontWeight: 700 }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Resolution */}
      <div>
        <span className="panel-label">Resolution</span>
        <div style={{ display: 'flex', gap: 4 }}>
          {(['1x', '2x'] as ExportResolution[]).map((r) => (
            <button
              key={r}
              onClick={() => setResolution(r)}
              className={resolution === r ? 'chip active' : 'chip'}
              style={{ flex: 1, justifyContent: 'center', fontSize: 12, fontWeight: 600 }}
            >
              {r} {r === '2x' ? '(Retina)' : '(Screen)'}
            </button>
          ))}
        </div>
      </div>

      {/* Watermark */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <span style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block' }}>SnapFrame Watermark</span>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
            {watermark ? 'Free tier · upgrade to remove' : 'Removed (Pro)'}
          </span>
        </div>
        <label className="sf-toggle">
          <input type="checkbox" checked={watermark} onChange={(e) => setWatermark(e.target.checked)} />
          <span className="sf-toggle-thumb" />
        </label>
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
        <button
          onClick={handleExport}
          disabled={isExporting}
          className="btn-accent"
          style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
        >
          {isExporting
            ? <><Loader2 size={15} className="animate-spin" /> Exporting…</>
            : <><Download size={15} /> Download</>
          }
        </button>

        <button
          onClick={handleCopy}
          disabled={isCopying}
          className="btn-ghost"
          style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 14px' }}
        >
          {copied
            ? <><Check size={15} style={{ color: 'var(--success)' }} /> Copied!</>
            : isCopying
            ? <><Loader2 size={15} className="animate-spin" /> …</>
            : <><Copy size={15} /> Copy</>
          }
        </button>
      </div>
    </div>
  );
}
