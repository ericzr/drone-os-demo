import { Outlet, Link, useLocation } from "react-router";
import { 
  LayoutDashboard, 
  Map, 
  Plane, 
  Briefcase, 
  FileBarChart, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Database,
  Users,
  Grid,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { clsx } from "clsx";
import logoImage from '@/assets/1c33d8ce79f07a27217969ebad83026e488dc64c.png';

const MIN_WIDTH = 64;
const MAX_WIDTH = 480;
const DEFAULT_WIDTH = 256;
const SNAP_THRESHOLD = 160;

export default function DashboardLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(DEFAULT_WIDTH);
  const [isResizing, setIsResizing] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const navigation = [
    { name: '控制台', href: '/dashboard', icon: LayoutDashboard },
    { name: '任务中心', href: '/dashboard/missions', icon: Map },
    { name: '资产管理', href: '/dashboard/fleet', icon: Plane },
    { name: '行业模块', href: '/dashboard/modules', icon: Grid },
    { name: '数据报告', href: '/dashboard/reports', icon: FileBarChart },
  ];

  const secondaryNavigation = [
    { name: '系统设置', href: '#', icon: Settings },
  ];

  const startResizing = useCallback((mouseDownEvent: React.MouseEvent) => {
    mouseDownEvent.preventDefault();
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (mouseMoveEvent: MouseEvent) => {
      if (isResizing) {
        let newWidth = mouseMoveEvent.clientX;
        
        // Constraint check
        if (newWidth < SNAP_THRESHOLD) {
          setIsCollapsed(true);
          newWidth = MIN_WIDTH;
        } else {
          setIsCollapsed(false);
          if (newWidth > MAX_WIDTH) newWidth = MAX_WIDTH;
        }

        setSidebarWidth(newWidth);
      }
    },
    [isResizing]
  );

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  // Toggle collapse manually
  const toggleCollapse = () => {
    if (isCollapsed) {
      setIsCollapsed(false);
      setSidebarWidth(DEFAULT_WIDTH);
    } else {
      setIsCollapsed(true);
      setSidebarWidth(MIN_WIDTH);
    }
  };

  return (
    <div className="h-screen bg-neutral-950 flex overflow-hidden">
      {/* Mobile sidebar backdrop */}
      <div 
        className={clsx(
          "fixed inset-0 z-40 bg-neutral-900/80 backdrop-blur-sm transition-opacity lg:hidden",
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Sidebar */}
      <aside 
        ref={sidebarRef}
        className={clsx(
          "fixed inset-y-0 left-0 z-50 bg-neutral-900 border-r border-neutral-800 flex flex-col transition-all duration-75 lg:static",
          mobileMenuOpen ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0"
        )}
        style={{ width: window.innerWidth >= 1024 ? sidebarWidth : undefined }}
      >
        {/* Header */}
        <div className={clsx("flex items-center h-16 border-b border-neutral-800 transition-all", isCollapsed ? "justify-center px-0" : "px-6")}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
             <img src={logoImage} alt="DroneOS Logo" className="w-full h-full object-contain" />
          </div>
          {!isCollapsed && (
            <span className="ml-3 text-xl font-bold text-white tracking-tight truncate">DroneOS</span>
          )}
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto overflow-x-hidden">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={clsx(
                  isActive 
                    ? 'bg-[#F5C244]/10 text-[#F5C244]' 
                    : 'text-neutral-400 hover:bg-neutral-800 hover:text-white',
                  'group flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap',
                  isCollapsed && 'justify-center px-2'
                )}
                title={isCollapsed ? item.name : undefined}
              >
                <item.icon 
                  className={clsx(
                    isActive ? 'text-[#F5C244]' : 'text-neutral-500 group-hover:text-white',
                    'flex-shrink-0 h-5 w-5',
                    !isCollapsed && 'mr-3'
                  )} 
                />
                {!isCollapsed && (
                  <span className="opacity-100 transition-opacity duration-200">
                    {item.name}
                  </span>
                )}
              </Link>
            )
          })}
          
          <div className="pt-6 mt-6 border-t border-neutral-800">
            {!isCollapsed && (
              <div className="px-3 mb-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider truncate">
                系统
              </div>
            )}
            {secondaryNavigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={clsx(
                  'group flex items-center px-3 py-2.5 text-sm font-medium text-neutral-400 rounded-md hover:bg-neutral-800 hover:text-white transition-colors whitespace-nowrap',
                  isCollapsed && 'justify-center px-2'
                )}
                title={isCollapsed ? item.name : undefined}
              >
                <item.icon className={clsx("flex-shrink-0 h-5 w-5 text-neutral-500 group-hover:text-white", !isCollapsed && "mr-3")} />
                {!isCollapsed && item.name}
              </a>
            ))}
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-neutral-800">
          <div className={clsx("flex items-center", isCollapsed ? "justify-center" : "")}>
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#F5C244] to-[#ffda7b] flex items-center justify-center text-neutral-950 font-bold text-sm shrink-0 cursor-pointer">
              AD
            </div>
            {!isCollapsed && (
              <div className="ml-3 overflow-hidden">
                <p className="text-sm font-medium text-white truncate">Admin User</p>
                <p className="text-xs text-neutral-500 truncate">超级管理员</p>
              </div>
            )}
            {!isCollapsed && (
              <button className="ml-auto text-neutral-500 hover:text-white">
                <LogOut className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Resize Handle (Desktop Only) */}
        <div 
          className="hidden lg:block absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-[#F5C244] transition-colors z-50 group"
          onMouseDown={startResizing}
        >
           {/* Visual indicator for handle */}
           <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-8 -mr-2 bg-neutral-800 border border-neutral-700 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-lg"
             onClick={(e) => { e.stopPropagation(); toggleCollapse(); }}
           >
              {isCollapsed ? <ChevronRight className="w-3 h-3 text-neutral-400" /> : <ChevronLeft className="w-3 h-3 text-neutral-400" />}
           </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-neutral-950">
        <header className="flex items-center justify-between h-16 px-6 bg-neutral-900 border-b border-neutral-800 lg:hidden shrink-0">
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="text-neutral-400 hover:text-white"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-bold text-white">控制台</span>
          <div className="w-6" /> {/* Spacer */}
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
