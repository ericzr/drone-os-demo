import { 
  Battery, 
  MapPin, 
  MoreHorizontal, 
  Plane, 
  Search, 
  Settings2, 
  Signal, 
  Wifi,
  X,
  Plus,
  Check
} from "lucide-react";
import { useState } from "react";
import { clsx } from "clsx";

const initialFleetData = [
  { id: 'M300-001', model: 'DJI Matrice 300 RTK', status: 'active', battery: 82, location: '机库 A - 01', hours: 142.5 },
  { id: 'M30-002', model: 'DJI Matrice 30', status: 'maintenance', battery: 0, location: '维修中心', hours: 89.2 },
  { id: 'M3E-003', model: 'DJI Mavic 3E', status: 'idle', battery: 100, location: '机库 B - 05', hours: 24.1 },
  { id: 'M3T-004', model: 'DJI Mavic 3T', status: 'active', battery: 45, location: '林区巡检点', hours: 56.8 },
  { id: 'M300-005', model: 'DJI Matrice 300 RTK', status: 'idle', battery: 98, location: '机库 A - 02', hours: 210.3 },
  { id: 'M30-006', model: 'DJI Matrice 30', status: 'active', battery: 67, location: '光伏电站 C区', hours: 112.0 },
];

export default function Fleet() {
  const [fleetData, setFleetData] = useState(initialFleetData);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filter, setFilter] = useState('all');

  const handleAddDrone = (newDrone: any) => {
    setFleetData([...fleetData, { ...newDrone, status: 'idle', hours: 0, battery: 100 }]);
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">资产管理</h1>
          <p className="text-neutral-400">管理您的无人机机队、电池及挂载设备。</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-neutral-800 text-white rounded-lg border border-neutral-700 hover:bg-neutral-700 transition-colors text-sm font-medium">
            导出列表
          </button>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-[#F5C244] text-neutral-950 rounded-lg hover:bg-[#F5C244]/90 transition-colors shadow-lg shadow-[#F5C244]/20 text-sm font-bold flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> 添加设备
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 bg-neutral-900 p-4 rounded-xl border border-neutral-800">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input 
            type="text" 
            placeholder="搜索设备编号、型号..." 
            className="w-full bg-neutral-950 border border-neutral-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#F5C244]/50"
          />
        </div>
        <div className="flex gap-2">
          <select className="bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#F5C244]/50">
            <option value="all">所有状态</option>
            <option value="active">执行中</option>
            <option value="idle">待机</option>
            <option value="maintenance">维修中</option>
          </select>
          <select className="bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#F5C244]/50">
            <option value="all">所有机型</option>
            <option value="m300">Matrice 300</option>
            <option value="m30">Matrice 30</option>
            <option value="mavic3">Mavic 3</option>
          </select>
          <button className="p-2 bg-neutral-800 border border-neutral-700 rounded-lg hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors">
            <Settings2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Device Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {fleetData.map((drone) => (
          <DroneCard key={drone.id} drone={drone} />
        ))}
      </div>

      {/* Add Device Modal */}
      {isAddModalOpen && (
        <AddDeviceModal 
          onClose={() => setIsAddModalOpen(false)} 
          onAdd={handleAddDrone} 
        />
      )}
    </div>
  );
}

function DroneCard({ drone }: { drone: any }) {
  const statusColors = {
    active: 'bg-green-500/20 text-green-400 border-green-500/30',
    idle: 'bg-neutral-700/50 text-neutral-300 border-neutral-600',
    maintenance: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  };

  const statusLabels = {
    active: '执行中',
    idle: '待机',
    maintenance: '维修中',
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden hover:border-[#F5C244]/30 transition-colors group">
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div className={`px-2 py-1 rounded text-xs font-medium border ${statusColors[drone.status as keyof typeof statusColors]}`}>
            {statusLabels[drone.status as keyof typeof statusLabels]}
          </div>
          <button className="text-neutral-500 hover:text-white transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex items-center justify-center py-6 bg-neutral-950/50 rounded-lg mb-4 group-hover:bg-neutral-950 transition-colors">
          <Plane className="w-16 h-16 text-neutral-600 group-hover:text-[#F5C244] transition-colors" />
        </div>

        <h3 className="text-lg font-bold text-white mb-1">{drone.model}</h3>
        <p className="text-sm text-neutral-500 mb-4">ID: {drone.id}</p>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-400 flex items-center gap-2">
              <Battery className="w-4 h-4" /> 电量
            </span>
            <span className={clsx(
              "font-medium",
              drone.battery > 50 ? "text-green-400" : drone.battery > 20 ? "text-yellow-400" : "text-red-400"
            )}>{drone.battery}%</span>
          </div>
          <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className={clsx(
                "h-full rounded-full transition-all duration-500",
                drone.battery > 50 ? "bg-green-500" : drone.battery > 20 ? "bg-yellow-500" : "bg-red-500"
              )}
              style={{ width: `${drone.battery}%` }} 
            />
          </div>
          
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-800">
            <div className="text-xs">
              <span className="text-neutral-500 block mb-0.5">位置</span>
              <span className="text-neutral-300 truncate block" title={drone.location}>{drone.location}</span>
            </div>
            <div className="text-xs text-right">
               <span className="text-neutral-500 block mb-0.5">飞行时长</span>
               <span className="text-neutral-300">{drone.hours}h</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-neutral-950 px-5 py-3 border-t border-neutral-800 flex justify-between items-center">
        <div className="flex gap-2">
          <Signal className={clsx("w-4 h-4", drone.status === 'active' ? "text-green-500" : "text-neutral-600")} />
          <Wifi className={clsx("w-4 h-4", drone.status === 'active' ? "text-green-500" : "text-neutral-600")} />
        </div>
        <button className="text-xs font-medium text-[#F5C244] hover:text-[#ffdea0] transition-colors">
          查看详情
        </button>
      </div>
    </div>
  )
}

function AddDeviceModal({ onClose, onAdd }: { onClose: () => void, onAdd: (data: any) => void }) {
  const [formData, setFormData] = useState({
    model: 'DJI Matrice 300 RTK',
    id: '',
    location: '',
    sn: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-neutral-800 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">绑定新设备</h2>
          <button onClick={onClose} className="text-neutral-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto">
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-300">设备型号</label>
            <select 
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#F5C244]/50 appearance-none"
              value={formData.model}
              onChange={(e) => setFormData({...formData, model: e.target.value})}
            >
              <option>DJI Matrice 300 RTK</option>
              <option>DJI Matrice 30</option>
              <option>DJI Mavic 3 Enterprise</option>
              <option>DJI Mavic 3 Thermal</option>
              <option>Autel EVO II Pro</option>
              <option>XAG P100 Pro</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300">设备编号 (ID)</label>
              <input 
                type="text" 
                required
                placeholder="例如: M300-007"
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-[#F5C244]/50"
                value={formData.id}
                onChange={(e) => setFormData({...formData, id: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300">序列号 (SN)</label>
              <input 
                type="text" 
                placeholder="设备背部 SN 码"
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-[#F5C244]/50"
                value={formData.sn}
                onChange={(e) => setFormData({...formData, sn: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-300">存放位置</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
              <input 
                type="text" 
                required
                placeholder="例如: 机库 A - 03"
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-[#F5C244]/50"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
            </div>
          </div>

          <div className="bg-neutral-800/50 p-4 rounded-lg border border-neutral-800">
             <div className="flex items-start gap-3">
               <div className="w-5 h-5 rounded-full bg-[#F5C244]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-[#F5C244]" />
               </div>
               <div>
                  <h4 className="text-sm font-bold text-white">自动激活</h4>
                  <p className="text-xs text-neutral-400 mt-1">
                    绑定后，系统将自动尝试连接设备遥控器以同步实时状态。请确保设备已开机并处于联网状态。
                  </p>
               </div>
             </div>
          </div>
        </form>

        <div className="p-6 border-t border-neutral-800 flex justify-end gap-3 bg-neutral-900 rounded-b-2xl">
          <button 
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg border border-neutral-700 text-neutral-300 font-medium hover:bg-neutral-800 transition-colors"
          >
            取消
          </button>
          <button 
            onClick={handleSubmit}
            className="px-5 py-2.5 rounded-lg bg-[#F5C244] text-neutral-950 font-bold hover:bg-[#F5C244]/90 transition-colors shadow-lg shadow-[#F5C244]/20"
          >
            确认绑定
          </button>
        </div>
      </div>
    </div>
  )
}
