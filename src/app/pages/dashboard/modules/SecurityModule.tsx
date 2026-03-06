import { 
  AlertTriangle, 
  Battery, 
  Camera, 
  ChevronRight, 
  Clock, 
  Eye, 
  Map as MapIcon, 
  Play, 
  Search, 
  Shield, 
  Siren, 
  Users, 
  Video, 
  Wifi,
  ZoomIn,
  Mic,
  Volume2
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

const crowdData = [
  { time: '18:00', density: 1200 },
  { time: '18:30', density: 3400 },
  { time: '19:00', density: 6800 },
  { time: '19:30', density: 9200 },
  { time: '20:00', density: 8500 },
  { time: '20:30', density: 4200 },
];

export default function SecurityModule() {
  const navigate = useNavigate();
  const [activeCam, setActiveCam] = useState(1);

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
            <span className="text-[#F5C244] text-sm font-medium">安防/赛事</span>
          </div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Shield className="w-6 h-6 text-[#F5C244]" /> 智能安防指挥中心
          </h1>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-red-900/20 border border-red-900/50 rounded-lg text-red-400 animate-pulse">
            <Siren className="w-4 h-4" />
            <span className="text-sm font-bold">警戒级别: II级</span>
          </div>
          <button className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-sm font-medium transition-colors border border-neutral-700">
            预案管理
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
        
        {/* Left: Video Matrix */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-4 h-full">
           {/* Main Feed */}
           <div className="flex-1 bg-black border border-neutral-800 rounded-xl overflow-hidden relative group">
              <img 
                 src="https://images.unsplash.com/photo-1643087241268-171145387a05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcm9uZSUyMGNyb3dkJTIwc3VydmVpbGxhbmNlJTIwdGhlcm1hbCUyMG5pZ2h0JTIwdmlzaW9uJTIwbWFwfGVufDF8fHx8MTc3MjM1NDE2MHww&ixlib=rb-4.1.0&q=80&w=1080"
                 alt="Main Feed"
                 className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                 <div className="bg-red-600 px-2 py-0.5 text-xs font-bold text-white rounded animate-pulse">LIVE</div>
                 <div className="bg-black/60 px-2 py-0.5 text-xs font-mono text-green-400 rounded border border-green-900">CAM-01 (Main)</div>
              </div>
              
              {/* Overlay HUD */}
              <div className="absolute inset-0 pointer-events-none p-8">
                 <div className="w-full h-full border border-white/10 relative">
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#F5C244]" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#F5C244]" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#F5C244]" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#F5C244]" />
                    
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-dashed border-[#F5C244]/30 rounded-full" />
                 </div>
              </div>
              
              {/* Controls Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent flex justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                 <button className="p-2 rounded-full bg-neutral-800/80 text-white hover:bg-neutral-700 transition-colors">
                    <ZoomIn className="w-5 h-5" />
                 </button>
                 <button className="p-2 rounded-full bg-neutral-800/80 text-white hover:bg-neutral-700 transition-colors">
                    <Camera className="w-5 h-5" />
                 </button>
                 <button className="p-2 rounded-full bg-neutral-800/80 text-white hover:bg-neutral-700 transition-colors">
                    <Mic className="w-5 h-5" />
                 </button>
                 <button className="p-2 rounded-full bg-neutral-800/80 text-white hover:bg-neutral-700 transition-colors">
                    <Volume2 className="w-5 h-5" />
                 </button>
              </div>
           </div>

           {/* Secondary Feeds */}
           <div className="h-32 grid grid-cols-4 gap-4">
              {[2,3,4,5].map(camId => (
                <div 
                  key={camId} 
                  className={`bg-black border rounded-lg overflow-hidden relative cursor-pointer hover:border-[#F5C244] transition-colors ${
                    activeCam === camId ? 'border-[#F5C244]' : 'border-neutral-800'
                  }`}
                  onClick={() => setActiveCam(camId)}
                >
                   <div className="absolute top-1 left-1 bg-black/50 px-1 rounded text-[10px] text-white">CAM-0{camId}</div>
                   <div className="w-full h-full flex items-center justify-center bg-neutral-900">
                      <Video className="w-6 h-6 text-neutral-700" />
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Right: Data & Incidents */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6 h-full min-h-0">
           
           {/* Crowd Density */}
           <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shrink-0">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-[#F5C244]" /> 人流密度监测
              </h3>
              <div className="h-40 w-full mb-2">
                 <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={crowdData}>
                       <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                       <XAxis dataKey="time" stroke="#64748b" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                       <YAxis stroke="#64748b" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                       <Tooltip 
                         contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                       />
                       <Line type="monotone" dataKey="density" stroke="#F5C244" strokeWidth={2} dot={false} />
                    </LineChart>
                 </ResponsiveContainer>
              </div>
              <div className="flex justify-between items-end p-3 bg-neutral-950/50 rounded-lg border border-neutral-800">
                 <div>
                    <div className="text-xs text-neutral-400 mb-1">当前区域人数估算</div>
                    <div className="text-2xl font-bold text-white">4,285</div>
                 </div>
                 <div className="text-right">
                    <div className="text-xs text-neutral-500">拥挤指数</div>
                    <div className="text-lg font-bold text-yellow-500">中等</div>
                 </div>
              </div>
           </div>

           {/* Incident Log */}
           <div className="bg-neutral-900 border border-neutral-800 rounded-xl flex-1 flex flex-col min-h-0">
              <div className="p-4 border-b border-neutral-800 flex justify-between items-center shrink-0">
                 <h3 className="font-bold text-white flex items-center gap-2">
                   <AlertTriangle className="w-4 h-4 text-[#F5C244]" /> 实时警情
                 </h3>
                 <span className="text-xs bg-red-900/50 text-red-400 px-2 py-0.5 rounded-full border border-red-900">3 未处理</span>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                 <IncidentItem 
                   time="20:45:12" 
                   type="异常聚集" 
                   loc="北门入口" 
                   level="high" 
                 />
                 <IncidentItem 
                   time="20:42:05" 
                   type="车辆违停" 
                   loc="消防通道 B2" 
                   level="medium" 
                 />
                 <IncidentItem 
                   time="20:30:00" 
                   type="无人机入侵" 
                   loc="空域 A (禁飞区)" 
                   level="high" 
                 />
                 <IncidentItem 
                   time="20:15:22" 
                   type="人员跌倒" 
                   loc="看台 C区" 
                   level="low" 
                 />
              </div>
           </div>
           
           {/* Quick Actions */}
           <div className="grid grid-cols-2 gap-3 shrink-0">
              <button className="py-3 bg-[#F5C244] hover:bg-[#F5C244]/90 text-neutral-950 font-bold rounded-lg shadow-lg shadow-yellow-900/20 transition-colors">
                 一键疏散广播
              </button>
              <button className="py-3 bg-neutral-800 hover:bg-neutral-700 text-white font-medium rounded-lg border border-neutral-700 transition-colors">
                 派遣巡逻队
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}

function IncidentItem({ time, type, loc, level }: any) {
  const colors = {
    high: 'border-l-red-500 bg-red-500/5',
    medium: 'border-l-orange-500 bg-orange-500/5',
    low: 'border-l-blue-500 bg-blue-500/5',
  };

  return (
    <div className={`p-3 rounded-r border-l-2 ${colors[level as keyof typeof colors]} hover:bg-neutral-800 transition-colors cursor-pointer`}>
      <div className="flex justify-between text-xs text-neutral-500 mb-1">
        <span>{time}</span>
        <span className="uppercase font-bold tracking-wider text-[10px]">{level}</span>
      </div>
      <div className="flex justify-between items-start">
         <span className="text-neutral-200 font-medium text-sm">{type}</span>
         <span className="text-neutral-400 text-xs text-right">{loc}</span>
      </div>
    </div>
  )
}