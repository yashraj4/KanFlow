import { getBoardData } from "@/actions/board";
import { Sidebar } from "@/components/Sidebar";
import { Filter, Plus, Search } from "lucide-react";

export default async function BacklogPage() {
    const columnsData = await getBoardData();
    const allTasks = columnsData.flatMap((col: any) =>
        col.tasks.map((task: any) => ({ ...task, status: col.title }))
    );

    return (
        <div className="flex bg-white h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 ml-64 flex flex-col h-full bg-slate-50/50">
                <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8 shrink-0">
                    <h1 className="text-xl font-bold text-slate-900">Backlog</h1>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Create Issue
                    </button>
                </header>

                <div className="p-8 flex-1 overflow-auto">
                    {/* Filters */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search backlog"
                                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
                            <Filter className="h-4 w-4" />
                            Filters
                        </button>
                    </div>

                    {/* List */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="grid grid-cols-12 gap-4 p-4 border-b border-slate-100 bg-slate-50/50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            <div className="col-span-6">Issue</div>
                            <div className="col-span-2">Status</div>
                            <div className="col-span-2">Priority</div>
                            <div className="col-span-2">Assignee</div>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {allTasks.map((task) => (
                                <div key={task.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-slate-50 transition-colors group cursor-pointer">
                                    <div className="col-span-6 flex items-center gap-3">
                                        <div className="h-6 w-6 rounded bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-bold">
                                            TASK-{task.id.toString().substring(0, 4)}
                                        </div>
                                        <span className="text-sm font-medium text-slate-700 group-hover:text-indigo-600 transition-colors line-clamp-1">{task.content}</span>
                                    </div>
                                    <div className="col-span-2">
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${task.status === 'To Do' ? 'bg-slate-100 text-slate-600' :
                                                task.status === 'In Progress' ? 'bg-indigo-50 text-indigo-600' :
                                                    task.status === 'Done' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                                            }`}>
                                            {task.status}
                                        </span>
                                    </div>
                                    <div className="col-span-2">
                                        <div className={`flex items-center gap-1.5 text-xs font-medium ${task.priority === 'high' ? 'text-red-600' :
                                                task.priority === 'critical' ? 'text-red-700' :
                                                    task.priority === 'medium' ? 'text-amber-600' : 'text-slate-500'
                                            }`}>
                                            <div className={`h-1.5 w-1.5 rounded-full ${task.priority === 'high' ? 'bg-red-500' :
                                                    task.priority === 'critical' ? 'bg-red-700' :
                                                        task.priority === 'medium' ? 'bg-amber-500' : 'bg-slate-400'
                                                }`} />
                                            <span className="capitalize">{task.priority || 'Low'}</span>
                                        </div>
                                    </div>
                                    <div className="col-span-2 flex items-center gap-2">
                                        {task.assignee ? (
                                            <>
                                                <div className="h-6 w-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">
                                                    {task.assignee.substring(0, 2).toUpperCase()}
                                                </div>
                                                <span className="text-xs text-slate-600">{task.assignee}</span>
                                            </>
                                        ) : (
                                            <span className="text-xs text-slate-400 italic">Unassigned</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {allTasks.length === 0 && (
                                <div className="p-8 text-center text-slate-500 text-sm">
                                    No tasks found. Create one to get started!
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
