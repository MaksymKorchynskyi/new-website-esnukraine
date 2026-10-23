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

export default function AttachmentFiles({ files }: AttachmentFilesProps) {
  const [activeFile, setActiveFile] = useState<AttachmentFile | null>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile/touch devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768
      );
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Reset loading state when switching files
  useEffect(() => {
    if (activeFile) {
      setIframeLoaded(false);
      setIframeError(false);
    }
  }, [activeFile]);

  // Закриття модального вікна по Escape
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
    window.open(file.fileUrl, '_blank', 'noopener,noreferrer');
  }, []);

  const handleFileClick = useCallback((file: AttachmentFile) => {
    const ext = getFileExtension(file.originalFilename, file.fileUrl);
    // On mobile: always open directly in browser (native PDF viewer handles touch/scroll/zoom)
    // On desktop: open inline preview for PDFs, direct for others
    if (isMobile || !isPreviewable(ext)) {
      window.open(file.fileUrl, '_blank', 'noopener,noreferrer');
    } else {
      setActiveFile(file);
    }
  }, [isMobile]);

  if (!files || files.length === 0) return null;

  return (
    <section className="pb-6 px-6 sm:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-1.5 h-6 bg-esn-cyan rounded-full" />
          <h3 className="text-2xl font-black text-esn-dark tracking-tight">
            Attachment Files
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {files.map((file) => {
            if (!file.fileUrl) return null;
            const displayTitle = file.title || file.originalFilename || 'Document';
            const ext = getFileExtension(file.originalFilename, file.fileUrl);
            const formattedSize = formatFileSize(file.size);
            const previewable = isPreviewable(ext);

            return (
              <div
                key={file._key || file.fileUrl}
                onClick={() => handleFileClick(file)}
                className="group bg-white rounded-2xl p-4 border border-gray-100 hover:border-esn-cyan shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-4 cursor-pointer"
              >
                <div className="w-11 h-11 rounded-xl bg-esn-cyan/10 group-hover:bg-esn-cyan text-esn-cyan group-hover:text-white transition-colors flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0 pr-2">
                  <h4 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-esn-cyan transition-colors truncate">
                    {displayTitle}
                  </h4>
                  <div className="flex items-center gap-2 mt-1 text-xs font-medium text-gray-400">
                    <span className="font-extrabold uppercase text-esn-magenta">{ext}</span>
                    {formattedSize && (
                      <>
                        <span>•</span>
                        <span>{formattedSize}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => handleDownload(e, file)}
                    className="w-9 h-9 rounded-xl border border-gray-200 bg-gray-50 hover:bg-esn-dark hover:border-esn-dark text-gray-500 hover:text-white flex items-center justify-center transition-all duration-200"
                    aria-label={`Download ${displayTitle}`}
                    title="Download"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  {previewable && (
                    <button
                      onClick={(e) => { e.stopPropagation(); handleFileClick(file); }}
                      className="w-9 h-9 rounded-xl border border-gray-200 bg-gray-50 hover:bg-esn-cyan hover:border-esn-cyan text-gray-500 hover:text-white flex items-center justify-center transition-all duration-200"
                      aria-label={`Preview ${displayTitle}`}
                      title="Preview"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Модальне вікно перегляду документу прямо на сайті */}
      {activeFile && (
        <div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-3 md:p-4 animate-fade-in overscroll-none"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveFile(null);
          }}
          onWheel={(e) => e.stopPropagation()}
        >
          {/* Modal container: full-screen on mobile, rounded card on desktop */}
          <div className="bg-white w-full sm:max-w-6xl md:max-w-7xl h-[100dvh] sm:h-[93dvh] rounded-none sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-scale-up sm:border sm:border-gray-100">
            {/* Хедер модалки — компактний на мобільних */}
            <div className="px-4 py-3 sm:px-6 sm:py-4 bg-gray-900 text-white flex items-center justify-between gap-3 sm:gap-4 shrink-0 border-b border-gray-800">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-esn-cyan/20 text-esn-cyan flex items-center justify-center shrink-0">
                  <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-white text-sm sm:text-base md:text-lg truncate leading-tight">
                    {activeFile.title || activeFile.originalFilename || 'Document Preview'}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-gray-400 truncate hidden sm:block">
                    {activeFile.originalFilename} {formatFileSize(activeFile.size) && `(${formatFileSize(activeFile.size)})`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <a
                  href={activeFile.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 bg-esn-cyan hover:bg-[#0095cc] text-white text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl transition-colors shadow-sm shrink-0"
                  title="Open in new tab or download"
                >
                  <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span className="font-bold">Open</span>
                </a>

                <button
                  onClick={() => setActiveFile(null)}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                  aria-label="Close"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content: Iframe / PDF Viewer */}
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
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gray-50 gap-4 px-6">
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
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-esn-cyan hover:bg-[#0095cc] text-white text-sm font-bold rounded-xl transition-colors shadow-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Open document
                  </a>
                </div>
              )}

              {/* Direct URL — no Google Docs Viewer */}
              <iframe
                src={`${activeFile.fileUrl}#view=Fit`}
                className="w-full h-full border-0 flex-1 bg-white"
                title={activeFile.title || activeFile.originalFilename || 'Document'}
                onLoad={() => setIframeLoaded(true)}
              />
              {/* Footer — hidden on mobile to maximize reading area */}
              <div className="hidden sm:flex bg-gray-50 border-t border-gray-200 px-6 py-2.5 text-xs text-gray-500 items-center justify-between shrink-0">
                <span>Document preview embedded directly on ESN Ukraine website</span>
                <button
                  onClick={(e) => activeFile && handleDownload(e, activeFile)}
                  className="text-esn-dark hover:text-esn-cyan font-semibold inline-flex items-center gap-1 underline transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download file
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
