import { Outlet, Link } from "react-router";
import { Plane, Menu, X, Globe, Shield, Activity, Users } from "lucide-react";
import { useState } from "react";
import { clsx } from "clsx";
import { motion } from "motion/react";
import logoImage from '@/assets/1c33d8ce79f07a27217969ebad83026e488dc64c.png';

export default function LandingLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-[#F5C244]/30 selection:text-neutral-950">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
                <img src={logoImage} alt="DroneOS Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">大航蜂 <span className="text-[#F5C244]">Drone OS</span></span>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link to="/" onClick={() => window.scrollTo(0, 0)} className="hover:text-[#F5C244] transition-colors px-3 py-2 rounded-md text-sm font-medium">首页</Link>
                <a href="#features" className="hover:text-[#F5C244] transition-colors px-3 py-2 rounded-md text-sm font-medium">核心功能</a>
                <a href="#solutions" className="hover:text-[#F5C244] transition-colors px-3 py-2 rounded-md text-sm font-medium">行业方案</a>
              </div>
            </div>

            <div className="hidden md:block">
              <Link 
                to="/dashboard" 
                className="bg-[#F5C244] hover:bg-[#F5C244]/90 text-neutral-950 px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-lg shadow-[#F5C244]/20"
              >
                进入控制台
              </Link>
            </div>

            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 focus:outline-none"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-neutral-900 border-b border-neutral-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" className="text-neutral-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">首页</Link>
              <a href="#features" className="text-neutral-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">核心功能</a>
              <a href="#solutions" className="text-neutral-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">行业方案</a>
              <Link to="/dashboard" className="bg-[#F5C244] text-neutral-950 block px-3 py-2 rounded-md text-base font-bold mt-4">进入控制台</Link>
            </div>
          </div>
        )}
      </nav>

      <main className="pt-16">
        <Outlet />
      </main>

      <footer className="bg-neutral-900 border-t border-neutral-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded flex items-center justify-center overflow-hidden">
                   <img src={logoImage} alt="DroneOS Logo" className="w-full h-full object-contain" />
                </div>
                <span className="font-bold text-lg text-white">大航蜂 Drone OS</span>
              </div>
              <p className="text-neutral-400 text-sm max-w-sm">
                全过程无人值守作业应用架构。提供设备+数据+应用的完整应用框架，帮助政企实现规模化运营。
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-neutral-200 uppercase tracking-wider mb-4">产品</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-neutral-400 hover:text-[#F5C244] text-sm">功能概览</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-[#F5C244] text-sm">行业方案</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-[#F5C244] text-sm">更新日志</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-neutral-200 uppercase tracking-wider mb-4">支持</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-neutral-400 hover:text-[#F5C244] text-sm">帮助文档</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-[#F5C244] text-sm">API 文档</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-[#F5C244] text-sm">联系我们</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-neutral-800 text-center text-neutral-500 text-sm">
            &copy; 2026 深圳云界空域科技有限公司. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
