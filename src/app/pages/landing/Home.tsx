import { ArrowRight, Box, Check, Cpu, FileBarChart, Globe, LayoutDashboard, Map, Shield, Users, Zap } from "lucide-react";
import { Link } from "react-router";
import { motion } from "motion/react";
import CommandCenterScreen from "../../components/CommandCenterScreen";

export default function Home() {
  const industries = [
    { title: "林草巡检", icon: <Map className="w-6 h-6" />, desc: "火情识别、病虫害监测、覆盖率计算" },
    { title: "光伏巡检", icon: <Zap className="w-6 h-6" />, desc: "红外热斑识别、故障定位、发电损失估算" },
    { title: "露天矿巡检", icon: <Box className="w-6 h-6" />, desc: "三维建模、边坡监测、堆料体积测算" },
    { title: "管道巡线", icon: <ActivityIcon className="w-6 h-6" />, desc: "GIS轨迹匹配、异常点标记、违建识别" },
    { title: "农林植保", icon: <LeafIcon className="w-6 h-6" />, desc: "作业面积统计、药剂记录、自动结算" },
    { title: "安防/赛事", icon: <Shield className="w-6 h-6" />, desc: "人流监控、实时直播、应急指挥调度" },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1761063443599-4c0edee38e61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwZHJvbmUlMjB0ZWNobm9sb2d5JTIwaHVkJTIwZGFyayUyMGFic3RyYWN0JTIwcHJlbWl1bXxlbnwxfHx8fDE3NzIzNzcyMDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
            alt="Futuristic Tech Background" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/80 via-neutral-950/50 to-neutral-950" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5C244]/10 border border-[#F5C244]/30 text-[#F5C244] text-sm font-medium mb-8 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F5C244] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F5C244]"></span>
              </span>
              DroneOS 企业版 v2.0 正式发布
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
              定义未来的 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5C244] to-[#ffdea0]">低空经济操作系统</span>
            </h1>
            
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto mb-10 leading-relaxed">
              一体化「设备 + 人员 + 任务 + 行业业务流程 + 数据报告」SaaS 管理平台。
              <br className="hidden md:block" />
              帮助企业从"项目制"向"产品制"转型，实现规模化运营。
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/dashboard"
                className="w-full sm:w-auto px-8 py-4 bg-neutral-800/50 hover:bg-neutral-700/50 text-white border border-neutral-700 rounded-lg font-semibold text-lg transition-all backdrop-blur-sm"
              >
                demo演示
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats/Trust Section */}
      <section className="bg-neutral-900 border-y border-neutral-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-neutral-400 text-sm">服务企业</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">10W+</div>
              <div className="text-neutral-400 text-sm">累计飞行架次</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">12</div>
              <div className="text-neutral-400 text-sm">行业解决方案</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">99.9%</div>
              <div className="text-neutral-400 text-sm">系统可用性</div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section id="features" className="py-24 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">全流程数字化管理</h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              打破信息孤岛，实现从资产入库到任务交付的全链路闭环管理。
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<LayoutDashboard className="w-8 h-8 text-[#F5C244]" />}
              title="资产全生命周期管理"
              desc="建立无人机、电池、载荷的一机一档。自动记录飞行时长、维修保养记录、折旧计算，让每一分钱都花得明白。"
            />
            <FeatureCard 
              icon={<Cpu className="w-8 h-8 text-[#F5C244]/80" />}
              title="智能任务调度"
              desc="支持多种任务类型（巡检、测绘、植保）。可视化地图派单，自动匹配空闲飞手与可用设备，效率提升 300%。"
            />
            <FeatureCard 
              icon={<FileBarChart className="w-8 h-8 text-[#F5C244]/60" />}
              title="自动化数据报告"
              desc="内置多行业标准报告模板。任务结束自动生成巡检报告、问题点位清单，支持客户在线确认与下载。"
            />
          </div>

          <div className="mt-20">
            <CommandCenterScreen />
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section id="solutions" className="py-24 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">行业解决方案插件</h2>
              <p className="text-neutral-400 max-w-2xl">
                像安装 APP 一样扩展您的业务能力。针对不同行业痛点，提供标准化的作业流程与数据模型。
              </p>
            </div>
            <Link to="/dashboard/modules" className="text-[#F5C244] hover:text-[#ffdea0] font-medium flex items-center gap-1 mt-4 md:mt-0">
              查看所有模块 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((item, idx) => (
              <div key={idx} className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-6 hover:bg-neutral-800 transition-colors group">
                <div className="w-12 h-12 rounded-lg bg-neutral-700 flex items-center justify-center mb-4 text-[#F5C244] group-hover:bg-[#F5C244]/20 group-hover:text-[#F5C244] transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="py-24 bg-neutral-950">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">为每一个角色赋能</h2>
              <p className="text-neutral-400 mb-8">
                从管理层到一线飞手，DroneOS 提供了基于角色的定制化工作台，让协作更高效。
              </p>
              
              <div className="space-y-6">
                <RoleItem 
                  title="运营总监" 
                  desc="全局掌控项目进度、成本与利润，基于数据辅助决策。" 
                />
                <RoleItem 
                  title="任务调度员" 
                  desc="像打车软件一样派单，实时监控任务执行状态，处理异常情况。" 
                />
                <RoleItem 
                  title="飞手 / 工程师" 
                  desc="移动端接收任务，现场上传数据，自动关联飞行记录。" 
                />
                <RoleItem 
                  title="客户 / 监管方" 
                  desc="专属门户查看交付成果与合规报告，透明化服务过程。" 
                />
              </div>
            </div>
            <div className="relative">
               <img 
                src="https://images.unsplash.com/photo-1662348316911-d6aef85f8560?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwZHJvbmUlMjBvcGVyYXRvciUyMHdpdGglMjB0YWJsZXR8ZW58MXx8fHwxNzcyMzQ4MjkzfDA&ixlib=rb-4.1.0&q=80&w=1080" 
                alt="Operator with Tablet" 
                className="rounded-2xl shadow-2xl border border-neutral-800"
              />
              <div className="absolute -bottom-6 -left-6 bg-neutral-800 p-6 rounded-xl border border-neutral-700 shadow-xl max-w-xs">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-white font-semibold">任务执行中</span>
                </div>
                <div className="text-neutral-300 text-sm">
                  正在上传林草巡检影像数据...
                  <div className="w-full bg-neutral-700 h-2 rounded-full mt-2 overflow-hidden">
                    <div className="bg-[#F5C244] h-full w-[70%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
         </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#F5C244]/20 to-neutral-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">准备好升级您的低空业务了吗？</h2>
          <p className="text-xl text-[#F5C244] mb-10">
            立即注册体验 DroneOS 企业版，开启数字化运营新篇章。
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">

             <button className="px-8 py-4 bg-transparent border border-white/30 hover:bg-white/10 text-white rounded-lg font-bold text-lg transition-colors">
                联系销售顾问
              </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-neutral-900/50 p-8 rounded-2xl border border-neutral-800 hover:border-[#F5C244]/50 transition-colors">
      <div className="mb-6">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-neutral-400 leading-relaxed">
        {desc}
      </p>
    </div>
  )
}

function RoleItem({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="flex gap-4">
      <div className="mt-1">
        <div className="w-6 h-6 rounded-full bg-[#F5C244]/10 flex items-center justify-center border border-[#F5C244]/30">
          <Check className="w-3 h-3 text-[#F5C244]" />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <p className="text-neutral-400 text-sm mt-1">{desc}</p>
      </div>
    </div>
  )
}

function ActivityIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  )
}

function LeafIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  )
}
