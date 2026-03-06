import {
  Activity,
  AlertTriangle,
  Battery,
  CheckCircle2,
  Clock,
  MapPin,
  Plane,
  Users,
  Signal,
  Wind,
  Navigation,
  Video,
  Maximize2,
  Plus,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { motion } from "motion/react";
import { useNavigate } from "react-router";

const flightData = [
  { name: "Mon", hours: 45 },
  { name: "Tue", hours: 52 },
  { name: "Wed", hours: 38 },
  { name: "Thu", hours: 65 },
  { name: "Fri", hours: 48 },
  { name: "Sat", hours: 25 },
  { name: "Sun", hours: 15 },
];

const missionStatusData = [
  { name: "执行中", value: 12, color: "#F5C244" }, // brand yellow
  { name: "待执行", value: 8, color: "#525252" }, // neutral-600
  { name: "已完成", value: 45, color: "#22c55e" }, // green-500
  { name: "异常中止", value: 2, color: "#ef4444" }, // red-500
  { name: "计划中", value: 5, color: "#a855f7" }, // purple-500
];

export default function DashboardOverview() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">
            控制台概览
          </h1>
          <p className="text-neutral-400">
            欢迎回来，今日共有 12 项正在执行的任务。
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-sm font-medium transition-colors border border-neutral-700">
            下载报表
          </button>
          <button
            onClick={() =>
              navigate("/dashboard/missions?action=create")
            }
            className="px-4 py-2 bg-[#F5C244] hover:bg-[#F5C244]/90 text-neutral-950 rounded-lg text-sm font-bold transition-colors shadow-lg shadow-[#F5C244]/20 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> 新建任务
          </button>
        </div>
      </div>

      {/* Current Mission Board */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-neutral-800 flex justify-between items-center bg-neutral-950/50">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <h3 className="font-bold text-white">
              当前正在执行：林草高风险区例行巡检
            </h3>
            <span className="text-xs bg-neutral-800 px-2 py-0.5 rounded text-neutral-400 border border-neutral-700">
              M300-RTK
            </span>
          </div>
          <button
            onClick={() =>
              navigate("/dashboard/modules/forestry")
            }
            className="text-xs text-[#F5C244] hover:text-[#ffdea0] flex items-center gap-1"
          >
            查看详情 <Maximize2 className="w-3 h-3" />
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 h-64">
          {/* Left: Map/Video */}
          <div className="lg:col-span-2 relative group bg-black border-r border-neutral-800">
            <img
              src="https://images.unsplash.com/photo-1642833714391-cf9a0732321d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcm9uZSUyMGZsaWdodCUyMHBhdGglMjBwbGFubmluZyUyMG1hcCUyMHNvZnR3YXJlJTIwaW50ZXJmYWNlfGVufDF8fHx8MTc3MjM1NDQ4NXww&ixlib=rb-4.1.0&q=80&w=1080"
              className="w-full h-full object-cover opacity-60"
              alt="Mission Map"
            />
            <div className="absolute top-4 right-4 flex gap-2">
              <button className="bg-black/60 text-white px-2 py-1 rounded text-xs backdrop-blur border border-white/10 flex items-center gap-1">
                <Video className="w-3 h-3" /> 视频流
              </button>
              <button className="bg-[#F5C244] text-neutral-950 px-2 py-1 rounded text-xs shadow-lg shadow-[#F5C244]/20 flex items-center gap-1 font-medium">
                <MapPin className="w-3 h-3" /> 地图
              </button>
            </div>

            {/* Telemetry Overlay */}
            <div className="absolute bottom-4 left-4 right-4 grid grid-cols-4 gap-4">
              <div className="bg-neutral-900/80 backdrop-blur p-2 rounded border border-neutral-700">
                <div className="text-[10px] text-neutral-400 mb-0.5">
                  高度 (ALT)
                </div>
                <div className="font-mono text-white font-bold">
                  124.5{" "}
                  <span className="text-[10px] font-normal text-neutral-500">
                    m
                  </span>
                </div>
              </div>
              <div className="bg-neutral-900/80 backdrop-blur p-2 rounded border border-neutral-700">
                <div className="text-[10px] text-neutral-400 mb-0.5">
                  速度 (SPD)
                </div>
                <div className="font-mono text-white font-bold">
                  8.2{" "}
                  <span className="text-[10px] font-normal text-neutral-500">
                    m/s
                  </span>
                </div>
              </div>
              <div className="bg-neutral-900/80 backdrop-blur p-2 rounded border border-neutral-700">
                <div className="text-[10px] text-neutral-400 mb-0.5">
                  距离 (DST)
                </div>
                <div className="font-mono text-white font-bold">
                  1.2{" "}
                  <span className="text-[10px] font-normal text-neutral-500">
                    km
                  </span>
                </div>
              </div>
              <div className="bg-neutral-900/80 backdrop-blur p-2 rounded border border-neutral-700">
                <div className="text-[10px] text-neutral-400 mb-0.5">
                  链路 (LNK)
                </div>
                <div className="font-mono text-green-400 font-bold flex items-center gap-1">
                  HD <Signal className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Status & Timeline */}
          <div className="p-6 overflow-y-auto">
            <div className="mb-6">
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-medium text-neutral-300">
                  任务进度
                </span>
                <span className="text-xs text-[#F5C244] font-bold">
                  65%
                </span>
              </div>
              <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                <div className="bg-[#F5C244] h-full w-[65%] rounded-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]" />
                </div>
              </div>
              <div className="flex justify-between mt-1 text-[10px] text-neutral-500">
                <span>已飞: 24 min</span>
                <span>剩余: 12 min</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 relative">
                <div className="absolute left-[5px] top-2 bottom-[-16px] w-px bg-neutral-800" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#F5C244] mt-1.5 shrink-0 shadow-[0_0_8px_rgba(245,194,68,0.6)]" />
                <div>
                  <div className="text-xs text-neutral-500 mb-0.5">
                    10:45:22
                  </div>
                  <div className="text-sm text-white">
                    抵达关键航点 WP-08
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3 relative">
                <div className="absolute left-[5px] top-2 bottom-[-16px] w-px bg-neutral-800" />
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-700 mt-1.5 shrink-0" />
                <div>
                  <div className="text-xs text-neutral-500 mb-0.5">
                    10:30:00
                  </div>
                  <div className="text-sm text-neutral-400">
                    自动起飞完成
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3 relative">
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-700 mt-1.5 shrink-0" />
                <div>
                  <div className="text-xs text-neutral-500 mb-0.5">
                    10:15:00
                  </div>
                  <div className="text-sm text-neutral-400">
                    任务下发成功
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="在线设备"
          value="24/32"
          trend="+2"
          icon={<Plane className="w-5 h-5 text-[#F5C244]" />}
          trendUp={true}
        />
        <StatCard
          title="今日飞行时长"
          value="128h"
          trend="+12%"
          icon={<Clock className="w-5 h-5 text-blue-400" />}
          trendUp={true}
        />
        <StatCard
          title="任务完成率"
          value="98.5%"
          trend="+0.5%"
          icon={
            <CheckCircle2 className="w-5 h-5 text-green-400" />
          }
          trendUp={true}
        />
        <StatCard
          title="设备告警"
          value="3"
          trend="-1"
          icon={
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
          }
          trendUp={false}
          trendGood={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">
            本周飞行作业统计
          </h3>
          <div className="h-80 w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={flightData}>
                <defs>
                  <linearGradient
                    id="colorHours"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="#F5C244"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="#F5C244"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#262626"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  stroke="#525252"
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  stroke="#525252"
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#171717",
                    borderColor: "#262626",
                    color: "#f5f5f5",
                  }}
                  itemStyle={{ color: "#F5C244" }}
                />
                <Area
                  type="monotone"
                  dataKey="hours"
                  stroke="#F5C244"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorHours)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Chart */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">
            任务状态分布
          </h3>
          <div className="h-64 w-full min-w-0 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={missionStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {missionStatusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="none"
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#171717",
                    borderColor: "#262626",
                    color: "#f5f5f5",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  67
                </div>
                <div className="text-xs text-neutral-500">
                  总任务
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-3 mt-4">
            {missionStatusData.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-neutral-300">
                    {item.name}
                  </span>
                </div>
                <span className="font-medium text-white">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities / Live Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">
              实时设备状态
            </h3>
            <button className="text-[#F5C244] text-sm hover:underline">
              查看全部
            </button>
          </div>
          <div className="space-y-4">
            <DeviceStatusItem
              name="M300 RTK - A01"
              location="光伏电区 B3"
              battery={78}
              status="executing"
            />
            <DeviceStatusItem
              name="Mavic 3E - C04"
              location="林草巡检区"
              battery={45}
              status="executing"
            />
            <DeviceStatusItem
              name="Matrice 30 - B02"
              location="机库 H1"
              battery={100}
              status="standby"
            />
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">
              最新告警消息
            </h3>
            <button className="text-[#F5C244] text-sm hover:underline">
              查看全部
            </button>
          </div>
          <div className="space-y-4">
            <AlertItem
              title="电池温度过高"
              device="M300 RTK - A01"
              time="10分钟前"
              level="high"
            />
            <AlertItem
              title="信号干扰预警"
              device="Mavic 3E - C04"
              time="25分钟前"
              level="medium"
            />
            <AlertItem
              title="机库湿度异常"
              device="机库 H2"
              time="1小时前"
              level="low"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  trend,
  icon,
  trendUp,
  trendGood,
}: any) {
  const isGood = trendGood !== undefined ? trendGood : trendUp;
  return (
    <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-xl">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-neutral-400 text-sm">{title}</p>
          <h4 className="text-2xl font-bold text-white mt-1">
            {value}
          </h4>
        </div>
        <div className="p-2 bg-neutral-800 rounded-lg">
          {icon}
        </div>
      </div>
      <div className="flex items-center text-xs">
        <span
          className={`${isGood ? "text-green-400" : "text-red-400"} font-medium`}
        >
          {trend}
        </span>
        <span className="text-neutral-500 ml-2">较昨日</span>
      </div>
    </div>
  );
}

function DeviceStatusItem({
  name,
  location,
  battery,
  status,
}: any) {
  return (
    <div className="flex items-center justify-between p-3 bg-neutral-950/50 rounded-lg border border-neutral-800">
      <div className="flex items-center gap-3">
        <div
          className={`w-2 h-2 rounded-full ${status === "executing" ? "bg-green-500 animate-pulse" : "bg-neutral-500"}`}
        />
        <div>
          <div className="text-white font-medium text-sm">
            {name}
          </div>
          <div className="text-neutral-500 text-xs flex items-center gap-1">
            <MapPin className="w-3 h-3" /> {location}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 text-neutral-400 text-xs">
          <Battery
            className={`w-3 h-3 ${battery < 20 ? "text-red-500" : "text-neutral-400"}`}
          />
          {battery}%
        </div>
        <div
          className={`px-2 py-1 rounded text-xs ${
            status === "executing"
              ? "bg-green-500/10 text-green-400"
              : "bg-neutral-800 text-neutral-400"
          }`}
        >
          {status === "executing" ? "执行中" : "待机"}
        </div>
      </div>
    </div>
  );
}

function AlertItem({ title, device, time, level }: any) {
  const colors = {
    high: "text-red-400 bg-red-400/10 border-red-400/20",
    medium:
      "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
    low: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  };

  return (
    <div
      className={`flex items-start gap-3 p-3 rounded-lg border ${colors[level as keyof typeof colors]}`}
    >
      <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <span className="font-medium text-sm">{title}</span>
          <span className="text-xs opacity-70">{time}</span>
        </div>
        <div className="text-xs mt-1 opacity-80">
          设备: {device}
        </div>
      </div>
    </div>
  );
}