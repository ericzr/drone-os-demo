import { Plane } from "lucide-react";
import { Link } from "react-router";
import { motion } from "motion/react";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1728577379969-768bf0747172?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFwJTIwZGF0YSUyMGFuYWx5dGljcyUyMGRhcmslMjB1aXxlbnwxfHx8fDE3NzIzNDgzMDd8MA&ixlib=rb-4.1.0&q=80&w=1080" 
          alt="Background" 
          className="w-full h-full object-cover opacity-20 blur-sm"
        />
        <div className="absolute inset-0 bg-slate-950/70" />
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10 bg-slate-900/80 p-10 rounded-2xl border border-slate-800 backdrop-blur-md shadow-2xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center">
            <div className="w-12 h-12 bg-cyan-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-900/50">
               <Plane className="text-slate-950 w-7 h-7 -rotate-45" />
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            登录 DroneOS
          </h2>
          <p className="mt-2 text-center text-sm text-slate-400">
            企业级无人机作业管理平台
          </p>
        </motion.div>
        
        <form className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">邮箱地址</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-slate-700 placeholder-slate-500 text-white rounded-t-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm bg-slate-800"
                placeholder="邮箱地址"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">密码</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-slate-700 placeholder-slate-500 text-white rounded-b-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm bg-slate-800"
                placeholder="密码"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-slate-700 rounded bg-slate-800"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-400">
                记住我
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-cyan-500 hover:text-cyan-400">
                忘记密码?
              </a>
            </div>
          </div>

          <div>
            <Link
              to="/dashboard"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors shadow-lg shadow-cyan-900/20"
            >
              登录
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
