import { getBoardData } from "@/actions/board";
import { Sidebar } from "@/components/Sidebar";
import { BarChart, Calendar, CheckCircle2, CircleDashed, Clock } from "lucide-react";

export default async function ReportsPage() {
    const columnsData = await getBoardData();
    const allTasks = columnsData.flatMap((col: any) =>
        col.tasks.map((task: any) => ({ ...task, status: col.title }))
    );

    const totalTasks = allTasks.length;
    const completedTasks = allTasks.filter((t: any) => t.status === 'Done').length;
    const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const highPriority = allTasks.filter((t: any) => t.priority === 'high' || t.priority === 'critical').length;

    return (
        <div className="flex bg-white h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 ml-64 flex flex-col h-full bg-slate-50/50">
                <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8 shrink-0">
                    <h1 className="text-xl font-bold text-slate-900">Reports & Insights</h1>
                    <div className="flex items-center gap-2 text-sm text-slate-500 bg-slate-100 px-3 py-1.5 rounded-md">
                        <Calendar className="h-4 w-4" />
                        <span>Last 30 Days</span>
                    </div>
                </header>

                <div className="p-8 flex-1 overflow-auto">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500 mb-1">Total Tasks</p>
                                <h3 className="text-3xl font-bold text-slate-900">{totalTasks}</h3>
                            </div>
                            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                                <CircleDashed className="h-6 w-6" />
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500 mb-1">Completion Rate</p>
                                <h3 className="text-3xl font-bold text-slate-900">{progress}%</h3>
                            </div>
                            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                                <CheckCircle2 className="h-6 w-6" />
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500 mb-1">High Priority</p>
                                <h3 className="text-3xl font-bold text-slate-900">{highPriority}</h3>
                            </div>
                            <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
                                <BarChart className="h-6 w-6" />
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500 mb-1">Avg. Cycle Time</p>
                                <h3 className="text-3xl font-bold text-slate-900">4d</h3>
                            </div>
                            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                                <Clock className="h-6 w-6" />
                            </div>
                        </div>
                    </div>

                    {/* Charts Section (Visual Mocks utilizing CSS/HTML) */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h3 className="font-bold text-slate-900 mb-6">Task Completion History</h3>
                            <div className="h-64 flex items-end justify-between gap-2 px-4">
                                {[40, 65, 45, 80, 55, 70, 40, 60, 75, 50, 65, 85].map((h, i) => (
                                    <div key={i} className="w-full bg-indigo-50 rounded-t-sm relative group hover:bg-indigo-100 transition-colors cursor-pointer">
                                        <div
                                            className="absolute bottom-0 w-full bg-indigo-500 rounded-t-sm transition-all duration-500 ease-out group-hover:bg-indigo-600"
                                            style={{ height: `${h}%` }}
                                        ></div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between mt-4 text-xs text-slate-400 uppercase font-medium">
                                <span>Jan</span>
                                <span>Feb</span>
                                <span>Mar</span>
                                <span>Apr</span>
                                <span>May</span>
                                <span>Jun</span>
                                <span>Jul</span>
                                <span>Aug</span>
                                <span>Sep</span>
                                <span>Oct</span>
                                <span>Nov</span>
                                <span>Dec</span>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h3 className="font-bold text-slate-900 mb-6">Tasks by Status</h3>
                            <div className="space-y-4">
                                {[
                                    { label: 'To Do', count: allTasks.filter((t: any) => t.status === 'To Do').length, color: 'bg-slate-500' },
                                    { label: 'In Progress', count: allTasks.filter((t: any) => t.status === 'In Progress').length, color: 'bg-indigo-500' },
                                    { label: 'In Review', count: allTasks.filter((t: any) => t.status === 'In Review').length, color: 'bg-amber-500' },
                                    { label: 'Done', count: allTasks.filter((t: any) => t.status === 'Done').length, color: 'bg-emerald-500' },
                                ].map((stat) => (
                                    <div key={stat.label}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-slate-600 font-medium">{stat.label}</span>
                                            <span className="text-slate-900 font-bold">{stat.count}</span>
                                        </div>
                                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <div className={`h-full ${stat.color}`} style={{ width: `${(stat.count / totalTasks) * 100 || 0}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
