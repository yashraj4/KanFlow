import { createInitialData, getBoardData } from "@/actions/board";
import { KanbanBoard } from "@/components/Board/KanbanBoard";
import { Sidebar } from "@/components/Sidebar";
import { Bell, HelpCircle, Search } from "lucide-react";

export default async function Home() {
  await createInitialData();
  const columnsData = await getBoardData();

  // Transform data for the client component
  // The client expects a flat list of tasks and a list of columns
  const initialColumns = columnsData.map((col: any) => ({
    id: col.id,
    title: col.title
  }));

  const initialTasks = columnsData.flatMap((col: any) => col.tasks.map((task: any) => ({
    ...task,
    priority: task.priority as 'low' | 'medium' | 'high', // Cast to match type
    content: task.content,
    columnId: col.id
  })));

  return (
    <div className="flex bg-white h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 ml-64 flex flex-col h-full bg-slate-50/50">
        {/* Header */}
        <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8 shrink-0 z-10">
          <div className="flex items-center gap-4">
            <nav className="flex items-center gap-2 text-sm text-slate-500">
              <span className="hover:text-indigo-600 cursor-pointer transition-colors">Projects</span>
              <span>/</span>
              <span className="hover:text-indigo-600 cursor-pointer transition-colors">Team Jira</span>
              <span>/</span>
              <span className="text-slate-900 font-semibold">KAN Board</span>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <input
                type="text"
                placeholder="Search"
                className="pl-9 pr-4 py-1.5 bg-slate-100 border-2 border-transparent focus:border-indigo-500 rounded-md text-sm focus:ring-0 focus:bg-white transition-all w-64 outline-none"
              />
            </div>
            <button className="p-2 hover:bg-slate-100 rounded-full text-slate-500 relative transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
              <HelpCircle className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* Board Header */}
        <div className="px-8 py-6 shrink-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Kanban Board</h1>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <div className="h-8 w-8 rounded-full bg-indigo-500 border-2 border-white flex items-center justify-center text-xs text-white font-bold cursor-pointer hover:-translate-y-1 transition-transform shadow-sm">JD</div>
                <div className="h-8 w-8 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-xs text-white font-bold cursor-pointer hover:-translate-y-1 transition-transform shadow-sm">SM</div>
                <div className="h-8 w-8 rounded-full bg-amber-500 border-2 border-white flex items-center justify-center text-xs text-white font-bold cursor-pointer hover:-translate-y-1 transition-transform shadow-sm">AL</div>
                <div className="h-8 w-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs text-slate-500 font-bold cursor-pointer hover:-translate-y-1 transition-transform shadow-sm">+5</div>
              </div>
              <button className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-lg shadow-slate-900/20">
                Complete Sprint
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-slate-500 mb-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-400" />
              <input type="text" placeholder="Filter tasks" className="pl-8 py-1.5 bg-white border border-slate-200 rounded-md hover:border-indigo-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all w-48 text-sm outline-none" />
            </div>
            <div className="h-6 w-px bg-slate-200 mx-2"></div>
            <button className="flex items-center gap-1 hover:text-indigo-600 font-medium transition-colors">
              <span>Group By: None</span>
            </button>
          </div>
        </div>

        {/* Kanban Area */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden px-8 pb-4">
          <KanbanBoard initialColumns={initialColumns} initialTasks={initialTasks} />
        </div>
      </main>
    </div>
  );
}
