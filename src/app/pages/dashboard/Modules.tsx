import { 
  Activity, 
  Box, 
  Leaf, 
  Map, 
  Search, 
  Shield, 
  Users, 
  Zap,
  Plus,
  Target
} from "lucide-react";
import { Link } from "react-router";

export default function Modules() {
  const modules = [
    { id: 1, name: "林草巡检", icon: <Leaf className="w-8 h-8 text-green-400" />, desc: "火情识别、病虫害监测、覆盖率计算", status: "installed", path: "/dashboard/modules/forestry" },
    { id: 2, name: "AI 智能放牧", icon: <Target className="w-8 h-8 text-indigo-400" />, desc: "牲畜计数、电子围栏、越界报警", status: "installed", path: "/dashboard/modules/herding" },
    { id: 3, name: "光伏巡检", icon: <Zap className="w-8 h-8 text-yellow-400" />, desc: "红外热斑识别、故障定位、发电损失估算", status: "installed", path: "/dashboard/modules/solar" },
    { id: 4, name: "露天矿巡检", icon: <Box className="w-8 h-8 text-orange-400" />, desc: "三维建模、边坡监测、堆料体积测算", status: "installed", path: "/dashboard/modules/mining" },
    { id: 5, name: "管道巡线", icon: <Activity className="w-8 h-8 text-blue-400" />, desc: "GIS轨迹匹配、异常点标记、违建识别", status: "available", path: "/dashboard/modules/pipeline" },
    { id: 6, name: "农林植保", icon: <Leaf className="w-8 h-8 text-lime-400" />, desc: "作业面积统计、药剂记录、自动结算", status: "available", path: "/dashboard/modules/agriculture" },
    { id: 7, name: "安防/赛事", icon: <Shield className="w-8 h-8 text-red-400" />, desc: "人流监控、实时直播、应急指挥调度", status: "available", path: "/dashboard/modules/security" },
    { id: 8, name: "青少年教育", icon: <Users className="w-8 h-8 text-pink-400" />, desc: "报名系统、选手管理、裁判评分系统", status: "available", path: "/dashboard/modules/education" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">行业模块中心</h1>
          <p className="text-neutral-400">像安装 APP 一样扩展您的业务能力。</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-neutral-800 text-white rounded-lg border border-neutral-700 hover:bg-neutral-700 transition-colors text-sm font-medium">
            开发者文档
          </button>
          <button className="px-4 py-2 bg-[#F5C244] text-neutral-950 rounded-lg hover:bg-[#F5C244]/90 transition-colors shadow-lg shadow-[#F5C244]/20 text-sm font-bold">
            申请开发权限
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <Link 
            key={module.id} 
            to={module.path}
            className="block group"
          >
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:border-[#F5C244]/30 transition-colors flex flex-col h-full group-hover:bg-neutral-800/30">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-neutral-800 rounded-lg group-hover:bg-neutral-700 transition-colors">
                  {module.icon}
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium border ${
                  module.status === 'installed' 
                    ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                    : 'bg-neutral-700/50 text-neutral-300 border-neutral-600'
                }`}>
                  {module.status === 'installed' ? '已安装' : '未安装'}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#F5C244] transition-colors">{module.name}</h3>
              <p className="text-neutral-400 text-sm mb-6 flex-1">
                {module.desc}
              </p>
              
              <div className={`w-full py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                module.status === 'installed'
                  ? 'bg-neutral-800 text-white hover:bg-neutral-700 border border-neutral-700 group-hover:bg-[#F5C244] group-hover:text-neutral-950 group-hover:border-[#F5C244]'
                  : 'bg-[#F5C244]/10 text-[#F5C244] hover:bg-[#F5C244]/20 border border-[#F5C244]/30'
              }`}>
                {module.status === 'installed' ? '进入模块' : (
                  <>
                    <Plus className="w-4 h-4" /> 安装模块
                  </>
                )}
              </div>
            </div>
          </Link>
        ))}
        
        {/* New Module Placeholder */}
        <div className="bg-neutral-950 border border-dashed border-neutral-800 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-neutral-900/50 transition-colors cursor-pointer group">
          <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center mb-4 group-hover:bg-neutral-700 transition-colors">
            <Plus className="w-6 h-6 text-neutral-400 group-hover:text-white" />
          </div>
          <h3 className="text-lg font-medium text-white mb-1">自定义模块</h3>
          <p className="text-neutral-500 text-sm">
            根据您的业务需求定制专属解决方案
          </p>
        </div>
      </div>
    </div>
  );
}
