import React from 'react';
import { NavLink } from 'react-router';
import { 
  LayoutDashboard, 
  Briefcase, 
  CheckSquare, 
  Plane, 
  Box, 
  BarChart3, 
  Settings, 
  Users,
  Award,
  BookOpen
} from 'lucide-react';
import { clsx } from 'clsx';

export function Sidebar() {
  const navItems = [
    { icon: LayoutDashboard, label: '控制台', path: '/' },
    { icon: Briefcase, label: '项目中心', path: '/projects' },
    { icon: CheckSquare, label: '任务中心', path: '/tasks' },
    { icon: Plane, label: '设备中心', path: '/devices' },
    { icon: Box, label: '行业模块', path: '/modules' },
    { icon: BarChart3, label: '数据报告', path: '/reports' },
    { icon: Award, label: '赛事管理', path: '/competitions' },
    { icon: BookOpen, label: '教育培训', path: '/training' },
    { icon: Users, label: '用户管理', path: '/users' },
    { icon: Settings, label: '系统设置', path: '/settings' },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen fixed left-0 top-0 z-20">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Plane className="w-6 h-6 text-white transform -rotate-45" />
          </div>
          <div>
            <h1 className="font-bold text-white text-lg tracking-tight leading-none">DroneOS</h1>
            <p className="text-xs text-slate-400 mt-1">企业版 v1.0</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                isActive
                  ? "bg-cyan-500/10 text-cyan-400 shadow-[inset_3px_0_0_0_rgba(34,211,238,1)]" // Active state
                  : "text-slate-400 hover:bg-slate-800 hover:text-white" // Inactive state
              )
            }
          >
            <item.icon className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
            <span className="font-medium text-sm">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800/50 rounded-lg p-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white">
            Admin
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">超级管理员</p>
            <p className="text-xs text-slate-400 truncate">admin@droneos.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
