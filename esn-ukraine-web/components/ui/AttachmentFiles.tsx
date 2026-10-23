'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { FileText, Eye, ExternalLink, X, Download, Loader2, AlertCircle } from 'lucide-react';

export interface AttachmentFile {
  _key: string;
  title?: string;
  description?: string;
  fileUrl: string;
  originalFilename?: string;
  mimeType?: string;
  size?: number;
}

interface AttachmentFilesProps {
  files?: AttachmentFile[] | null;
}

function formatFileSize(bytes?: number): string {
  if (!bytes || bytes === 0) return '';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function getFileExtension(filename?: string, url?: string): string {
  if (filename) {
    const ext = filename.split('.').pop()?.toUpperCase();
    if (ext && ext.length <= 5) return ext;
  }
  if (url) {
    const ext = url.split('?')[0].split('.').pop()?.toUpperCase();
    if (ext && ext.length <= 5) return ext;
  }
  return 'FILE';
}

/** Check if file type supports inline preview in iframe */
function isPreviewable(ext: string): boolean {
  return ['PDF'].includes(ext);
}

/** Extension → accent color mapping for file badges */
function getExtColor(ext: string): string {
  switch (ext) {
    case 'PDF':
      return 'bg-red-500/10 text-red-600 border-red-200';
    case 'DOC':
    case 'DOCX':
      return 'bg-blue-500/10 text-blue-600 border-blue-200';
    case 'XLS':
    case 'XLSX':
      return 'bg-emerald-500/10 text-emerald-600 border-emerald-200';
    case 'PPT':
    case 'PPTX':
      return 'bg-orange-500/10 text-orange-600 border-orange-200';
    case 'ZIP':
    case 'RAR':
      return 'bg-amber-500/10 text-amber-700 border-amber-200';
    default:
      return 'bg-gray-100 text-gray-600 border-gray-200';
  }
}

export default function AttachmentFiles({ files }: AttachmentFilesProps) {
  const [activeFile, setActiveFile] = useState<AttachmentFile | null>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  // Reset loading state when switching files
  useEffect(() => {
    if (activeFile) {
      setIframeLoaded(false);
      setIframeError(false);
    }
  }, [activeFile]);

  // Close modal on Escape + lock body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveFile(null);
    };
    if (activeFile) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeFile]);

  // Timeout fallback: if iframe hasn't loaded in 12s, show error state
  useEffect(() => {
    if (!activeFile || iframeLoaded || iframeError) return;
    const timer = setTimeout(() => {
      if (!iframeLoaded) setIframeError(true);
    }, 12000);
    return () => clearTimeout(timer);
  }, [activeFile, iframeLoaded, iframeError]);

  const handleDownload = useCallback((e: React.MouseEvent, file: AttachmentFile) => {
    e.stopPropagation();
    // Cross-origin: download attribute doesn't work, open in new tab instead
    window.open(file.fileUrl, '_blank', 'noopener,noreferrer');
  }, []);

  const handlePreviewClick = useCallback((file: AttachmentFile) => {
    const ext = getFileExtension(file.originalFilename, file.fileUrl);
    if (isPreviewable(ext)) {
      // Open inline preview modal for PDFs
      setActiveFile(file);
    } else {
      // Non-previewable: open directly in new tab
      window.open(file.fileUrl, '_blank', 'noopener,noreferrer');
    }
  }, []);

  if (!files || files.length === 0) return null;

  return (
    <section className="py-6 px-6 sm:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-1.5 h-6 bg-esn-cyan rounded-full" />
          <h3 className="text-2xl font-black text-esn-dark tracking-tight">
            Attachment Files
          </h3>
        </div>

        {/* ─── File Cards Grid ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {files.map((file) => {
            if (!file.fileUrl) return null;
            const displayTitle = file.title || file.originalFilename || 'Document';
            const ext = getFileExtension(file.originalFilename, file.fileUrl);
            const formattedSize = formatFileSize(file.size);
            const previewable = isPreviewable(ext);

            return (
              <div
                key={file._key || file.fileUrl}
                className="group relative bg-white rounded-xl border border-gray-200/80 hover:border-esn-dark/20 transition-all duration-200 overflow-hidden"
              >
                <div className="flex items-stretch">
                  {/* Left accent bar */}
                  <div className="w-1 bg-esn-dark/10 group-hover:bg-esn-dark transition-colors duration-200 shrink-0" />

                  {/* Content area */}
                  <div className="flex-1 flex items-center gap-3.5 px-4 py-3.5 min-w-0">
                    {/* File type badge */}
                    <div className={`w-10 h-10 rounded-lg border flex items-center justify-center shrink-0 ${getExtColor(ext)}`}>
                      <span className="text-[10px] font-black tracking-wider leading-none">{ext}</span>
                    </div>

                    {/* File info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-gray-900 leading-snug truncate">
                        {displayTitle}
                      </h4>
                      {(formattedSize || file.description) && (
                        <p className="text-xs text-gray-400 mt-0.5 truncate">
                          {file.description || formattedSize}
                        </p>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      {/* Download / Open in new tab */}
                      <button
                        onClick={(e) => handleDownload(e, file)}
                        className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-esn-dark hover:text-white text-gray-400 flex items-center justify-center transition-colors duration-150"
                        aria-label={`Download ${displayTitle}`}
                        title="Download / Open in new tab"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>

                      {/* Preview (only for previewable types) */}
                      {previewable && (
                        <button
                          onClick={() => handlePreviewClick(file)}
                          className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-esn-cyan hover:text-white text-gray-400 flex items-center justify-center transition-colors duration-150"
                          aria-label={`Preview ${displayTitle}`}
                          title="Preview"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── Preview Modal ─── */}
      {activeFile && (() => {
        const ext = getFileExtension(activeFile.originalFilename, activeFile.fileUrl);
        const formattedSize = formatFileSize(activeFile.size);

        return (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-6"
            onClick={(e) => {
              if (e.target === e.currentTarget) setActiveFile(null);
            }}
          >
            <div className="bg-white w-full max-w-5xl h-[88dvh] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-200/50">
              {/* Header */}
              <div className="px-5 py-3.5 bg-esn-dark flex items-center justify-between gap-4 shrink-0">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${getExtColor(ext)} border-white/20`}>
                    <span className="text-[9px] font-black tracking-wider">{ext}</span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-white text-sm sm:text-base truncate leading-tight">
                      {activeFile.title || activeFile.originalFilename || 'Document Preview'}
                    </h4>
                    {formattedSize && (
                      <p className="text-[11px] text-white/50 truncate mt-0.5">
                        {activeFile.originalFilename} · {formattedSize}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={activeFile.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg transition-colors"
                    title="Open in new tab"
                  >
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    <span className="hidden sm:inline">Open</span>
                  </a>

                  <button
                    onClick={() => setActiveFile(null)}
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* iframe content */}
              <div
                className="flex-1 w-full bg-gray-100 relative overflow-auto flex flex-col"
                style={{ WebkitOverflowScrolling: 'touch' }}
              >
                {/* Loading spinner overlay */}
                {!iframeLoaded && !iframeError && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gray-50 gap-3">
                    <Loader2 className="w-8 h-8 text-esn-dark animate-spin" />
                    <p className="text-sm text-gray-500 font-medium">Loading document…</p>
                  </div>
                )}

                {/* Error / timeout fallback */}
                {iframeError && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gray-50 gap-4">
                    <div className="w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center">
                      <AlertCircle className="w-7 h-7 text-amber-500" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-gray-700 mb-1">Preview unavailable</p>
                      <p className="text-xs text-gray-400 max-w-xs">
                        The document is taking too long to load. You can open it directly instead.
                      </p>
                    </div>
                    <a
                      href={activeFile.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-esn-dark hover:bg-esn-dark/90 text-white text-sm font-bold rounded-xl transition-colors shadow-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Open document
                    </a>
                  </div>
                )}

                {/* Direct URL for all platforms — no Google Docs Viewer */}
                <iframe
                  src={`${activeFile.fileUrl}#view=Fit`}
                  className="w-full min-h-[75dvh] sm:min-h-0 sm:h-full border-0 flex-1 bg-white"
                  title={activeFile.title || activeFile.originalFilename || 'Document'}
                  onLoad={() => setIframeLoaded(true)}
                />
              </div>
            </div>
          </div>
        );
      })()}
    </section>
  );
}
