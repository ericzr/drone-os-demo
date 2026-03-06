import { 
  AlertTriangle, 
  Battery, 
  Camera, 
  ChevronRight, 
  Clock, 
  Download, 
  Map as MapIcon, 
  Maximize2, 
  Play, 
  Search, 
  Settings,
  Grid
} from "lucide-react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";

export default function GeneralModule() {
  const { moduleId } = useParams();
  const navigate = useNavigate();

  // Mock configs based on moduleId
  const getModuleConfig = (id: string | undefined) => {
    switch(id) {
      case 'agriculture': return { title: '农林植保作业', status: 'active' };
      case 'education': return { title: '青少年无人机大赛管理', status: 'standby' };
      case 'tourism': return { title: '文旅表演指挥', status: 'maintenance' };
      default: return { title: '通用模块', status: 'unknown' };
    }
  };

  const config = getModuleConfig(moduleId);

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col gap-4">
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
            <span className="text-[#F5C244] text-sm font-medium">{config.title}</span>
          </div>
          <h1 className="text-2xl font-bold text-white">{config.title}</h1>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-sm font-medium transition-colors border border-neutral-700">
            设置
          </button>
        </div>
      </div>

      <div className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl flex items-center justify-center flex-col gap-4 p-8 text-center">
        <div className="w-20 h-20 bg-neutral-800 rounded-2xl flex items-center justify-center mb-4">
          <Grid className="w-10 h-10 text-neutral-600" />
        </div>
        <h2 className="text-xl font-bold text-white">模块功能演示</h2>
        <p className="text-neutral-400 max-w-md">
          该模块 [{moduleId}] 的详细功能界面正在开发中。您可以访问 <span className="text-[#F5C244]">AI 智能放牧</span> 或 <span className="text-[#F5C244]">林草巡检</span> 模块查看完整交互演示。
        </p>
      </div>
    </div>
  );
}