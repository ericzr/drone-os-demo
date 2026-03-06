import { 
  AlertTriangle, 
  Battery, 
  Bell, 
  Camera, 
  ChevronRight, 
  Clock, 
  Eye, 
  Map as MapIcon, 
  Play, 
  Settings, 
  Share2, 
  Thermometer, 
  Video, 
  Wifi, 
  X,
  Target,
  Route
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { motion } from "motion/react";

const animalData = [
  { time: '08:00', count: 420 },
  { time: '10:00', count: 445 },
  { time: '12:00', count: 452 },
  { time: '14:00', count: 448 },
  { time: '16:00', count: 435 },
  { time: '18:00', count: 425 },
];

export default function HerdingModule() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedZone, setSelectedZone] = useState<number | null>(null);

  // Mock animals for map visualization
  const animals = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: 20 + Math.random() * 60, // % position
    y: 30 + Math.random() * 40, // % position
    status: Math.random() > 0.9 ? 'stray' : 'normal',
  }));

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
            <span className="text-[#F5C244] text-sm font-medium">智能放牧</span>
          </div>
          <h1 className="text-2xl font-bold text-white">AI 智能放牧巡查系统</h1>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-neutral-300 text-sm">系统运行正常</span>
          </div>
          <button className="px-4 py-2 bg-[#F5C244] hover:bg-[#F5C244]/90 text-neutral-950 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-yellow-900/20 flex items-center gap-2">
            <Play className="w-4 h-4" /> 启动巡查
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
        
        {/* Left Panel: Map & Live View */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6 h-full">
          {/* Map View */}
          <div className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden relative group">
            <div className="absolute inset-0 z-0">
               <img 
                 src="https://images.unsplash.com/photo-1708621760228-1402edc5f97f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcm9uZSUyMHRoZXJtYWwlMjBzY2FuJTIwY293cyUyMHNoZWVwJTIwZmFybSUyMHBhc3R1cmUlMjBhaSUyMGRldGVjdGlvbnxlbnwxfHx8fDE3NzIzNDg3MDN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                 alt="Satellite Map" 
                 className="w-full h-full object-cover opacity-60"
               />
               <div className="absolute inset-0 bg-neutral-900/20" />
            </div>

            {/* Drone Position */}
            <motion.div 
              animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 z-20"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-[#F5C244]/20 rounded-full animate-ping" />
                <div className="w-8 h-8 bg-[#F5C244] border-2 border-white rounded-lg flex items-center justify-center shadow-xl transform -rotate-45">
                   <Target className="w-5 h-5 text-neutral-950" />
                </div>
                {/* Scanning Cone */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-32 h-32 bg-gradient-to-b from-[#F5C244]/30 to-transparent clip-path-polygon" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
              </div>
            </motion.div>

            {/* Animal Markers */}
            {animals.map((animal) => (
              <div 
                key={animal.id}
                className={`absolute w-3 h-3 rounded-full border border-black/50 shadow-sm transition-all duration-1000 ${
                  animal.status === 'stray' ? 'bg-red-500 animate-pulse' : 'bg-green-400'
                }`}
                style={{ top: `${animal.y}%`, left: `${animal.x}%` }}
              >
                {animal.status === 'stray' && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-0.5 bg-red-600 text-white text-[10px] rounded whitespace-nowrap">
                    越界警报
                  </div>
                )}
              </div>
            ))}

            {/* Map Controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <button className="p-2 bg-neutral-900/80 backdrop-blur text-white rounded-lg border border-neutral-700 hover:bg-neutral-800">
                <MapIcon className="w-5 h-5" />
              </button>
              <button className="p-2 bg-neutral-900/80 backdrop-blur text-white rounded-lg border border-neutral-700 hover:bg-neutral-800">
                <Route className="w-5 h-5" />
              </button>
            </div>

            <div className="absolute bottom-4 left-4 bg-neutral-900/90 backdrop-blur border border-neutral-700 p-4 rounded-xl">
              <div className="flex items-center gap-4 text-sm">
                <div>
                  <div className="text-neutral-500 mb-1">当前位置</div>
                  <div className="text-white font-mono">116.4074° E, 39.9042° N</div>
                </div>
                <div className="w-px h-8 bg-neutral-700" />
                <div>
                   <div className="text-neutral-500 mb-1">飞行高度</div>
                   <div className="text-white font-mono">120m</div>
                </div>
                <div className="w-px h-8 bg-neutral-700" />
                <div>
                   <div className="text-neutral-500 mb-1">速度</div>
                   <div className="text-white font-mono">8.5 m/s</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Data & Controls */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6 h-full overflow-y-auto pr-2 custom-scrollbar">
          
          {/* Live Stats */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shrink-0">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5 text-[#F5C244]" /> 实时监测数据
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-neutral-950/50 p-4 rounded-lg border border-neutral-800">
                <div className="text-neutral-400 text-xs mb-1">当前牲畜总数</div>
                <div className="text-2xl font-bold text-white">452</div>
                <div className="text-green-400 text-xs mt-1">↑ 32 (较昨日)</div>
              </div>
              <div className="bg-neutral-950/50 p-4 rounded-lg border border-neutral-800">
                <div className="text-neutral-400 text-xs mb-1">越界/离群</div>
                <div className="text-2xl font-bold text-red-400">3</div>
                <div className="text-red-400/70 text-xs mt-1">需立即关注</div>
              </div>
            </div>
          </div>

          {/* AI Analysis */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shrink-0 flex flex-col">
            <h3 className="text-lg font-bold text-white mb-4 shrink-0">牧群数量趋势</h3>
            <div className="h-48 w-full shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={animalData}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F5C244" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#F5C244" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="time" stroke="#64748b" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                  <YAxis stroke="#64748b" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                  />
                  <Area type="monotone" dataKey="count" stroke="#F5C244" strokeWidth={2} fillOpacity={1} fill="url(#colorCount)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-6 flex flex-col gap-3">
              <h4 className="text-sm font-semibold text-white shrink-0">今日异常记录</h4>
              <div className="space-y-3 overflow-y-auto pr-1 custom-scrollbar max-h-40">
                 <AlertItem 
                  time="14:23" 
                  msg="发现 2 只羊偏离牧区东侧边界 50 米" 
                  level="high" 
                />
                 <AlertItem 
                  time="12:45" 
                  msg="北区草场饮水点聚集度过高" 
                  level="medium" 
                />
              </div>
            </div>
          </div>

           {/* Drone Control */}
           <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shrink-0">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Video className="w-5 h-5 text-[#F5C244]" /> 实时回传
              </h3>
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden border border-neutral-800 mb-4">
                 <img 
                   src="https://images.unsplash.com/photo-1708621760228-1402edc5f97f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcm9uZSUyMHRoZXJtYWwlMjBzY2FuJTIwY293cyUyMHNoZWVwJTIwZmFybSUyMHBhc3R1cmUlMjBhaSUyMGRldGVjdGlvbnxlbnwxfHx8fDE3NzIzNDg3MDN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                   className="w-full h-full object-cover opacity-80"
                   alt="Drone View"
                 />
                 <div className="absolute top-2 left-2 flex gap-2">
                    <span className="bg-red-600 px-1.5 py-0.5 rounded text-[10px] text-white font-bold uppercase">LIVE</span>
                    <span className="bg-black/50 px-1.5 py-0.5 rounded text-[10px] text-white font-mono">REC ●</span>
                 </div>
                 {/* AI Bounding Box Overlay Mock */}
                 <div className="absolute top-[30%] left-[40%] w-[10%] h-[15%] border-2 border-green-500 rounded-sm">
                    <div className="absolute -top-4 left-0 bg-green-500 text-black text-[10px] px-1 font-bold">Cow 98%</div>
                 </div>
                 <div className="absolute top-[50%] left-[60%] w-[8%] h-[12%] border-2 border-green-500 rounded-sm"></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button className="py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded text-sm transition-colors border border-neutral-700">
                  喊话驱离
                </button>
                <button className="py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded text-sm transition-colors border border-neutral-700">
                  切换红外
                </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function AlertItem({ time, msg, level }: any) {
  const colors = {
    high: 'border-l-red-500 bg-red-500/5',
    medium: 'border-l-yellow-500 bg-yellow-500/5',
    low: 'border-l-blue-500 bg-blue-500/5',
  };

  return (
    <div className={`p-3 rounded-r border-l-2 ${colors[level as keyof typeof colors]} text-sm`}>
      <div className="flex justify-between text-xs text-neutral-500 mb-1">
        <span>{time}</span>
        <span className="uppercase font-bold tracking-wider" style={{ fontSize: '10px' }}>{level}</span>
      </div>
      <div className="text-neutral-300 leading-snug">
        {msg}
      </div>
    </div>
  )
}