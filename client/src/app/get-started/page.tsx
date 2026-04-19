// app/get-started/page.tsx
'use client';

import React, { useState, useCallback, useRef } from 'react';
import { Upload, CheckCircle, AlertCircle, Sparkles, Copy, X } from 'lucide-react';
import Link from 'next/link';

export default function GetStartedPage() {
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false); // Used for file drop
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback((selectedFile: File | null) => {
    if (!selectedFile) return;

    // Validate file type
    if (selectedFile.type !== 'application/pdf' && !selectedFile.name.endsWith('.pdf')) {
      setUploadStatus('error');
      setTimeout(() => setUploadStatus('idle'), 3000);
      return;
    }

    // Validate file size (25MB max)
    if (selectedFile.size > 25 * 1024 * 1024) {
      setUploadStatus('error');
      setTimeout(() => setUploadStatus('idle'), 3000);
      return;
    }

    setFile(selectedFile);
    setIsUploading(true);
    setUploadStatus('uploading');

    // Simulate direct file select delay internally before confirming
    setTimeout(() => {
      setUploadStatus('success');
      setIsUploading(false);
    }, 1500);
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFileChange(droppedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      alert('Please enter a description of your support goals.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append('description', description);
      if (file) {
        formData.append('file', file);
      }
      
      const response = await fetch('http://localhost:5000/api/onboard', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Onboarding failed. Please try again.');
      }
      
      // Successfully uploaded to database
      setShowModal(true);
    } catch (error) {
      console.error(error);
      alert('Failed to connect to backend layer. Is the server running?');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`<script src="http://localhost:3000/embed.js"></script>`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getUploadZoneContent = () => {
    if (uploadStatus === 'success' && file) {
      return (
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-emerald-400" />
          </div>
          <div className="text-center">
            <p className="text-on-surface font-medium">{file.name}</p>
            <p className="text-on-surface-variant text-sm">Ready to use</p>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setFile(null);
              setUploadStatus('idle');
            }}
            className="text-on-surface-variant hover:text-on-surface text-sm underline"
          >
            Remove file
          </button>
        </div>
      );
    }

    if (uploadStatus === 'error') {
      return (
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-red-400" />
          </div>
          <div className="text-center">
            <p className="text-red-400 font-medium">Upload failed</p>
            <p className="text-on-surface-variant text-sm">PDF only, max 25MB</p>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setUploadStatus('idle');
              setFile(null);
            }}
            className="text-on-surface-variant hover:text-on-surface text-sm underline"
          >
            Try again
          </button>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center gap-3 pointer-events-none">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
          {isUploading ? (
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          ) : (
            <Upload className="w-6 h-6 text-primary" />
          )}
        </div>
        <div className="text-center">
          <p className="text-on-surface">
            {isUploading ? 'Validating...' : 'Click to upload or drag and drop'}
          </p>
          <p className="text-on-surface-variant text-sm">Maximum file size 25MB</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col relative font-body">
      
      {/* SUCCESS MODAL OVERLAY */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-surface-container-lowest rounded-2xl w-full max-w-lg p-6 shadow-2xl animate-in zoom-in-95 fade-in duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-500/10 rounded-full">
                  <CheckCircle className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-on-surface">System Initialized!</h3>
                  <p className="text-sm text-on-surface-variant">Your embed script is ready.</p>
                </div>
              </div>
              <button onClick={() => setShowModal(false)} className="text-on-surface-variant hover:text-on-surface p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-on-surface/80 text-sm mb-4 leading-relaxed">
              Paste this line into the <code className="bg-background px-1 rounded">{'<head>'}</code> or just before the closing <code className="bg-background px-1 rounded">{'</body>'}</code> tag of your website's index.html.
            </p>

            <div className="relative group">
              <pre className="p-4 bg-background border border-outline-variant/30 rounded-xl overflow-x-auto text-sm text-primary-container font-mono shadow-inner">
                {`<script src="http://localhost:3000/embed.js"></script>`}
              </pre>
              <button 
                onClick={handleCopy}
                className="absolute top-1/2 -translate-y-1/2 right-3 p-2 bg-surface-container hover:bg-surface-variant text-on-surface-variant rounded-lg transition-colors border border-outline/10 shadow-sm"
              >
                {copied ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Canvas */}
      <main className="flex-grow flex items-center justify-center pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Abstract Background Decorative Elements */}
        <div className="absolute top-[-10%] left-[-5%] w-[40rem] h-[40rem] bg-surface-container rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[35rem] h-[35rem] bg-surface-container-highest rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
        
        <div className="max-w-2xl w-full z-10">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-medium">FluidArch</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight mb-4 font-headline">
              Initialize Your Ecosystem
            </h1>
            <p className="text-on-surface-variant text-lg max-w-md mx-auto leading-relaxed">
              Let's weave your custom support layer. Provide context below to begin the fluid integration.
            </p>
          </div>

          {/* Focused Form Card */}
          <div className="bg-surface-container-lowest rounded-xl shadow-[0_12px_40px_rgba(11,28,48,0.06)] p-8 md:p-12 border border-outline-variant/10">
            <form onSubmit={handleSubmit} className="space-y-8">

              {/* Description Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-on-surface tracking-wide" htmlFor="description">
                  General Description / Guidelines
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell the Custom Agent a little about your platform and what rules it should follow..."
                  rows={4}
                  className="w-full bg-surface-container-high border-none rounded-lg px-4 py-4 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all duration-300 outline-none resize-none"
                />
              </div>

              {/* File Upload Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-on-surface tracking-wide flex justify-between">
                  <span>Upload Knowledge Base (PDF)</span>
                  <span className="text-outline-variant font-normal">Optional</span>
                </label>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => !file && uploadStatus !== 'uploading' && fileInputRef.current?.click()}
                  className={`
                    group relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl transition-all duration-300 overflow-hidden cursor-pointer
                    ${isDragging ? 'border-primary bg-primary/5 scale-[1.02]' : 'border-outline-variant bg-surface-container-low hover:bg-surface-container-high'}
                    ${uploadStatus === 'success' ? 'border-emerald-500/50 bg-emerald-500/5' : ''}
                    ${uploadStatus === 'error' ? 'border-red-500/50 bg-red-500/5' : ''}
                  `}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                  {getUploadZoneContent()}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={!description.trim() || isSubmitting}
                  className="relative overflow-hidden w-full bg-gradient-to-r from-primary to-primary-container text-on-primary py-5 rounded-xl font-bold text-lg shadow-xl shadow-primary/20 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
                >
                  {isSubmitting ? 'Weaving Matrix...' : 'Create Support System'}
                </button>
                <p className="text-center text-xs text-on-surface-variant mt-6">
                  By creating a system, you agree to our{' '}
                  <Link href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}