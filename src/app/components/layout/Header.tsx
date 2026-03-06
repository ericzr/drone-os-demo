import React from 'react';
import { Bell, Search, User, ChevronDown } from 'lucide-react';

export function Header() {
  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-8 z-10">
      <div className="flex items-center gap-4 text-slate-400">
        <h2 className="text-xl font-semibold text-white tracking-tight">控制台</h2>
        <span className="text-slate-600">/</span>
        <span className="text-sm">欢迎回来, 管理员</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative group">
          <input 
            type="text" 
            placeholder="搜索任务、设备或项目..." 
            className="bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded-lg pl-10 pr-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all placeholder:text-slate-500"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-cyan-400 transition-colors" />
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 text-slate-400 hover:text-white transition-colors hover:bg-slate-800 rounded-lg">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-slate-900"></span>
          </button>
          
          <div className="h-8 w-px bg-slate-800"></div>

          <button className="flex items-center gap-3 text-sm font-medium text-slate-300 hover:text-white transition-colors group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-400/30 transition-shadow">
              A
            </div>
            <span>Admin</span>
            <ChevronDown className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </div>
    </header>
  );
}
