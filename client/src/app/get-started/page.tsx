// app/get-started/page.tsx
'use client';

import React, { useState, useCallback, useRef } from 'react';
import { 
  Store, MessageSquare, CloudUpload, CheckCircle, AlertCircle,
  Palette, ChevronDown, ChevronUp, Bolt, Bell, Settings,
  LayoutDashboard, Network, BookOpen, Share2, X, FileText
} from 'lucide-react';
import Link from 'next/link';

// ErrorIcon component for error display
const ErrorIcon = AlertCircle;

export default function GetStartedPage() {
  const [shopName, setShopName] = useState('');
  const [description, setDescription] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [isCustomizationOpen, setIsCustomizationOpen] = useState(false);
  const [isLiveEcosystem, setIsLiveEcosystem] = useState(true);
  const [brandAccent, setBrandAccent] = useState('#818cf8');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= 500) {
      setDescription(text);
      setCharCount(text.length);
    }
  };

  const handleFileChange = useCallback((selectedFile: File | null) => {
    if (!selectedFile) return;

    if (selectedFile.type !== 'application/pdf' && !selectedFile.name.endsWith('.pdf')) {
      setUploadStatus('error');
      setTimeout(() => setUploadStatus('idle'), 3000);
      return;
    }

    if (selectedFile.size > 25 * 1024 * 1024) {
      setUploadStatus('error');
      setTimeout(() => setUploadStatus('idle'), 3000);
      return;
    }

    setFile(selectedFile);
    setIsUploading(true);
    setUploadStatus('uploading');

    // Simulate upload
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
    if (!shopName.trim()) {
      alert('Please enter your shop name');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log({ shopName, description, file, isLiveEcosystem, brandAccent });
    alert('Support system initialized successfully!');
    
    setIsSubmitting(false);
  };

  const removeFile = () => {
    setFile(null);
    setUploadStatus('idle');
  };

  return (
    <div className="min-h-screen flex flex-col relative animated-bg">
      {/* Background Decoration Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="particle w-64 h-64 blur-3xl -top-20 -left-20 opacity-30" />
        <div className="particle w-96 h-96 blur-3xl -bottom-32 -right-32 opacity-20 bg-tertiary-container" />
        <div className="absolute top-1/4 left-1/3 w-1 h-1 bg-primary rounded-full animate-pulse" />
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-secondary rounded-full animate-pulse delay-700" />
      </div>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-6 pt-24 pb-12">
        <div className="w-full max-w-[600px] glass-card rounded-2xl p-8 md:p-10 relative overflow-hidden">
          {/* Decorative Inner Glow */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
          
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
              Initialize Your Support Ecosystem
            </h1>
            <p className="text-zinc-400 leading-relaxed">
              Define your digital presence and bootstrap your knowledge base in seconds.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
          
            {/* Description */}
            <div className="space-y-2 group transition-all duration-300">
              <label className="block text-xs font-bold tracking-widest text-zinc-400 uppercase ml-1">
                Description
              </label>
              <div className="relative bg-[#1f1f2e] rounded-xl border border-zinc-700/50 focus-within:shadow-[0_0_15px_rgba(129,140,248,0.3)] focus-within:border-indigo-400 transition-all">
                <MessageSquare className="absolute top-3.5 left-4 text-zinc-500 group-focus-within:text-indigo-400 transition-colors w-5 h-5" />
                <textarea
                  value={description}
                  onChange={handleDescriptionChange}
                  placeholder="Briefly describe your support mission..."
                  rows={4}
                  className="w-full bg-transparent border-none text-white placeholder:text-zinc-600 pl-12 pr-4 py-3.5 focus:outline-none resize-none rounded-xl"
                />
                <div className="absolute bottom-3 right-4 text-[10px] font-mono text-zinc-500">
                  {charCount} / 500
                </div>
              </div>
            </div>

            {/* OR Divider */}
            <div className="relative py-4 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
              </div>
              <span className="relative px-4 bg-[#1a1a24] text-[10px] font-bold tracking-[0.2em] text-indigo-400">
                OR
              </span>
            </div>

            {/* PDF Upload Zone */}
            <div className="space-y-2">
              <label className="block text-xs font-bold tracking-widest text-zinc-400 uppercase ml-1">
                Knowledge Source
              </label>
              
              {uploadStatus !== 'success' ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`
                    group relative border-2 border-dashed rounded-2xl p-8 transition-all 
                    flex flex-col items-center justify-center cursor-pointer overflow-hidden
                    ${isDragging ? 'border-indigo-400 bg-indigo-500/10' : 'border-indigo-400/20 hover:border-indigo-400/50 hover:bg-indigo-500/5'}
                    ${uploadStatus === 'error' ? 'border-red-400/50 bg-red-500/5' : ''}
                  `}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                  <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10 flex flex-col items-center text-center">
                    {isUploading ? (
                      <>
                        <div className="w-10 h-10 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin mb-2" />
                        <p className="text-sm font-medium text-white">Uploading...</p>
                      </>
                    ) : (
                      <>
                        <CloudUpload className="w-10 h-10 text-indigo-400 mb-2" />
                        <p className="text-sm font-medium text-white">Drag & drop technical PDF</p>
                        <p className="text-xs text-zinc-500 mt-1">Maximum file size 25MB</p>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-[#1f1f2e] rounded-xl p-4 border border-indigo-400/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="w-8 h-8 text-indigo-400" />
                      <div>
                        <p className="text-white text-sm font-medium">{file?.name}</p>
                        <p className="text-xs text-zinc-500">
                          {(file?.size && (file.size / 1024 / 1024).toFixed(2)) || '0'} MB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="p-1 rounded-lg hover:bg-red-500/20 transition-colors"
                    >
                      <X className="w-5 h-5 text-red-400" />
                    </button>
                  </div>
                </div>
              )}

              {/* File status indicators */}
              <div className="flex gap-2 mt-2">
                {file && uploadStatus === 'success' && (
                  <div className="flex items-center gap-1 text-[10px] text-green-400 border border-green-400/20 rounded-full px-2 py-0.5 bg-green-400/5">
                    <CheckCircle className="w-3 h-3" />
                    <span className="max-w-[150px] truncate">{file.name}</span>
                  </div>
                )}
                {uploadStatus === 'error' && (
                  <div className="flex items-center gap-1 text-[10px] text-red-400 border border-red-400/20 rounded-full px-2 py-0.5 bg-red-400/5">
                    <ErrorIcon className="w-3 h-3" />
                    Invalid file format or size (max 25MB, PDF only)
                  </div>
                )}
              </div>
            </div>

            {/* Customization Options */}
            <div className="border-t border-white/5 pt-6 space-y-4">
              <button
                type="button"
                onClick={() => setIsCustomizationOpen(!isCustomizationOpen)}
                className="flex items-center justify-between w-full group"
              >
                <div className="flex items-center gap-3">
                  <Palette className="w-5 h-5 text-indigo-400" />
                  <span className="text-sm font-semibold text-white">Advanced Customization</span>
                </div>
                {isCustomizationOpen ? (
                  <ChevronUp className="w-5 h-5 text-zinc-500 group-hover:text-white transition-all" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-zinc-500 group-hover:text-white transition-all" />
                )}
              </button>
              
              {isCustomizationOpen && (
                <div className="grid grid-cols-2 gap-4 animate-in slide-in-from-top-2 duration-200">
                  <div className="p-4 bg-white/5 rounded-xl flex items-center justify-between">
                    <span className="text-xs font-medium text-zinc-400">Live Ecosystem</span>
                    <button
                      type="button"
                      onClick={() => setIsLiveEcosystem(!isLiveEcosystem)}
                      className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${
                        isLiveEcosystem ? 'bg-indigo-500' : 'bg-zinc-700'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          isLiveEcosystem ? 'translate-x-5' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl flex items-center justify-between">
                    <span className="text-xs font-medium text-zinc-400">Brand Accent</span>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-6 h-6 rounded-md border border-white/20 shadow-[0_0_8px_rgba(129,140,248,0.5)]"
                        style={{ backgroundColor: brandAccent }}
                      />
                      <input
                        type="color"
                        value={brandAccent}
                        onChange={(e) => setBrandAccent(e.target.value)}
                        className="w-0 h-0 opacity-0 absolute"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const colorInput = document.querySelector('input[type="color"]') as HTMLInputElement;
                          colorInput?.click();
                        }}
                        className="text-xs text-indigo-400 hover:text-indigo-300"
                      >
                        Change
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full relative group mt-4 overflow-hidden rounded-xl p-[1px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 group-hover:scale-105 transition-transform duration-500" />
              <div className="relative bg-[#1a1a24]/80 group-hover:bg-transparent px-8 py-4 rounded-[11px] transition-all duration-300 flex items-center justify-center gap-2">
                <span className="text-sm font-bold tracking-widest text-white uppercase">
                  {isSubmitting ? 'Initializing...' : 'Initialize Core'}
                </span>
                <Bolt className="w-4 h-4 text-white transition-transform group-hover:translate-x-1" />
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-40 bg-white blur-xl transition-opacity duration-300 pointer-events-none" />
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-[11px] text-zinc-500 uppercase tracking-widest">
              Powered by <span className="text-indigo-400/80">SupportOS Neural Engine</span>
            </p>
          </div>
        </div>
      </main>


     
    </div>
  );
}