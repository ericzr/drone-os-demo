import { 
  ArrowLeft,
  ArrowRight, 
  Battery, 
  Calendar, 
  Check, 
  ChevronRight, 
  Clock, 
  Grid, 
  Map as MapIcon, 
  Search, 
  User, 
  Leaf, 
  Target, 
  Zap, 
  Box, 
  Activity, 
  Shield, 
  Rocket, 
  Plane,
  AlertTriangle,
  FileText,
  BadgeCheck,
  Send
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useSearchParams } from "react-router";

// Mock Data for Mission List
const missions = [
  { id: 1, type: '巡检', name: '林草高风险区例行巡检', status: '进行中', location: '西山林场 B 区', operator: '张伟', drone: 'M300-001', time: '2026-03-01 10:00' },
  { id: 2, type: '测绘', name: '新建光伏电站地形勘测', status: '待执行', location: '高新区三期', operator: '李明', drone: 'M3E-003', time: '2026-03-01 14:00' },
  { id: 3, type: '安防', name: '马拉松赛事现场监控', status: '已完成', location: '市中心体育馆', operator: '王强', drone: 'M300-005', time: '2026-02-28 08:00' },
  { id: 4, type: '植保', name: '春耕农田喷洒作业', status: '异常中止', location: '红星农场', operator: '赵雷', drone: 'T40-002', time: '2026-02-27 09:30' },
  { id: 5, type: '巡检', name: '输电线路精细化巡检', status: '待执行', location: '220KV 变电站', operator: '未分配', drone: 'M300-005', time: '2026-03-02 10:00' },
];

// Main Component
export default function Missions() {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'list' | 'create'>('list');

  useEffect(() => {
    if (searchParams.get('action') === 'create') {
      setViewMode('create');
    }
  }, [searchParams]);

  return (
    <div className="h-full">
      {viewMode === 'list' ? (
        <MissionList onViewCreate={() => setViewMode('create')} />
      ) : (
        <CreateMissionWizard onCancel={() => setViewMode('list')} />
      )}
    </div>
  );
}

// ------------------------------------------------------------------
// Sub-components
// ------------------------------------------------------------------

function MissionList({ onViewCreate }: { onViewCreate: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">任务中心</h1>
          <p className="text-neutral-400">创建、指派并监控您的飞行任务。</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-neutral-800 text-white rounded-lg border border-neutral-700 hover:bg-neutral-700 transition-colors text-sm font-medium flex items-center gap-2">
            <Calendar className="w-4 h-4" /> 任务日历
          </button>
          <button 
            onClick={onViewCreate}
            className="px-4 py-2 bg-[#F5C244] text-neutral-950 rounded-lg hover:bg-[#F5C244]/90 transition-colors shadow-lg shadow-[#F5C244]/20 text-sm font-bold flex items-center gap-2"
          >
            <PlusIcon /> 新建任务
          </button>
        </div>
      </div>

      {/* Tabs / Filters */}
      <div className="flex border-b border-neutral-800 space-x-6 overflow-x-auto">
        <button className="pb-3 border-b-2 border-[#F5C244] text-[#F5C244] font-medium whitespace-nowrap">全部任务 (12)</button>
        <button className="pb-3 border-b-2 border-transparent text-neutral-400 hover:text-white font-medium whitespace-nowrap transition-colors">进行中 (3)</button>
        <button className="pb-3 border-b-2 border-transparent text-neutral-400 hover:text-white font-medium whitespace-nowrap transition-colors">待执行 (5)</button>
        <button className="pb-3 border-b-2 border-transparent text-neutral-400 hover:text-white font-medium whitespace-nowrap transition-colors">已完成 (4)</button>
        <button className="pb-3 border-b-2 border-transparent text-neutral-400 hover:text-white font-medium whitespace-nowrap transition-colors">异常 (0)</button>
      </div>

      {/* Mission List Table */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-800">
            <thead className="bg-neutral-950">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">任务名称</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">类型</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">状态</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">执行人</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">计划时间</th>
                <th scope="col" className="relative px-6 py-3"><span className="sr-only">操作</span></th>
              </tr>
            </thead>
            <tbody className="bg-neutral-900 divide-y divide-neutral-800">
              {missions.map((mission) => (
                <tr key={mission.id} className="hover:bg-neutral-800/50 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-neutral-800 rounded-lg flex items-center justify-center group-hover:bg-[#F5C244]/10 group-hover:text-[#F5C244] transition-colors">
                        <MapIcon className="h-5 w-5 text-neutral-400 group-hover:text-[#F5C244]" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">{mission.name}</div>
                        <div className="text-sm text-neutral-500">{mission.location}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700">
                      {mission.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={mission.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-neutral-500" />
                      {mission.operator}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-400">
                    <div className="flex items-center gap-2">
                       <Clock className="w-4 h-4 text-neutral-500" />
                       {mission.time}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-neutral-400 hover:text-[#F5C244] flex items-center gap-1 ml-auto transition-colors">
                      详情 <ChevronRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function CreateMissionWizard({ onCancel }: { onCancel: () => void }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: '',
    droneId: '',
    pilotId: '',
    routeApplied: false,
    missionName: ''
  });

  const steps = [
    { id: 1, title: '选择任务类型' },
    { id: 2, title: '设备/人员' },
    { id: 3, title: '航线申请与规划' },
    { id: 4, title: '任务部署' },
  ];

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 4));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Header with Steps */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={onCancel}
            className="p-2 hover:bg-neutral-800 rounded-lg text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-white">创建新任务</h1>
            <p className="text-xs text-neutral-400">请按照流程填写任务信息</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
           {steps.map((s, idx) => (
             <div key={s.id} className="flex items-center">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
                  step === s.id ? 'bg-[#F5C244] text-neutral-950' : 
                  step > s.id ? 'bg-neutral-800 text-[#F5C244]' : 'text-neutral-600'
                }`}>
                   <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                      step === s.id ? 'bg-white text-[#F5C244]' : 
                      step > s.id ? 'bg-[#F5C244]/20 text-[#F5C244]' : 'bg-neutral-800 text-neutral-500'
                   }`}>
                      {step > s.id ? <Check className="w-3 h-3" /> : s.id}
                   </span>
                   {s.title}
                </div>
                {idx < steps.length - 1 && <div className="w-8 h-px bg-neutral-800 mx-2" />}
             </div>
           ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="h-full"
        >
          {step === 1 && <StepTypeSelection selected={formData.type} onSelect={(val) => setFormData({...formData, type: val})} />}
          {step === 2 && <StepResourceMatching 
              selectedDrone={formData.droneId} 
              onSelectDrone={(id) => setFormData({...formData, droneId: id})}
              selectedPilot={formData.pilotId}
              onSelectPilot={(id) => setFormData({...formData, pilotId: id})}
          />}
          {step === 3 && <StepRoutePlanning isApplied={formData.routeApplied} onApply={() => setFormData({...formData, routeApplied: true})} />}
          {step === 4 && <StepConfirmation data={formData} />}
        </motion.div>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800">
        <button 
          onClick={step === 1 ? onCancel : handleBack}
          className="px-6 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg border border-neutral-700 font-medium transition-colors"
        >
          {step === 1 ? '取消' : '上一步'}
        </button>
        <button 
          onClick={step === 4 ? onCancel : handleNext}
          disabled={step === 1 && !formData.type}
          className="px-6 py-2 bg-[#F5C244] hover:bg-[#F5C244]/90 text-neutral-950 rounded-lg font-bold shadow-lg shadow-[#F5C244]/20 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {step === 4 ? (
             <>
               <Send className="w-4 h-4" /> 任务创建
             </>
          ) : (
             <>
               下一步 <ArrowRight className="w-4 h-4" />
             </>
          )}
        </button>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// Wizard Steps
// ------------------------------------------------------------------

function StepTypeSelection({ selected, onSelect }: { selected: string, onSelect: (v: string) => void }) {
  const types = [
    { id: 'forestry', name: '林草巡检', icon: <Leaf className="w-8 h-8 text-green-400" />, desc: '火情识别、病虫害监测' },
    { id: 'herding', name: 'AI 智能放牧', icon: <Target className="w-8 h-8 text-indigo-400" />, desc: '牲畜计数、电子围栏' },
    { id: 'solar', name: '光伏巡检', icon: <Zap className="w-8 h-8 text-yellow-400" />, desc: '热斑识别、故障定位' },
    { id: 'mining', name: '露天矿巡检', icon: <Box className="w-8 h-8 text-orange-400" />, desc: '三维建模、边坡监测' },
    { id: 'pipeline', name: '管道巡线', icon: <Activity className="w-8 h-8 text-blue-400" />, desc: 'GIS轨迹匹配、异常点标记' },
    { id: 'security', name: '安防/赛事', icon: <Shield className="w-8 h-8 text-red-400" />, desc: '人流监控、应急指挥' },
    { id: 'education', name: '青少年教育', icon: <Rocket className="w-8 h-8 text-pink-400" />, desc: '赛事管理、教学实训' },
    { id: 'agriculture', name: '农林植保', icon: <Leaf className="w-8 h-8 text-lime-400" />, desc: '精准喷洒、农情监测' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-1">
      {types.map((t) => (
        <div 
          key={t.id}
          onClick={() => onSelect(t.id)}
          className={`cursor-pointer border rounded-xl p-6 transition-all duration-200 hover:scale-[1.02] ${
            selected === t.id 
              ? 'bg-[#F5C244]/10 border-[#F5C244] shadow-[0_0_20px_rgba(245,194,68,0.15)]' 
              : 'bg-neutral-900 border-neutral-800 hover:border-neutral-600 hover:bg-neutral-800/50'
          }`}
        >
          <div className="mb-4 bg-neutral-950 w-16 h-16 rounded-xl flex items-center justify-center border border-neutral-800">
            {t.icon}
          </div>
          <h3 className={`text-lg font-bold mb-2 ${selected === t.id ? 'text-[#F5C244]' : 'text-white'}`}>{t.name}</h3>
          <p className="text-sm text-neutral-400">{t.desc}</p>
          
          <div className="mt-4 flex justify-end">
             <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                selected === t.id ? 'bg-[#F5C244] border-[#F5C244]' : 'border-neutral-600'
             }`}>
                {selected === t.id && <Check className="w-3 h-3 text-neutral-950" />}
             </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function StepResourceMatching({ selectedDrone, onSelectDrone, selectedPilot, onSelectPilot }: any) {
  const drones = [
    { id: 'd1', name: 'DJI Matrice 300 RTK', type: '多旋翼', battery: 98, status: 'ready' },
    { id: 'd2', name: 'DJI Mavic 3 Enterprise', type: '便携式', battery: 100, status: 'ready' },
    { id: 'd3', name: 'DJI Agras T40', type: '植保机', battery: 45, status: 'charging' },
    { id: 'd4', name: 'Autel Dragonfish', type: '垂起固定翼', battery: 88, status: 'maintenance' },
  ];

  const pilots = [
    { id: 'p1', name: '张伟', license: 'CAAC-UAV-2023001', hours: 1240, status: 'available' },
    { id: 'p2', name: '李明', license: 'CAAC-UAV-2023045', hours: 850, status: 'available' },
    { id: 'p3', name: '王强', license: 'CAAC-UAV-2022112', hours: 2100, status: 'busy' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      {/* Left: Drones */}
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Plane className="w-5 h-5 text-[#F5C244]" /> 选择作业设备
        </h3>
        <div className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl overflow-y-auto p-4 space-y-3">
           {drones.map((d) => (
             <div 
               key={d.id}
               onClick={() => d.status === 'ready' && onSelectDrone(d.id)}
               className={`p-4 rounded-lg border flex items-center justify-between transition-colors ${
                 d.status !== 'ready' ? 'opacity-50 cursor-not-allowed bg-neutral-950 border-neutral-800' : 
                 selectedDrone === d.id ? 'bg-[#F5C244]/10 border-[#F5C244] cursor-pointer' : 'bg-neutral-950 border-neutral-800 hover:border-neutral-600 cursor-pointer'
               }`}
             >
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-neutral-800 rounded-lg flex items-center justify-center">
                      <Plane className="w-6 h-6 text-neutral-400" />
                   </div>
                   <div>
                      <div className="text-white font-medium">{d.name}</div>
                      <div className="text-xs text-neutral-500">{d.type}</div>
                   </div>
                </div>
                <div className="text-right">
                   <div className={`text-xs font-bold mb-1 ${
                     d.status === 'ready' ? 'text-green-400' : d.status === 'charging' ? 'text-yellow-400' : 'text-red-400'
                   }`}>
                      {d.status === 'ready' ? '就绪' : d.status === 'charging' ? '充电中' : '维护中'}
                   </div>
                   <div className="flex items-center gap-1 text-xs text-neutral-400">
                      <Battery className="w-3 h-3" /> {d.battery}%
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>

      {/* Right: Pilots */}
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <BadgeCheck className="w-5 h-5 text-purple-400" /> 选择持证飞手 (CAAC)
        </h3>
        <div className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl overflow-y-auto p-4 space-y-3">
           {pilots.map((p) => (
             <div 
               key={p.id}
               onClick={() => p.status === 'available' && onSelectPilot(p.id)}
               className={`p-4 rounded-lg border flex items-center justify-between transition-colors ${
                 p.status !== 'available' ? 'opacity-50 cursor-not-allowed bg-neutral-950 border-neutral-800' : 
                 selectedPilot === p.id ? 'bg-purple-900/20 border-purple-500 cursor-pointer' : 'bg-neutral-950 border-neutral-800 hover:border-neutral-600 cursor-pointer'
               }`}
             >
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center border border-neutral-700">
                      <User className="w-6 h-6 text-neutral-400" />
                   </div>
                   <div>
                      <div className="text-white font-medium flex items-center gap-2">
                        {p.name}
                        <span className="bg-purple-500/20 text-purple-400 text-[10px] px-1.5 py-0.5 rounded border border-purple-500/30">CAAC</span>
                      </div>
                      <div className="text-xs text-neutral-500 font-mono mt-0.5">{p.license}</div>
                   </div>
                </div>
                <div className="text-right">
                   <div className={`text-xs font-bold mb-1 ${
                     p.status === 'available' ? 'text-green-400' : 'text-orange-400'
                   }`}>
                      {p.status === 'available' ? '空闲' : '任务中'}
                   </div>
                   <div className="text-xs text-neutral-400">
                      飞行时长: {p.hours}h
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}

function StepRoutePlanning({ isApplied, onApply }: { isApplied: boolean, onApply: () => void }) {
  const [loading, setLoading] = useState(false);

  const handleApply = () => {
    setLoading(true);
    setTimeout(() => {
       setLoading(false);
       onApply();
    }, 1500);
  };

  return (
    <div className="h-full grid grid-cols-12 gap-6">
       {/* Map View */}
       <div className="col-span-8 bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden relative group">
          <img 
             src="https://images.unsplash.com/photo-1642833714391-cf9a0732321d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcm9uZSUyMGZsaWdodCUyMHBhdGglMjBwbGFubmluZyUyMG1hcCUyMHNvZnR3YXJlJTIwaW50ZXJmYWNlfGVufDF8fHx8MTc3MjM1NDQ4NXww&ixlib=rb-4.1.0&q=80&w=1080" 
             className="w-full h-full object-cover opacity-60 group-hover:opacity-70 transition-opacity"
             alt="Flight Planning Map"
          />
          <div className="absolute inset-0 bg-neutral-900/10 pointer-events-none" />
          
          <div className="absolute top-4 left-4 flex flex-col gap-2">
             <button className="bg-neutral-900/90 text-white p-2 rounded-lg border border-neutral-700 hover:bg-neutral-800">
                <MapIcon className="w-5 h-5" />
             </button>
          </div>
          
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-neutral-900/90 backdrop-blur border border-neutral-700 px-6 py-3 rounded-xl shadow-xl flex items-center gap-4">
             <div className="text-center">
                <div className="text-xs text-neutral-400">航程</div>
                <div className="font-bold text-white">4.2 km</div>
             </div>
             <div className="w-px h-8 bg-neutral-700" />
             <div className="text-center">
                <div className="text-xs text-neutral-400">预计耗时</div>
                <div className="font-bold text-white">18 min</div>
             </div>
             <div className="w-px h-8 bg-neutral-700" />
             <div className="text-center">
                <div className="text-xs text-neutral-400">航点数</div>
                <div className="font-bold text-white">24</div>
             </div>
          </div>
       </div>

       {/* Controls */}
       <div className="col-span-4 flex flex-col gap-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-4">
             <h3 className="font-bold text-white">航线参数设置</h3>
             
             <div className="space-y-3">
                <div>
                   <label className="text-xs text-neutral-400 block mb-1">飞行高度 (m)</label>
                   <input type="range" min="30" max="500" defaultValue="120" className="w-full accent-[#F5C244] h-1 bg-neutral-700 rounded-lg appearance-none cursor-pointer" />
                   <div className="flex justify-between text-xs text-neutral-500 mt-1">
                      <span>30m</span>
                      <span className="text-white">120m</span>
                      <span>500m</span>
                   </div>
                </div>
                <div>
                   <label className="text-xs text-neutral-400 block mb-1">飞行速度 (m/s)</label>
                   <input type="range" min="1" max="15" defaultValue="8" className="w-full accent-[#F5C244] h-1 bg-neutral-700 rounded-lg appearance-none cursor-pointer" />
                   <div className="flex justify-between text-xs text-neutral-500 mt-1">
                      <span>1m/s</span>
                      <span className="text-white">8m/s</span>
                      <span>15m/s</span>
                   </div>
                </div>
             </div>

             <div className="pt-4 border-t border-neutral-800">
                <h3 className="font-bold text-white mb-2">空域申请状态</h3>
                {isApplied ? (
                  <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg flex items-center gap-3">
                     <div className="bg-green-500 rounded-full p-1">
                        <Check className="w-4 h-4 text-black" />
                     </div>
                     <div>
                        <div className="text-sm font-bold text-green-400">已获批 (U-00239)</div>
                        <div className="text-xs text-neutral-400">有效期: 今日 10:00 - 14:00</div>
                     </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                     <div className="bg-yellow-500/10 border border-yellow-500/30 p-3 rounded-lg flex items-center gap-2 text-yellow-400 text-sm">
                        <AlertTriangle className="w-4 h-4" /> 尚未申请当前区域空域
                     </div>
                     <button 
                       onClick={handleApply}
                       disabled={loading}
                       className="w-full py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded border border-neutral-700 transition-colors flex items-center justify-center gap-2"
                     >
                        {loading ? '申请提交中...' : '提交空域申请'}
                     </button>
                  </div>
                )}
             </div>
          </div>
       </div>
    </div>
  );
}

function StepConfirmation({ data }: any) {
  return (
    <div className="max-w-3xl mx-auto py-8">
       <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
          <div className="bg-neutral-950 p-6 border-b border-neutral-800 flex justify-between items-center">
             <h2 className="text-xl font-bold text-white">任务创建</h2>
             <span className="bg-[#F5C244]/20 text-[#F5C244] px-3 py-1 rounded-full text-sm font-medium border border-[#F5C244]/30">
                待部署
             </span>
          </div>
          
          <div className="p-6 space-y-6">
             <div className="grid grid-cols-2 gap-6">
                <div>
                   <label className="text-xs text-neutral-500 uppercase tracking-wider font-bold block mb-1">任务类型</label>
                   <div className="text-white text-lg font-medium capitalize">{data.type || '未选择'}</div>
                </div>
                <div>
                   <label className="text-xs text-neutral-500 uppercase tracking-wider font-bold block mb-1">作业区域</label>
                   <div className="text-white text-lg font-medium">西山林场 B 区 (自动定位)</div>
                </div>
                <div>
                   <label className="text-xs text-neutral-500 uppercase tracking-wider font-bold block mb-1">执行设备</label>
                   <div className="text-white font-medium flex items-center gap-2">
                      <Plane className="w-4 h-4 text-neutral-400" /> 
                      {data.droneId ? (data.droneId === 'd1' ? 'M300 RTK' : data.droneId === 'd2' ? 'Mavic 3E' : data.droneId) : '未选择'}
                   </div>
                </div>
                <div>
                   <label className="text-xs text-neutral-500 uppercase tracking-wider font-bold block mb-1">责任飞手</label>
                   <div className="text-white font-medium flex items-center gap-2">
                      <User className="w-4 h-4 text-neutral-400" />
                      {data.pilotId ? (data.pilotId === 'p1' ? '张伟' : data.pilotId === 'p2' ? '李明' : '王强') : '未选择'}
                   </div>
                </div>
             </div>

             <div className="bg-neutral-950 p-4 rounded-lg border border-neutral-800">
                <h3 className="text-sm font-bold text-neutral-300 mb-3 flex items-center gap-2">
                   <FileText className="w-4 h-4" /> 任务摘要
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                   本次任务将执行 <span className="text-white">自动航线飞行</span>，预计耗时 <span className="text-white">18分钟</span>。
                   空域申请 <span className="text-green-400">已获批</span>。
                   请确保设备电量充足，并在任务开始前进行最后的起飞前检查。
                </p>
             </div>
             
             <div className="flex items-start gap-3 p-3 bg-yellow-900/10 border border-yellow-900/30 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-yellow-200/80">
                   注意：当前区域风速较大 (3级)，建议开启避障雷达并保持视距内监视。
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles = {
    '进行中': 'bg-[#F5C244]/20 text-[#F5C244] border-[#F5C244]/30',
    '待执行': 'bg-neutral-700/50 text-neutral-300 border-neutral-600',
    '已完成': 'bg-green-500/20 text-green-400 border-green-500/30',
    '异常中止': 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  return (
    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${
      styles[status as keyof typeof styles] || 'bg-neutral-700 text-neutral-400'
    }`}>
      {status}
    </span>
  );
}

function PlusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
