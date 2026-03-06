import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { 
  ChevronLeft, 
  Settings, 
  Map as MapIcon, 
  Navigation, 
  Radio, 
  ShieldAlert, 
  Camera, 
  Cpu, 
  Gamepad2, 
  Waypoints, 
  Save, 
  RotateCcw 
} from "lucide-react";

export default function GroundStationParameters() {
  const navigate = useNavigate();
  const { moduleId } = useParams();
  const [activeTab, setActiveTab] = useState('flight');

  const categories = [
    { id: 'flight', label: '飞行控制', icon: <Navigation className="w-4 h-4" /> },
    { id: 'map', label: '地图视觉', icon: <MapIcon className="w-4 h-4" /> },
    { id: 'mission', label: '航线任务', icon: <Waypoints className="w-4 h-4" /> },
    { id: 'remote', label: '遥控设备', icon: <Gamepad2 className="w-4 h-4" /> },
    { id: 'safety', label: '安全保护', icon: <ShieldAlert className="w-4 h-4" /> },
    { id: 'payload', label: '载荷设置', icon: <Camera className="w-4 h-4" /> },
    { id: 'system', label: '系统校准', icon: <Cpu className="w-4 h-4" /> },
  ];

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-neutral-800 rounded-lg text-neutral-400 hover:text-white transition-colors border border-transparent hover:border-neutral-700"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <Settings className="w-6 h-6 text-[#F5C244]" />
              无人机超视距地面站参数系统
            </h1>
            <p className="text-sm text-neutral-400 mt-1 font-mono">
              SYSTEM_ID: {moduleId?.toUpperCase() || 'GENERAL'} // FW_VER: 4.2.1-STABLE
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg text-sm font-medium transition-colors border border-neutral-700 flex items-center gap-2">
            <RotateCcw className="w-4 h-4" /> 重置默认
          </button>
          <button className="px-4 py-2 bg-[#F5C244] hover:bg-[#F5C244]/90 text-neutral-950 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-yellow-900/20 flex items-center gap-2">
            <Save className="w-4 h-4" /> 保存参数
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden flex min-h-0">
        
        {/* Sidebar */}
        <div className="w-64 border-r border-neutral-800 flex flex-col bg-neutral-900/50">
          <div className="p-4">
            <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">参数分类</h3>
            <div className="space-y-1">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activeTab === cat.id 
                      ? 'bg-[#F5C244]/10 text-[#F5C244] border border-[#F5C244]/20' 
                      : 'text-neutral-400 hover:bg-neutral-800 hover:text-white border border-transparent'
                  }`}
                >
                  {cat.icon}
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mt-auto p-4 border-t border-neutral-800">
            <div className="bg-neutral-950 rounded-lg p-3 border border-neutral-800">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-neutral-400">连接状态</span>
                <span className="text-xs font-bold text-green-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> 在线
                </span>
              </div>
              <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-green-500 h-full w-[92%]" />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-[10px] text-neutral-500">Ping: 24ms</span>
                <span className="text-[10px] text-neutral-500">Link: 92%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-neutral-950/30">
          <div className="p-8 max-w-4xl mx-auto">
            
            {activeTab === 'flight' && (
              <div className="space-y-8">
                <SectionHeader title="工业级飞行控制算法配置" description="调整姿态PID增益、角速度限制及飞行包络线参数。" />
                
                <div className="grid grid-cols-2 gap-6">
                  <Card title="基础感度 (Basic Gain)">
                    <SliderControl label="俯仰/翻滚 (Pitch/Roll)" value={120} min={80} max={200} unit="%" />
                    <SliderControl label="偏航 (Yaw)" value={100} min={80} max={150} unit="%" />
                    <SliderControl label="垂直 (Vertical)" value={110} min={80} max={150} unit="%" />
                  </Card>
                  
                  <Card title="动力响应 (Attitude)">
                    <SliderControl label="姿态平滑度" value={40} min={0} max={100} />
                    <SliderControl label="刹车灵敏度" value={65} min={0} max={100} />
                    <ToggleControl label="运动模式增强" checked={true} />
                  </Card>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <Card title="超视距全自动飞行控制">
                    <div className="grid grid-cols-3 gap-4">
                      <SelectControl label="导航模式" value="RTK-Fixed" options={['GPS', 'RTK-Float', 'RTK-Fixed', 'Optical Flow']} />
                      <SelectControl label="失控行为" value="Return To Home" options={['Hover', 'Landing', 'Return To Home', 'Continue']} />
                      <InputControl label="返航高度 (m)" value="120" />
                    </div>
                    <div className="mt-4 pt-4 border-t border-neutral-800">
                      <ToggleControl label="启用高精度地形跟随 (Terrain Follow)" checked={true} description="使用雷达数据保持相对地面高度" />
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === 'map' && (
              <div className="space-y-8">
                <SectionHeader title="地图视觉系统" description="配置地图源、3D视图及图传参数。" />
                <div className="grid grid-cols-2 gap-6">
                  <Card title="地图源设置">
                    <SelectControl label="底图提供商" value="Google Hybrid" options={['Google Hybrid', 'Mapbox Satellite', 'OpenStreetMap', 'Custom WTMS']} />
                    <ToggleControl label="启用谷歌3D地图视角" checked={true} />
                    <ToggleControl label="离线地图缓存" checked={false} />
                  </Card>
                  <Card title="图传设置">
                     <SelectControl label="传输清晰度" value="1080p 60fps" options={['720p 30fps', '1080p 30fps', '1080p 60fps', '4K 30fps']} />
                     <SelectControl label="编码格式" value="H.265" options={['H.264', 'H.265']} />
                     <ToggleControl label="自适应码率" checked={true} />
                  </Card>
                </div>
              </div>
            )}

            {activeTab === 'mission' && (
              <div className="space-y-8">
                <SectionHeader title="航线任务配置" description="预设航线模板及动作参数。" />
                <div className="grid grid-cols-2 gap-6">
                  <Card title="航点与转弯">
                    <SelectControl label="转弯模式" value="Adaptive Bank" options={['Stop & Turn', 'Bank Turn', 'Adaptive Bank']} />
                    <InputControl label="默认航点停留时间 (s)" value="5" />
                    <InputControl label="最大航点速度 (m/s)" value="15" />
                  </Card>
                  <Card title="特殊功能">
                    <ToggleControl label="随点随行功能" checked={true} description="点击地图任意位置飞机即刻飞往该点" />
                    <ToggleControl label="断点续飞" checked={true} />
                  </Card>
                </div>
                <Card title="预设航线模板">
                   <div className="grid grid-cols-3 gap-3">
                      {['网格扫描', '带状巡查', '立面扫描', '螺旋上升', '定点环绕', '地形跟随'].map(mode => (
                        <div key={mode} className="p-3 border border-neutral-700 bg-neutral-800 rounded-lg text-center cursor-pointer hover:border-[#F5C244] hover:text-[#F5C244] transition-all">
                          <span className="text-sm font-medium">{mode}</span>
                        </div>
                      ))}
                   </div>
                </Card>
              </div>
            )}

             {activeTab === 'remote' && (
              <div className="space-y-8">
                <SectionHeader title="遥控设备与输入" description="自定义摇杆映射与键盘控制。" />
                <Card title="输入源">
                    <SelectControl label="主控制器" value="Gamepad (Xbox)" options={['RC Transmitter', 'Gamepad (Xbox)', 'Keyboard/Mouse', 'Touch Screen']} />
                    <ToggleControl label="启用键盘飞行控制" checked={true} />
                </Card>
                <Card title="通道映射">
                   <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                         <span className="text-neutral-400">CH1 (Roll)</span>
                         <span className="font-mono text-neutral-200">Axis 0</span>
                      </div>
                      <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                         <div className="bg-[#F5C244] h-full w-[50%]" />
                      </div>
                       <div className="flex justify-between items-center text-sm">
                         <span className="text-neutral-400">CH2 (Pitch)</span>
                         <span className="font-mono text-neutral-200">Axis 1</span>
                      </div>
                      <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                         <div className="bg-[#F5C244] h-full w-[50%]" />
                      </div>
                   </div>
                </Card>
              </div>
            )}

            {activeTab === 'safety' && (
              <div className="space-y-8">
                <SectionHeader title="安全保护机制" description="配置故障安全与自动返航策略。" />
                <div className="grid grid-cols-2 gap-6">
                  <Card title="返航触发条件">
                     <ToggleControl label="低电量自动返航" checked={true} />
                     <ToggleControl label="信号丢失自动返航" checked={true} />
                     <InputControl label="低电量阈值 (%)" value="20" />
                  </Card>
                  <Card title="避障系统">
                     <ToggleControl label="启用全向避障" checked={true} />
                     <InputControl label="避障刹车距离 (m)" value="2.5" />
                     <InputControl label="告警距离 (m)" value="5.0" />
                  </Card>
                </div>
              </div>
            )}
            
            {/* Fallback for other tabs */}
            {['payload', 'system'].includes(activeTab) && (
              <div className="flex flex-col items-center justify-center h-64 text-neutral-500">
                <Settings className="w-12 h-12 mb-4 opacity-20" />
                <p>该模块参数需连接飞行器后加载</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

// Subcomponents for the configuration UI
function SectionHeader({ title, description }: { title: string, description: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold text-white mb-1">{title}</h2>
      <p className="text-neutral-400 text-sm">{description}</p>
    </div>
  );
}

function Card({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-5">
      <h3 className="text-sm font-bold text-neutral-300 mb-4 border-l-2 border-[#F5C244] pl-3">{title}</h3>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}

function SliderControl({ label, value, min, max, unit = '' }: any) {
  return (
    <div>
      <div className="flex justify-between mb-1.5">
        <label className="text-xs text-neutral-400">{label}</label>
        <span className="text-xs font-mono text-neutral-200">{value}{unit}</span>
      </div>
      <input 
        type="range" 
        min={min} 
        max={max} 
        defaultValue={value} 
        className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#F5C244]" 
      />
    </div>
  );
}

function ToggleControl({ label, checked, description }: any) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <label className="text-sm text-neutral-300 block">{label}</label>
        {description && <p className="text-xs text-neutral-500 mt-0.5">{description}</p>}
      </div>
      <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${checked ? 'bg-[#F5C244]' : 'bg-neutral-700'}`}>
        <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${checked ? 'left-6' : 'left-1'}`} />
      </div>
    </div>
  );
}

function SelectControl({ label, value, options }: any) {
  return (
    <div>
      <label className="text-xs text-neutral-400 block mb-1.5">{label}</label>
      <select className="w-full bg-neutral-950 border border-neutral-700 rounded text-sm text-white px-3 py-2 outline-none focus:border-[#F5C244]">
        {options.map((opt: string) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

function InputControl({ label, value }: any) {
  return (
    <div>
      <label className="text-xs text-neutral-400 block mb-1.5">{label}</label>
      <input 
        type="text" 
        defaultValue={value}
        className="w-full bg-neutral-950 border border-neutral-700 rounded text-sm text-white px-3 py-2 outline-none focus:border-[#F5C244] font-mono"
      />
    </div>
  );
}
