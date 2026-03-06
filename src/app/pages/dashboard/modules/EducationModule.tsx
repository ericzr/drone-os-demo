import { 
  Award, 
  BookOpen, 
  Calendar, 
  CheckCircle, 
  ChevronRight, 
  Clock, 
  Flag, 
  Gamepad2, 
  LayoutGrid, 
  Play, 
  Rocket, 
  Search, 
  Settings, 
  Trophy, 
  UserPlus, 
  Users
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const scoreData = [
  { name: 'Team A', score: 850 },
  { name: 'Team B', score: 920 },
  { name: 'Team C', score: 780 },
  { name: 'Team D', score: 650 },
  { name: 'Team E', score: 890 },
];

export default function EducationModule() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('competition');

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
            <span className="text-[#F5C244] text-sm font-medium">青少年教育</span>
          </div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Rocket className="w-6 h-6 text-[#F5C244]" /> 无人机科教与赛事管理
          </h1>
        </div>
        <div className="flex gap-3">
          <button 
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'competition' ? 'bg-[#F5C244] text-neutral-950 shadow-lg shadow-yellow-900/20' : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
            }`}
            onClick={() => setActiveTab('competition')}
          >
            赛事控制台
          </button>
          <button 
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'training' ? 'bg-[#F5C244] text-neutral-950 shadow-lg shadow-yellow-900/20' : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
            }`}
            onClick={() => setActiveTab('training')}
          >
            教学管理
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
        
        {/* Left: Interactive Field / Classroom */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6 h-full">
           <div className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden relative group">
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://images.unsplash.com/photo-1640759123342-06286f42dd05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcm9uZSUyMHJhY2UlMjBjb21wZXRpdGlvbiUyMHNjb3JpbmclMjBzdHVkZW50cyUyMGZpZWxkfGVufDF8fHx8MTc3MjM1NDE2M3ww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Drone Race Field"
                  className="w-full h-full object-cover opacity-60"
                />
                 {/* Virtual Gate Overlay */}
                 <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-48 h-32 border-4 border-[#F5C244] rounded-lg flex items-center justify-center animate-pulse shadow-[0_0_30px_rgba(245,194,68,0.5)]">
                    <span className="text-[#F5C244] font-bold bg-black/50 px-2 rounded">GATE 01</span>
                 </div>
                 <div className="absolute top-1/3 right-1/4 transform -translate-x-1/2 -translate-y-1/2 w-48 h-32 border-4 border-neutral-400 rounded-lg flex items-center justify-center opacity-80">
                    <span className="text-neutral-400 font-bold bg-black/50 px-2 rounded">GATE 02</span>
                 </div>
                 
                 {/* Live Status Overlay */}
                 <div className="absolute top-4 left-4 flex gap-4">
                    <div className="bg-neutral-900/90 backdrop-blur border border-neutral-700 px-4 py-2 rounded-xl text-white">
                       <div className="text-xs text-neutral-400 mb-1">Current Racer</div>
                       <div className="font-bold text-lg flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Team B - 02
                       </div>
                    </div>
                    <div className="bg-neutral-900/90 backdrop-blur border border-neutral-700 px-4 py-2 rounded-xl text-white">
                       <div className="text-xs text-neutral-400 mb-1">Lap Time</div>
                       <div className="font-mono font-bold text-lg text-[#F5C244]">00:45.32</div>
                    </div>
                 </div>
              </div>
              
              {/* Referee Controls */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
                 <button className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-full font-bold shadow-lg shadow-green-900/20 transform hover:scale-105 transition-all">
                    START
                 </button>
                 <button className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-full font-bold shadow-lg shadow-red-900/20 transform hover:scale-105 transition-all">
                    STOP
                 </button>
                 <button className="px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-full font-bold border border-neutral-700 shadow-lg transform hover:scale-105 transition-all">
                    RESET
                 </button>
              </div>
           </div>
        </div>

        {/* Right: Leaderboard & Students */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6 h-full min-h-0">
           
           {/* Leaderboard */}
           <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shrink-0">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[#F5C244]" /> 实时排行榜
              </h3>
              <div className="h-40 w-full mb-4">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={scoreData} layout="vertical">
                       <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                       <XAxis type="number" hide />
                       <YAxis dataKey="name" type="category" width={60} stroke="#94a3b8" tick={{fontSize: 10}} />
                       <Tooltip 
                         cursor={{fill: '#1e293b'}}
                         contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                       />
                       <Bar dataKey="score" fill="#F5C244" radius={[0, 4, 4, 0]} barSize={15} />
                    </BarChart>
                 </ResponsiveContainer>
              </div>
              
              <div className="space-y-2">
                 {[1, 2, 3].map((rank) => (
                   <div key={rank} className={`flex items-center justify-between p-3 rounded-lg border ${
                     rank === 1 ? 'bg-[#F5C244]/10 border-[#F5C244]/30' : 
                     rank === 2 ? 'bg-neutral-800 border-neutral-700' : 
                     'bg-neutral-900 border-neutral-800'
                   }`}>
                      <div className="flex items-center gap-3">
                         <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                           rank === 1 ? 'bg-[#F5C244] text-neutral-950' : 
                           rank === 2 ? 'bg-neutral-400 text-neutral-950' : 
                           'bg-neutral-700 text-white'
                         }`}>
                           {rank}
                         </div>
                         <div className="text-sm text-neutral-200 font-medium">
                           {rank === 1 ? 'Team B (飞跃队)' : rank === 2 ? 'Team E (雄鹰队)' : 'Team A (探索者)'}
                         </div>
                      </div>
                      <div className="text-sm font-bold text-white">
                         {rank === 1 ? '920' : rank === 2 ? '890' : '850'} pts
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* Student Management / Roster */}
           <div className="bg-neutral-900 border border-neutral-800 rounded-xl flex-1 flex flex-col min-h-0">
              <div className="p-4 border-b border-neutral-800 flex justify-between items-center shrink-0">
                 <h3 className="font-bold text-white flex items-center gap-2">
                   <Users className="w-4 h-4 text-[#F5C244]" /> 选手列表
                 </h3>
                 <button className="text-xs bg-neutral-800 hover:bg-neutral-700 text-neutral-300 px-2 py-1 rounded border border-neutral-700 transition-colors">
                    管理
                 </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                 <div className="grid grid-cols-2 gap-3">
                    <StudentCard name="张明" status="ready" drone="Mavic 3" />
                    <StudentCard name="李华" status="flying" drone="FPV Racer" />
                    <StudentCard name="王强" status="standby" drone="Mini 2" />
                    <StudentCard name="赵雪" status="repair" drone="FPV Racer" />
                    <StudentCard name="刘洋" status="ready" drone="Mavic 3" />
                    <StudentCard name="陈晨" status="ready" drone="Mavic 3" />
                 </div>
              </div>
           </div>
           
           {/* Course Progress */}
           <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 shrink-0">
              <div className="flex justify-between items-center mb-2">
                 <h3 className="text-sm font-bold text-white">今日课程进度</h3>
                 <span className="text-xs text-neutral-400">无人机组装实训</span>
              </div>
              <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                 <div className="bg-gradient-to-r from-[#F5C244] to-yellow-600 w-[65%] h-full rounded-full" />
              </div>
              <div className="flex justify-between mt-1 text-xs text-neutral-500">
                 <span>已完成: 65%</span>
                 <span>剩余: 35 min</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function StudentCard({ name, status, drone }: any) {
  const statusColors = {
    ready: 'bg-green-500',
    flying: 'bg-[#F5C244] animate-pulse',
    standby: 'bg-neutral-500',
    repair: 'bg-red-500',
  };

  return (
    <div className="bg-neutral-950/50 p-3 rounded-lg border border-neutral-800 flex flex-col gap-2">
       <div className="flex justify-between items-start">
          <span className="font-medium text-neutral-200 text-sm">{name}</span>
          <div className={`w-2 h-2 rounded-full ${statusColors[status as keyof typeof statusColors]}`} />
       </div>
       <div className="text-xs text-neutral-500 flex items-center gap-1">
          <Gamepad2 className="w-3 h-3" /> {drone}
       </div>
    </div>
  )
}