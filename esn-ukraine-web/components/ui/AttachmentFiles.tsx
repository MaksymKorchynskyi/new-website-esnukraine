'use client';

import React, { useState, useEffect } from 'react';
import { FileText, Eye, ExternalLink, X, Paperclip, Download } from 'lucide-react';

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

export default function AttachmentFiles({ files }: AttachmentFilesProps) {
  const [activeFile, setActiveFile] = useState<AttachmentFile | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {files.map((file) => {
            if (!file.fileUrl) return null;
            const displayTitle = file.title || file.originalFilename || 'Document';
            const ext = getFileExtension(file.originalFilename, file.fileUrl);
            const formattedSize = formatFileSize(file.size);

            return (
              <div
                key={file._key || file.fileUrl}
                onClick={() => setActiveFile(file)}
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

                <div className="text-gray-300 group-hover:text-esn-cyan transition-colors shrink-0">
                  <Eye className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Модальне вікно перегляду документу прямо на сайті */}
      {activeFile && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-6 animate-fade-in overscroll-none"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveFile(null);
          }}
          onWheel={(e) => e.stopPropagation()}
        >
          <div className="bg-white w-full max-w-5xl h-[88vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-scale-up border border-gray-100">
            {/* Хедер модалки */}
            <div className="px-6 py-4 bg-gray-900 text-white flex items-center justify-between gap-4 shrink-0 border-b border-gray-800">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-esn-cyan/20 text-esn-cyan flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-white text-base sm:text-lg truncate">
                    {activeFile.title || activeFile.originalFilename || 'Document Preview'}
                  </h4>
                  <p className="text-xs text-gray-400 truncate">
                    {activeFile.originalFilename} {formatFileSize(activeFile.size) && `(${formatFileSize(activeFile.size)})`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={activeFile.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-esn-cyan hover:bg-[#0095cc] text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors shadow-sm shrink-0"
                  title="Open in new tab or download"
                >
                  <ExternalLink className="w-4 h-4 shrink-0" />
                  <span className="inline font-bold">Open</span>
                </a>

                <button
                  onClick={() => setActiveFile(null)}
                  className="w-9 h-9 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content: Iframe / PDF Viewer */}
            <div 
              className="flex-1 w-full bg-gray-100 relative overflow-auto flex flex-col"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              <iframe
                src={
                  isMobile
                    ? `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(activeFile.fileUrl)}`
                    : `${activeFile.fileUrl}#view=Fit`
                }
                className="w-full min-h-[75vh] sm:min-h-0 sm:h-full border-0 flex-1 bg-white"
                title={activeFile.title || activeFile.originalFilename || 'Document'}
              />
              <div className="bg-gray-50 border-t border-gray-200 px-6 py-2.5 text-xs text-gray-500 flex items-center justify-between shrink-0">
                <span>Document preview embedded directly on ESN Ukraine website</span>
                <a
                  href={activeFile.fileUrl}
                  download={activeFile.originalFilename || 'document'}
                  className="text-esn-dark hover:text-esn-cyan font-semibold inline-flex items-center gap-1 underline transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download file
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
