/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Download, 
  Terminal, 
  CheckCircle2, 
  Circle, 
  Copy, 
  ExternalLink, 
  Layers, 
  Usb, 
  AlertTriangle,
  Info,
  ChevronRight,
  Package,
  HardDrive
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { COMMON_DATA_PACKAGES } from './constants';

export default function App() {
  const [selectedPackages, setSelectedPackages] = useState<string[]>(['pandas', 'numpy', 'matplotlib', 'openpyxl']);
  const [pythonVersion, setPythonVersion] = useState('3.9');
  const [platform, setPlatform] = useState('win_amd64');
  const [customPackage, setCustomPackage] = useState('');
  const [copyStatus, setCopyStatus] = useState<Record<string, boolean>>({});

  const togglePackage = (pkgId: string) => {
    setSelectedPackages(prev => 
      prev.includes(pkgId) ? prev.filter(p => p !== pkgId) : [...prev, pkgId]
    );
  };

  const addCustomPackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (customPackage && !selectedPackages.includes(customPackage)) {
      setSelectedPackages(prev => [...prev, customPackage]);
      setCustomPackage('');
    }
  };

  const packagesListString = selectedPackages.join(' ');

  const onlineScript = `@echo off
:: Step 1: 在有网络的电脑上运行此脚本
:: 目标版本: Python ${pythonVersion} (${platform})
:: 下载目录: ./python_packages

echo [1/2] 正在创建下载目录...
if not exist python_packages mkdir python_packages

echo [2/2] 正在下载指定的库及其依赖...
pip download ^
    --only-binary=:all: ^
    --platform ${platform} ^
    --python-version ${pythonVersion.replace('.', '')} ^
    --implementation cp ^
    --dest python_packages ^
    ${packagesListString}

echo.
echo ========================================================
echo 下载完成！请将 "python_packages" 文件夹拷贝到 U 盘。
echo ========================================================
pause`;

  const offlineScript = `@echo off
:: Step 2: 在离线电脑的 U 盘目录下运行此脚本
:: 请确保当前文件夹包含 "python_packages" 目录

echo 正在从本地目录安装库...
pip install --no-index --find-links=python_packages ${packagesListString}

echo.
echo ========================================================
echo 安装尝试完成。
echo ========================================================
pause`;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopyStatus(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopyStatus(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0F1117] text-slate-300 font-sans selection:bg-indigo-500/30 selection:text-white">
      {/* Header */}
      <header className="p-8 border-b border-slate-800 flex justify-between items-end bg-[#0F1117]/80 backdrop-blur-md sticky top-0 z-10">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight uppercase">Offline Package Helper</h1>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-slate-500 uppercase text-xs tracking-widest font-semibold">Python {pythonVersion} Infrastructure Tool</span>
            <div className="w-1 h-1 rounded-full bg-slate-700" />
            <span className="text-[10px] font-mono text-indigo-400/60 uppercase">Protocol v1.0.4</span>
          </div>
        </div>
        <div className="hidden md:block text-right">
          <div className="text-[10px] text-slate-500 font-bold tracking-widest mb-1 uppercase">STATUS</div>
          <div className="text-emerald-400 flex items-center gap-2 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> READY FOR EXPORT
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-12 gap-8 p-8 min-h-[calc(100vh-140px)]">
        
        {/* Left Column: Configuration & Packages */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          
          {/* Target Config Card */}
          <section className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl shadow-xl">
            <h2 className="text-slate-400 text-xs font-bold mb-6 uppercase tracking-widest flex items-center gap-2">
              <ChevronRight className="w-3 h-3 text-indigo-500" /> Target Environment
            </h2>
            
            <div className="space-y-5">
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-slate-500 tracking-tight">Python Interpreter</label>
                <select 
                  value={pythonVersion} 
                  onChange={(e) => setPythonVersion(e.target.value)}
                  className="w-full bg-[#0F1117] border border-slate-800 rounded-lg p-2.5 font-mono text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all appearance-none cursor-pointer"
                >
                  <option value="3.9">v3.9.x (Main Target)</option>
                  <option value="3.10">v3.10.x</option>
                  <option value="3.11">v3.11.x</option>
                  <option value="3.12">v3.12.x</option>
                  <option value="3.8">v3.8.x</option>
                </select>
              </div>
              
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-slate-500 tracking-tight">Platform Arch</label>
                <select 
                  value={platform} 
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full bg-[#0F1117] border border-slate-800 rounded-lg p-2.5 font-mono text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all appearance-none cursor-pointer"
                >
                  <option value="win_amd64">Windows x64 (win_amd64)</option>
                  <option value="win32">Windows x86 (win32)</option>
                  <option value="manylinux_2_17_x86_64">Linux x86_64</option>
                </select>
              </div>
            </div>
          </section>

          {/* Package Selection Card */}
          <section className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl shadow-xl flex-1 flex flex-col min-h-[400px]">
            <h2 className="text-slate-400 text-xs font-bold mb-6 uppercase tracking-widest flex items-center gap-2">
              <ChevronRight className="w-3 h-3 text-indigo-500" /> Package Bundle
            </h2>

            <form onSubmit={addCustomPackage} className="mb-6">
              <div className="flex group">
                <input 
                  type="text" 
                  placeholder="Insert custom package (e.g. torch)"
                  value={customPackage}
                  onChange={(e) => setCustomPackage(e.target.value)}
                  className="flex-1 bg-[#0F1117] border border-slate-800 border-r-0 rounded-l-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
                />
                <button type="submit" className="bg-indigo-600 text-white px-4 rounded-r-lg font-mono text-xs font-bold hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/20">
                  ADD
                </button>
              </div>
            </form>
            
            <div className="space-y-2 overflow-y-auto max-h-[50vh] pr-2 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
              {COMMON_DATA_PACKAGES.map((pkg) => (
                <button
                  key={pkg.id}
                  onClick={() => togglePackage(pkg.id)}
                  className={`w-full text-left p-3 rounded-lg border flex items-center justify-between transition-all group ${
                    selectedPackages.includes(pkg.id) 
                    ? 'bg-indigo-600/10 border-indigo-500/30 text-white' 
                    : 'bg-slate-900/30 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-bold tracking-tight">
                      {pkg.name}
                    </span>
                    <span className="text-[10px] opacity-60 font-medium">
                      {pkg.description}
                    </span>
                  </div>
                  {selectedPackages.includes(pkg.id) ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Circle className="w-4 h-4 opacity-20 group-hover:opacity-100 group-hover:text-indigo-400 transition-all shadow-sm" />
                  )}
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Terminal & Scripts */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
          
          {/* Main Terminal Window */}
          <div className="bg-[#0B0C10] border border-slate-800 rounded-xl overflow-hidden flex flex-col shadow-2xl flex-1 h-full min-h-[600px]">
            {/* Terminal Header */}
            <div className="bg-slate-800/30 px-6 py-4 flex items-center justify-between border-b border-slate-800/50">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/30 border border-red-500/20"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/30 border border-yellow-500/20"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/30 border border-green-500/20"></div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em]">{selectedPackages.length} BUNDLED DEPS</span>
                <span className="text-[10px] font-mono text-slate-600">|</span>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em]">deploy_protocol.bat</span>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-8 space-y-12 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
              
              {/* Note */}
              <div className="flex gap-4 p-4 rounded-lg bg-indigo-500/5 border border-indigo-500/10">
                <Info className="w-5 h-5 text-indigo-400 shrink-0" />
                <div className="text-sm leading-relaxed text-slate-400">
                  <strong className="text-slate-200 block mb-1">Non-Conda Infrastructure Compliant</strong>
                  This protocol uses <code className="text-indigo-300">pip download</code> to fetch immutable binary wheels for air-gapped systems. Guaranteed dependency resolution for Windows py39 environments.
                </div>
              </div>

              {/* Step 1 */}
              <section className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-white text-lg font-bold flex items-center gap-3 tracking-tight">
                    <span className="w-6 h-6 rounded flex items-center justify-center bg-slate-800 text-xs font-mono text-slate-400">01</span>
                    Online: Fetch Wheel Binaries
                  </h3>
                  <button 
                    onClick={() => handleCopy(onlineScript, 'online')}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold shadow-lg shadow-indigo-500/20 hover:bg-indigo-500 transition-colors uppercase tracking-widest active:scale-95"
                  >
                    {copyStatus['online'] ? <CheckCircle2 className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copyStatus['online'] ? 'Copied' : 'Copy BAT'}
                  </button>
                </div>
                <div className="bg-[#050505] p-6 rounded-xl border border-slate-800/80 shadow-inner group relative">
                  <pre className="font-mono text-sm leading-relaxed text-indigo-300 selection:bg-indigo-500/30 whitespace-pre-wrap break-all">
                    <code>{onlineScript}</code>
                  </pre>
                </div>
              </section>

              {/* Visual Divider */}
              <div className="flex items-center gap-6 py-4 opacity-20">
                <div className="h-px flex-1 bg-slate-700" />
                <Usb className="w-6 h-6 text-slate-400" />
                <div className="h-px flex-1 bg-slate-700" />
              </div>

              {/* Step 2 */}
              <section className="space-y-4 pb-12">
                <div className="flex justify-between items-center">
                  <h3 className="text-white text-lg font-bold flex items-center gap-3 tracking-tight">
                    <span className="w-6 h-6 rounded flex items-center justify-center bg-slate-800 text-xs font-mono text-slate-400">02</span>
                    Offline: Air-Gapped Install
                  </h3>
                  <button 
                    onClick={() => handleCopy(offlineScript, 'offline')}
                    className="flex items-center gap-2 px-4 py-2 border border-slate-700 text-slate-300 rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors uppercase tracking-widest active:scale-95"
                  >
                    {copyStatus['offline'] ? <CheckCircle2 className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copyStatus['offline'] ? 'Copied' : 'Copy BAT'}
                  </button>
                </div>
                <div className="bg-[#050505] p-6 rounded-xl border border-slate-800/80 shadow-inner">
                  <pre className="font-mono text-sm leading-relaxed text-indigo-300 selection:bg-indigo-500/30 whitespace-pre-wrap break-all">
                    <code>{offlineScript}</code>
                  </pre>
                </div>
              </section>

            </div>
          </div>
          
          {/* Footer Info */}
          <footer className="flex items-center justify-between mt-auto">
            <div className="flex gap-4">
               <button 
                onClick={() => handleCopy(selectedPackages.join('\n'), 'reqs')}
                className="text-[10px] font-mono text-slate-600 hover:text-indigo-400 transition-colors uppercase tracking-widest border-b border-slate-800 pb-0.5"
               >
                 Export requirements.txt
               </button>
            </div>
            <div className="text-[10px] text-slate-700 font-mono tracking-tighter uppercase">
              SECURE DEPLOYMENT PROTOCOL V1.0 // NON-CONDA COMPLIANT
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
