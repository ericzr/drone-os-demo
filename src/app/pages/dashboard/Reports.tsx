import { 
  BarChart, 
  Download, 
  FileText, 
  PieChart, 
  Search, 
  SlidersHorizontal 
} from "lucide-react";

export default function Reports() {
  const reports = [
    { id: 1, title: '2026年3月林草巡检周报', date: '2026-03-01', type: '林草巡检', author: '张伟', size: '2.4 MB' },
    { id: 2, title: '光伏电站B区热斑检测报告', date: '2026-02-28', type: '光伏巡检', author: '李明', size: '15.6 MB' },
    { id: 3, title: '2月无人机飞行架次统计', date: '2026-02-28', type: '运营数据', author: '王强', size: '0.8 MB' },
    { id: 4, title: '新建光伏电站地形勘测报告', date: '2026-02-27', type: '测绘', author: '赵雷', size: '48.2 MB' },
    { id: 5, title: '设备健康状况分析月报', date: '2026-02-26', type: '设备维护', author: '系统自动生成', size: '1.2 MB' },
  ];

  return (
    <div className="space-y-6">
       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">数据报告中心</h1>
          <p className="text-neutral-400">查看、导出和分享您的业务数据报告。</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-neutral-800 text-white rounded-lg border border-neutral-700 hover:bg-neutral-700 transition-colors text-sm font-medium">
            报表配置
          </button>
          <button className="px-4 py-2 bg-[#F5C244] text-neutral-950 rounded-lg hover:bg-[#F5C244]/90 transition-colors shadow-lg shadow-[#F5C244]/20 text-sm font-bold">
            生成新报告
          </button>
        </div>
      </div>

      <div className="flex gap-4 mb-6 bg-neutral-900 p-4 rounded-xl border border-neutral-800">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input 
            type="text" 
            placeholder="搜索报告名称、类型..." 
            className="w-full bg-neutral-950 border border-neutral-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#F5C244]/50"
          />
        </div>
        <button className="px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-neutral-300 hover:bg-neutral-700 flex items-center gap-2 text-sm font-medium">
          <SlidersHorizontal className="w-4 h-4" /> 筛选
        </button>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
        <table className="min-w-full divide-y divide-neutral-800">
          <thead className="bg-neutral-950">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                报告标题
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                类型
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                生成日期
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                创建人
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                大小
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">操作</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-neutral-900 divide-y divide-neutral-800">
            {reports.map((report) => (
              <tr key={report.id} className="hover:bg-neutral-800/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-[#F5C244] mr-3" />
                    <span className="text-sm font-medium text-white">{report.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700">
                    {report.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-400">
                  {report.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">
                  {report.author}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                  {report.size}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-[#F5C244] hover:text-[#ffdea0] flex items-center gap-1 ml-auto transition-colors">
                    <Download className="w-4 h-4" /> 下载
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
