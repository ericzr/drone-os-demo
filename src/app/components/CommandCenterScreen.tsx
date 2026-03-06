import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Plane,
  Battery,
  Signal,
  MapPin,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Navigation,
  Wifi,
  Thermometer,
  Wind,
  Eye,
} from "lucide-react";

/* ── 无人机飞行路径数据 ── */
const DRONE_PATHS = [
  // 无人机 1：巡检路线（左上到右下弧线）
  { id: 1, name: "DJI M350-01", mission: "电力巡检", battery: 78, signal: 96, altitude: 120, speed: 12.5,
    path: [
      { x: 15, y: 20 }, { x: 22, y: 18 }, { x: 30, y: 22 }, { x: 38, y: 28 },
      { x: 45, y: 25 }, { x: 52, y: 30 }, { x: 58, y: 35 }, { x: 62, y: 32 },
      { x: 55, y: 28 }, { x: 48, y: 24 }, { x: 40, y: 20 }, { x: 30, y: 22 },
      { x: 22, y: 18 }, { x: 15, y: 20 },
    ],
  },
  // 无人机 2：测绘路线（网格扫描）
  { id: 2, name: "DJI M30T-02", mission: "矿区测绘", battery: 62, signal: 88, altitude: 200, speed: 8.2,
    path: [
      { x: 60, y: 55 }, { x: 75, y: 55 }, { x: 75, y: 62 }, { x: 60, y: 62 },
      { x: 60, y: 69 }, { x: 75, y: 69 }, { x: 75, y: 76 }, { x: 60, y: 76 },
      { x: 60, y: 69 }, { x: 60, y: 62 }, { x: 60, y: 55 },
    ],
  },
];

/* ── 告警事件 ── */
const ALERTS = [
  { type: "danger", label: "边坡地质", time: "13:45", location: "南坡230m" },
  { type: "warning", label: "车辆违规", time: "11:20", location: "运输干道" },
  { type: "info", label: "设备维护", time: "09:15", location: "停机坪A" },
];

/* ── 地图标记点 ── */
const MAP_MARKERS = [
  { x: 35, y: 45, label: "停机坪A", type: "base" },
  { x: 70, y: 30, label: "巡检点1", type: "waypoint" },
  { x: 55, y: 65, label: "巡检点2", type: "waypoint" },
  { x: 25, y: 70, label: "充电站", type: "station" },
];

/* ── 无人机图标 SVG ── */
function DroneIcon({ size = 24, color = "#F5C244" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" fill={color} opacity="0.9" />
      <line x1="12" y1="12" x2="5" y2="5" stroke={color} strokeWidth="1.5" />
      <line x1="12" y1="12" x2="19" y2="5" stroke={color} strokeWidth="1.5" />
      <line x1="12" y1="12" x2="5" y2="19" stroke={color} strokeWidth="1.5" />
      <line x1="12" y1="12" x2="19" y2="19" stroke={color} strokeWidth="1.5" />
      <circle cx="5" cy="5" r="2.5" stroke={color} strokeWidth="1" fill="none" opacity="0.6" />
      <circle cx="19" cy="5" r="2.5" stroke={color} strokeWidth="1" fill="none" opacity="0.6" />
      <circle cx="5" cy="19" r="2.5" stroke={color} strokeWidth="1" fill="none" opacity="0.6" />
      <circle cx="19" cy="19" r="2.5" stroke={color} strokeWidth="1" fill="none" opacity="0.6" />
    </svg>
  );
}

/* ── 飞行中的无人机 ── */
function FlyingDrone({ drone }: { drone: typeof DRONE_PATHS[0] }) {
  const [idx, setIdx] = useState(0);
  const path = drone.path;

  useEffect(() => {
    const timer = setInterval(() => {
      setIdx((i) => (i + 1) % path.length);
    }, drone.id === 1 ? 1800 : 2200);
    return () => clearInterval(timer);
  }, [path.length, drone.id]);

  const cur = path[idx];
  const next = path[(idx + 1) % path.length];
  const angle = Math.atan2(next.y - cur.y, next.x - cur.x) * (180 / Math.PI);

  return (
    <motion.div
      className="absolute z-30"
      animate={{ left: `${cur.x}%`, top: `${cur.y}%` }}
      transition={{ duration: drone.id === 1 ? 1.8 : 2.2, ease: "linear" }}
      style={{ transform: "translate(-50%, -50%)" }}
    >
      {/* 脉冲光环 */}
      <motion.div
        className="absolute inset-0 rounded-full bg-[#F5C244]/20"
        animate={{ scale: [1, 2.5, 1], opacity: [0.4, 0, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ width: 32, height: 32, left: -4, top: -4 }}
      />
      {/* 无人机图标 */}
      <motion.div animate={{ rotate: angle }} transition={{ duration: 0.3 }}>
        <DroneIcon size={24} />
      </motion.div>
      {/* 标签 */}
      <div className="absolute top-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/70 text-[10px] text-[#F5C244] px-1.5 py-0.5 rounded font-mono">
        {drone.name.split("-")[1]}
      </div>
    </motion.div>
  );
}

/* ── 航线轨迹 ── */
function FlightPath({ path, color = "#F5C244" }: { path: { x: number; y: number }[]; color?: string }) {
  const d = path.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  return (
    <svg className="absolute inset-0 w-full h-full z-20 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
      <path d={d} fill="none" stroke={color} strokeWidth="0.15" strokeDasharray="0.8 0.4" opacity="0.4" />
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="0.2"
        strokeDasharray="2 98"
        strokeDashoffset={0}
        animate={{ strokeDashoffset: [-100, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        opacity="0.7"
      />
    </svg>
  );
}

/* ── 主组件 ── */
export default function CommandCenterScreen() {
  const [time, setTime] = useState(new Date());
  const [selectedDrone, setSelectedDrone] = useState<number | null>(null);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const timeStr = time.toLocaleTimeString("zh-CN", { hour12: false });
  const dateStr = time.toLocaleDateString("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit" });

  return (
    <div className="relative w-full aspect-[16/9] max-h-[600px] bg-neutral-950 rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl select-none">

      {/* ── 地图背景 ── */}
      <div className="absolute inset-0">
        <img
          src="/drone-os-demo/command-center-map.png"
          alt="指挥中心地图"
          className="w-full h-full object-cover opacity-60"
        />
        {/* 网格叠加 */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "linear-gradient(rgba(245,194,68,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(245,194,68,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* 暗角 */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-neutral-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/60 via-transparent to-neutral-950/60" />
      </div>

      {/* ── 航线轨迹 ── */}
      <FlightPath path={DRONE_PATHS[0].path} color="#F5C244" />
      <FlightPath path={DRONE_PATHS[1].path} color="#4ADE80" />

      {/* ── 地图标记点 ── */}
      {MAP_MARKERS.map((m, i) => (
        <div key={i} className="absolute z-20" style={{ left: `${m.x}%`, top: `${m.y}%`, transform: "translate(-50%, -50%)" }}>
          <div className={`w-3 h-3 rounded-full border-2 ${
            m.type === "base" ? "bg-[#F5C244] border-[#F5C244]/50" :
            m.type === "station" ? "bg-green-400 border-green-400/50" :
            "bg-blue-400 border-blue-400/50"
          }`} />
          <div className="absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] text-white/60 font-mono">
            {m.label}
          </div>
        </div>
      ))}

      {/* ── 飞行中的无人机 ── */}
      {DRONE_PATHS.map((d) => (
        <FlyingDrone key={d.id} drone={d} />
      ))}

      {/* ── 顶部状态栏 ── */}
      <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-5 py-3 bg-gradient-to-b from-black/70 to-transparent">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-[#F5C244]">
            <Navigation className="w-3.5 h-3.5" />
            <span className="text-xs font-bold tracking-wider">大航蜂 指挥中心</span>
          </div>
          <div className="h-3 w-px bg-white/20" />
          <div className="flex items-center gap-1 text-green-400">
            <Wifi className="w-3 h-3" />
            <span className="text-[10px]">链接正常</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-white/70 text-[10px] font-mono">
          <span>{dateStr}</span>
          <span className="text-[#F5C244] font-bold text-xs">{timeStr}</span>
        </div>
      </div>

      {/* ── 左侧面板：无人机监控 ── */}
      <div className="absolute left-3 top-14 bottom-14 w-52 z-40 flex flex-col gap-2">
        {/* 无人机列表 */}
        <div className="bg-black/60 backdrop-blur-md rounded-xl border border-white/10 p-3 flex-1">
          <div className="flex items-center gap-1.5 mb-3">
            <Plane className="w-3.5 h-3.5 text-[#F5C244]" />
            <span className="text-[11px] font-bold text-white">无人机监控</span>
            <span className="ml-auto text-[9px] text-green-400 bg-green-400/10 px-1.5 py-0.5 rounded-full">2 在线</span>
          </div>
          {DRONE_PATHS.map((d) => (
            <div
              key={d.id}
              className={`p-2 rounded-lg mb-1.5 cursor-pointer transition-all text-[10px] ${
                selectedDrone === d.id
                  ? "bg-[#F5C244]/15 border border-[#F5C244]/30"
                  : "bg-white/5 border border-transparent hover:bg-white/10"
              }`}
              onClick={() => setSelectedDrone(selectedDrone === d.id ? null : d.id)}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-white">{d.name}</span>
                <span className="text-green-400">● 飞行中</span>
              </div>
              <div className="text-white/50">{d.mission}</div>
              <div className="flex items-center gap-3 mt-1.5 text-white/60">
                <span className="flex items-center gap-0.5">
                  <Battery className="w-3 h-3" /> {d.battery}%
                </span>
                <span className="flex items-center gap-0.5">
                  <Signal className="w-3 h-3" /> {d.signal}%
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 环境信息 */}
        <div className="bg-black/60 backdrop-blur-md rounded-xl border border-white/10 p-3">
          <div className="text-[10px] text-white/50 mb-2">环境信息</div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <Thermometer className="w-3 h-3 mx-auto text-orange-400 mb-0.5" />
              <div className="text-[10px] text-white font-bold">24°C</div>
            </div>
            <div>
              <Wind className="w-3 h-3 mx-auto text-blue-400 mb-0.5" />
              <div className="text-[10px] text-white font-bold">3.2m/s</div>
            </div>
            <div>
              <Eye className="w-3 h-3 mx-auto text-green-400 mb-0.5" />
              <div className="text-[10px] text-white font-bold">8km</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 右侧面板：任务与告警 ── */}
      <div className="absolute right-3 top-14 bottom-14 w-52 z-40 flex flex-col gap-2">
        {/* 任务统计 */}
        <div className="bg-black/60 backdrop-blur-md rounded-xl border border-white/10 p-3">
          <div className="flex items-center gap-1.5 mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#F5C244]" />
            <span className="text-[11px] font-bold text-white">任务概览</span>
          </div>
          <div className="grid grid-cols-3 gap-1 text-center">
            {[
              { n: "8", label: "发现问题", color: "text-red-400" },
              { n: "6", label: "已处理", color: "text-green-400" },
              { n: "2", label: "待处理", color: "text-[#F5C244]" },
            ].map((s) => (
              <div key={s.label} className="bg-white/5 rounded-lg py-2">
                <div className={`text-lg font-black ${s.color}`}>{s.n}</div>
                <div className="text-[9px] text-white/50">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 告警列表 */}
        <div className="bg-black/60 backdrop-blur-md rounded-xl border border-white/10 p-3 flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-white">问题清单</span>
            <span className="text-[9px] text-[#F5C244] cursor-pointer">报告导出</span>
          </div>
          <div className="space-y-1.5">
            {ALERTS.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                className="flex items-start gap-2 p-2 rounded-lg bg-white/5"
              >
                <div className={`w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0 ${
                  a.type === "danger" ? "bg-red-500" : a.type === "warning" ? "bg-yellow-500" : "bg-blue-400"
                }`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-white">{a.label}</span>
                    <span className="text-[9px] text-white/40">{a.time}</span>
                  </div>
                  <div className="text-[9px] text-white/50">位置:{a.location}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 飞行数据 */}
        <div className="bg-black/60 backdrop-blur-md rounded-xl border border-white/10 p-3">
          <div className="text-[10px] text-white/50 mb-2">历史数据统计</div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "飞行总里程", value: "1,280km" },
              { label: "飞行总时长", value: "86.5h" },
              { label: "飞行总次数", value: "342次" },
              { label: "航线总数量", value: "80个" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-[11px] font-black text-white">{s.value}</div>
                <div className="text-[8px] text-white/40">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 底部坐标栏 ── */}
      <div className="absolute bottom-0 left-0 right-0 z-40 flex items-center justify-center gap-6 py-2 bg-gradient-to-t from-black/70 to-transparent">
        <span className="text-[9px] text-white/40 font-mono">经度: 105.569025</span>
        <span className="text-[9px] text-white/40 font-mono">纬度: 30.476649</span>
        <span className="text-[9px] text-white/40 font-mono">海拔: 273m</span>
        <span className="text-[9px] text-white/40 font-mono">风向: 17° 方向南</span>
      </div>
    </div>
  );
}
