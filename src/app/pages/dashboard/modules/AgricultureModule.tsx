import { 
  BarChart2, 
  Battery, 
  Calendar, 
  CheckCircle, 
  ChevronRight, 
  CloudRain, 
  Droplet, 
  LayoutGrid, 
  Map as MapIcon, 
  Play, 
  Settings, 
  Wind,
  Tractor, // Using Tractor as a proxy for heavy machinery/agri
  Leaf
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const sprayData = [
  { time: '08:00', amount: 120 },
  { time: '09:00', amount: 145 },
  { time: '10:00', amount: 132 },
  { time: '11:00', amount: 158 },
  { time: '12:00', amount: 80 }, // Lunch break dip
  { time: '13:00', amount: 140 },
  { time: '14:00', amount: 160 },
];

export default function AgricultureModule() {
  const navigate = useNavigate();
  const [tankLevel, setTankLevel] = useState(78);

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
            <span className="text-[#F5C244] text-sm font-medium">农林植保</span>
          </div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Leaf className="w-6 h-6 text-[#F5C244]" /> 智能植保作业系统
          </h1>
        </div>
        <div className="flex gap-3">
           <div className="flex items-center gap-4 px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm">
              <div className="flex items-center gap-2 text-neutral-300">
                <Wind className="w-4 h-4 text-blue-400" /> 2.4 m/s (西北风)
              </div>
              <div className="w-px h-4 bg-neutral-700" />
              <div className="flex items-center gap-2 text-neutral-300">
                <CloudRain className="w-4 h-4 text-[#F5C244]" /> 湿度 45%
              </div>
           </div>
          <button className="px-4 py-2 bg-[#F5C244] hover:bg-[#F5C244]/90 text-neutral-950 rounded-lg text-sm font-bold transition-colors shadow-lg shadow-yellow-900/20 flex items-center gap-2">
            <Play className="w-4 h-4" /> 开始作业
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
        
        {/* Left: Map & Flight Path */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6 h-full">
           <div className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden relative group">
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://images.unsplash.com/photo-1713952160156-bb59cac789a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyZSUyMGRyb25lJTIwc3ByYXlpbmclMjBmaWVsZCUyMGNyb3AlMjBoZWFsdGglMjBtYXB8ZW58MXx8fHwxNzcyMzU0MTU3fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Agriculture Map"
                  className="w-full h-full object-cover opacity-70"
                />
                 {/* Grid Overlay for precision agriculture */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
              </div>

              {/* Drone & Path */}
              <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-[#F5C244]/50 bg-[#F5C244]/10 rounded-lg flex items-center justify-center animate-pulse">
                <span className="text-[#F5C244] text-xs font-bold">正在作业区 A-3</span>
              </div>

              {/* Progress UI Overlay */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-neutral-900/90 backdrop-blur border border-neutral-700 p-4 rounded-xl flex items-center gap-8 shadow-2xl">
                 <div className="text-center">
                    <div className="text-xs text-neutral-400 mb-1">已作业面积</div>
                    <div className="text-xl font-bold text-white">145.2 <span className="text-xs font-normal text-neutral-500">亩</span></div>
                 </div>
                 <div className="w-px h-8 bg-neutral-700" />
                 <div className="text-center">
                    <div className="text-xs text-neutral-400 mb-1">剩余面积</div>
                    <div className="text-xl font-bold text-white">32.8 <span className="text-xs font-normal text-neutral-500">亩</span></div>
                 </div>
                 <div className="w-px h-8 bg-neutral-700" />
                 <div className="text-center">
                    <div className="text-xs text-neutral-400 mb-1">预计耗时</div>
                    <div className="text-xl font-bold text-[#F5C244]">18 <span className="text-xs font-normal text-neutral-500">min</span></div>
                 </div>
              </div>
           </div>
        </div>

        {/* Right: Controls & Stats */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6 h-full overflow-y-auto pr-2 custom-scrollbar">
           
           {/* Tank Status */}
           <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shrink-0">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Droplet className="w-5 h-5 text-[#F5C244]" /> 药箱状态
              </h3>
              <div className="flex items-center gap-6">
                 {/* Visual Tank Gauge */}
                 <div className="relative w-16 h-32 bg-neutral-800 rounded-lg overflow-hidden border border-neutral-700">
                    <div 
                      className="absolute bottom-0 left-0 right-0 bg-[#F5C244]/80 transition-all duration-1000"
                      style={{ height: `${tankLevel}%` }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                       <span className="font-bold text-white drop-shadow-md">{tankLevel}%</span>
                    </div>
                    {/* Tick marks */}
                    <div className="absolute right-0 top-0 bottom-0 w-2 flex flex-col justify-between py-2 pr-1">
                       {[100, 75, 50, 25, 0].map(t => (
                         <div key={t} className="h-px w-full bg-neutral-500/50" />
                       ))}
                    </div>
                 </div>

                 <div className="flex-1 space-y-4">
                    <div>
                       <div className="flex justify-between text-sm mb-1">
                          <span className="text-neutral-400">当前喷洒流速</span>
                          <span className="text-white font-mono">3.2 L/min</span>
                       </div>
                       <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-green-500 w-[60%] h-full rounded-full" />
                       </div>
                    </div>
                    <div>
                       <div className="flex justify-between text-sm mb-1">
                          <span className="text-neutral-400">预计剩余续航</span>
                          <span className="text-white font-mono">12 min</span>
                       </div>
                       <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-yellow-500 w-[30%] h-full rounded-full" />
                       </div>
                    </div>
                    <button className="w-full py-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded text-sm text-white transition-colors">
                       返航加药
                    </button>
                 </div>
              </div>
           </div>

           {/* Efficiency Chart */}
           <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 flex flex-col shrink-0">
              <h3 className="text-lg font-bold text-white mb-4 shrink-0">今日作业效率</h3>
              <div className="h-48 w-full mb-4 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={sprayData}>
                    <defs>
                      <linearGradient id="colorSpray" x1="0" y1="0" x2="0" y2="1">
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
                    <Area type="monotone" dataKey="amount" stroke="#F5C244" strokeWidth={2} fillOpacity={1} fill="url(#colorSpray)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="flex flex-col gap-3">
                 <h4 className="text-sm font-semibold text-white shrink-0">作业地块清单</h4>
                 <div className="space-y-2">
                    {['北区大豆田', '南区玉米地', '东坡果园', '西山茶园', '河畔稻田'].map((area, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-neutral-950/50 rounded-lg border border-neutral-800 shrink-0">
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-[#F5C244]/20 flex items-center justify-center text-[#F5C244] font-bold text-xs">
                               {i + 1}
                            </div>
                            <div>
                               <div className="text-sm text-neutral-200">{area}</div>
                               <div className="text-xs text-neutral-500">计划: 50亩</div>
                            </div>
                         </div>
                         <div className="text-right">
                            <div className={`text-xs font-bold ${i === 0 ? 'text-[#F5C244]' : 'text-neutral-500'}`}>
                               {i === 0 ? '进行中' : '等待中'}
                            </div>
                            <div className="text-xs text-neutral-600">{i === 0 ? '85%' : '0%'}</div>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}