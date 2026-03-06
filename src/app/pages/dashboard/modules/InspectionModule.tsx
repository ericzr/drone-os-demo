import { 
  AlertTriangle, 
  Battery, 
  Camera, 
  Check, 
  ChevronRight, 
  Clock, 
  Download, 
  Flame, 
  Map as MapIcon, 
  Maximize2, 
  Play, 
  Search, 
  Thermometer, 
  Wifi, 
  X,
  Zap,
  Leaf,
  Pickaxe,
  Activity
} from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const statsData = [
  { name: 'Mon', problems: 4 },
  { name: 'Tue', problems: 7 },
  { name: 'Wed', problems: 2 },
  { name: 'Thu', problems: 5 },
  { name: 'Fri', problems: 3 },
  { name: 'Sat', problems: 1 },
  { name: 'Sun', problems: 0 },
];

export default function InspectionModule() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname.split('/').pop();

  const [config, setConfig] = useState<any>({
    title: '行业巡检',
    icon: <MapIcon />,
    color: 'text-neutral-400',
    stats: { discovered: 0, resolved: 0, pending: 0 },
    issues: []
  });

  useEffect(() => {
    switch(path) {
      case 'forestry':
        setConfig({
          title: '林草防火巡检',
          icon: <Leaf className="w-6 h-6 text-[#F5C244]" />,
          color: 'text-[#F5C244]',
          stats: { discovered: 12, resolved: 8, pending: 4 },
          issues: [
            { id: 'F01', type: '火点疑似', loc: '3区 A段', time: '10:23', status: 'pending', risk: 'high' },
            { id: 'F02', type: '病虫害', loc: '1区 C段', time: '09:45', status: 'resolved', risk: 'medium' },
            { id: 'F03', type: '非法砍伐', loc: '5区 B段', time: '08:12', status: 'pending', risk: 'high' },
          ]
        });
        break;
      case 'solar':
        setConfig({
          title: '光伏电站巡检',
          icon: <Zap className="w-6 h-6 text-[#F5C244]" />,
          color: 'text-[#F5C244]',
          stats: { discovered: 45, resolved: 40, pending: 5 },
          issues: [
            { id: 'S01', type: '热斑效应', loc: '矩阵 B-12', time: '11:05', status: 'pending', risk: 'medium' },
            { id: 'S02', type: '组件遮挡', loc: '矩阵 A-04', time: '10:30', status: 'resolved', risk: 'low' },
            { id: 'S03', type: '二极管故障', loc: '矩阵 C-09', time: '09:15', status: 'pending', risk: 'high' },
          ]
        });
        break;
      case 'mining':
        setConfig({
          title: '矿山安全巡检',
          icon: <Pickaxe className="w-6 h-6 text-[#F5C244]" />,
          color: 'text-[#F5C244]',
          stats: { discovered: 8, resolved: 6, pending: 2 },
          issues: [
            { id: 'M01', type: '边坡位移', loc: '南坡 230m', time: '13:45', status: 'pending', risk: 'high' },
            { id: 'M02', type: '车辆违规', loc: '运输干道', time: '11:20', status: 'resolved', risk: 'low' },
          ]
        });
        break;
       case 'pipeline':
        setConfig({
          title: '油气管道巡检',
          icon: <Activity className="w-6 h-6 text-[#F5C244]" />,
          color: 'text-[#F5C244]',
          stats: { discovered: 3, resolved: 3, pending: 0 },
          issues: [
            { id: 'P01', type: '第三方施工', loc: 'K12+500', time: '14:10', status: 'resolved', risk: 'high' },
          ]
        });
        break;
      default:
        setConfig({
          title: '通用巡检模块',
          icon: <MapIcon className="w-6 h-6 text-neutral-400" />,
          color: 'text-neutral-400',
          stats: { discovered: 0, resolved: 0, pending: 0 },
          issues: []
        });
    }
  }, [path]);

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <button
              onClick={() => navigate('/dashboard/modules')}
              className="text-neutral-400 text-sm hover:text-[#F5C244] transition-colors cursor-pointer"
            >
              行业模块
            </button>
            <ChevronRight className="w-4 h-4 text-neutral-600" />
            <span className={`text-sm font-medium ${config.color}`}>{config.title}</span>
          </div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            {config.icon} {config.title}系统
          </h1>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => navigate('parameters')}
            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-sm font-medium transition-colors border border-neutral-700">
            配置参数
          </button>
          <button className="px-4 py-2 bg-[#F5C244] hover:bg-[#F5C244]/90 text-neutral-950 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-yellow-900/20 flex items-center gap-2">
            <Play className="w-4 h-4" /> 开始作业
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
        
        {/* Left Panel: Map */}
        <div className="col-span-12 lg:col-span-8 bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden relative">
           <div className="absolute inset-0 z-0">
               <img 
                 src={
                    path === 'forestry' ? "https://images.unsplash.com/photo-1751709852107-f7560a993fc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcm9uZSUyMHRoZXJtYWwlMjBzY2FuJTIwZm9yZXN0JTIwZmlyZSUyMHdpbGRmaXJlJTIwZGV0ZWN0aW9uJTIwbWFwfGVufDF8fHx8MTc3MjM0ODY4NHww&ixlib=rb-4.1.0&q=80&w=1080" :
                    path === 'solar' ? "https://images.unsplash.com/photo-1721137532012-ff8615f1ee8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMGZhcm0lMjB0aGVybWFsJTIwaW5zcGVjdGlvbiUyMHBhbmVsfGVufDF8fHx8MTc3MjM0ODY5Mnww&ixlib=rb-4.1.0&q=80&w=1080" :
                    path === 'mining' ? "https://images.unsplash.com/photo-1517089472343-85fc51aeb327?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcm9uZSUyMG1pbmluZyUyMGluc3BlY3Rpb24lMjAzZCUyMG1vZGVsJTIwcXVhcnJ5JTIwb3BlbiUyMHBpdHxlbnwxfHx8fDE3NzIzNDg2OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080" :
                    "https://images.unsplash.com/photo-1746988043334-b8677f2ec74c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXBlbGluZSUyMGluc3BlY3Rpb24lMjBtYXAlMjBnaXMlMjB2aWV3fGVufDF8fHx8MTc3MjM0ODY5OHww&ixlib=rb-4.1.0&q=80&w=1080"
                 }
                 alt="Inspection Map" 
                 className="w-full h-full object-cover opacity-60"
               />
               <div className="absolute inset-0 bg-neutral-900/10" />
           </div>

           {/* Overlay UI */}
           <div className="absolute top-4 left-4 flex gap-2">
              <div className="bg-neutral-900/90 backdrop-blur border border-neutral-700 px-3 py-1.5 rounded-lg text-xs font-mono text-white flex items-center gap-2">
                 <Wifi className="w-3 h-3 text-green-400" /> Link: 100%
              </div>
              <div className="bg-neutral-900/90 backdrop-blur border border-neutral-700 px-3 py-1.5 rounded-lg text-xs font-mono text-white flex items-center gap-2">
                 <Battery className="w-3 h-3 text-yellow-400" /> Battery: 78%
              </div>
           </div>

           {/* Issue Markers on Map (Mock) */}
           {config.issues.map((issue: any, idx: number) => (
             <div 
               key={idx}
               className="absolute w-6 h-6 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
               style={{ top: `${30 + idx * 15}%`, left: `${20 + idx * 20}%` }}
             >
               <div className={`w-full h-full rounded-full border-2 border-white flex items-center justify-center ${
                 issue.risk === 'high' ? 'bg-red-500 animate-pulse' : 'bg-yellow-500'
               }`}>
                 <span className="text-[10px] font-bold text-white">{idx + 1}</span>
               </div>
               
               {/* Tooltip */}
               <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-neutral-900 text-white text-xs rounded-lg p-3 hidden group-hover:block border border-neutral-700 shadow-xl z-20">
                 <div className="font-bold mb-1">{issue.type}</div>
                 <div className="text-neutral-400">位置: {issue.loc}</div>
                 <div className="text-neutral-400">时间: {issue.time}</div>
               </div>
             </div>
           ))}
        </div>

        {/* Right Panel: Data */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6 h-full min-h-0">
          
          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-3 shrink-0">
             <StatBox label="发现隐患" value={config.stats.discovered} color="text-white" />
             <StatBox label="已处理" value={config.stats.resolved} color="text-green-400" />
             <StatBox label="待处理" value={config.stats.pending} color="text-red-400" />
          </div>

          {/* Issue List */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl flex-1 flex flex-col min-h-0">
            <div className="p-4 border-b border-neutral-800 flex justify-between items-center shrink-0">
              <h3 className="font-bold text-white">问题清单</h3>
              <button className="text-xs text-[#F5C244] hover:text-[#F5C244]/80">导出报告</button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
              {config.issues.map((issue: any) => (
                <div key={issue.id} className="bg-neutral-950/50 p-3 rounded-lg border border-neutral-800 hover:border-neutral-600 transition-colors flex gap-3">
                   <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                     issue.risk === 'high' ? 'bg-red-500' : 'bg-yellow-500'
                   }`} />
                   <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-neutral-200 text-sm">{issue.type}</span>
                        <span className="text-xs text-neutral-500">{issue.time}</span>
                      </div>
                      <div className="text-xs text-neutral-400 truncate">
                        位置: {issue.loc}
                      </div>
                   </div>
                   <button className="self-center p-1.5 hover:bg-neutral-800 rounded text-neutral-400 hover:text-white transition-colors">
                     <ChevronRight className="w-4 h-4" />
                   </button>
                </div>
              ))}
              {config.issues.length === 0 && (
                <div className="text-center text-neutral-500 py-8 text-sm">
                  暂无异常记录
                </div>
              )}
            </div>
          </div>

          {/* Chart */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 h-48 shrink-0 flex flex-col">
             <h3 className="text-sm font-bold text-white mb-4">近7日异常趋势</h3>
             <div className="flex-1 min-h-0">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={statsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="name" stroke="#64748b" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                    <YAxis stroke="#64748b" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                    <Tooltip 
                      cursor={{fill: '#1e293b'}}
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                    />
                    <Bar dataKey="problems" fill="#F5C244" radius={[4, 4, 0, 0]} barSize={20} />
                  </BarChart>
               </ResponsiveContainer>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value, color }: any) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl text-center">
      <div className={`text-2xl font-bold ${color} mb-1`}>{value}</div>
      <div className="text-xs text-neutral-500">{label}</div>
    </div>
  )
}