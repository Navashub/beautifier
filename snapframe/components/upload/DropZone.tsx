'use client';

import { useRef, useState, useCallback } from 'react';
import { Upload, ImageIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DropZoneProps {
  onImageLoad: (dataUrl: string, file: File) => void;
}

export function DropZone({ onImageLoad }: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.match(/image\/(png|jpeg|jpg|webp)/)) return;
    if (file.size > 10 * 1024 * 1024) {
      alert('File must be under 10MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreview(result);
      setFileName(file.name);
      onImageLoad(result, file);
    };
    reader.readAsDataURL(file);
  }, [onImageLoad]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const clear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    setFileName('');
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div
      onClick={() => !preview && inputRef.current?.click()}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={cn(
        'relative rounded-xl border-2 border-dashed transition-all duration-200 cursor-pointer overflow-hidden',
        isDragging
          ? 'border-[var(--accent)] bg-[var(--accent-glow)] scale-[1.01]'
          : preview
          ? 'border-[var(--border)] cursor-default'
          : 'border-[var(--border)] hover:border-[var(--border-bright)] hover:bg-[var(--bg-hover)]'
      )}
      style={{ minHeight: 140 }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={handleInputChange}
      />

      {preview ? (
        <div className="relative">
          <img src={preview} alt="Uploaded" className="w-full max-h-48 object-contain bg-[var(--bg-tertiary)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
            <span className="text-xs text-white/70 truncate flex-1">{fileName}</span>
            <button onClick={clear} className="btn-icon w-7 h-7 ml-2 flex-shrink-0">
              <X size={12} />
            </button>
          </div>
          <button
            onClick={() => inputRef.current?.click()}
            className="absolute top-2 right-2 btn-ghost text-xs py-1 px-2"
            style={{ fontSize: 11 }}
          >
            Change
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 py-10 px-4 text-center">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ background: 'var(--accent-glow)', border: '1px solid var(--accent)' }}
          >
            {isDragging ? <ImageIcon size={22} style={{ color: 'var(--accent)' }} /> : <Upload size={22} style={{ color: 'var(--accent)' }} />}
          </div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>
              {isDragging ? 'Drop it here!' : 'Drop screenshot here'}
            </p>
            <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              or click to browse · PNG, JPG, WebP · max 10MB
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
