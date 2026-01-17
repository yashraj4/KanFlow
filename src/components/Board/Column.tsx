import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MoreHorizontal, Plus } from "lucide-react";
import { useMemo } from "react";
import { NewTaskDialog } from "./NewTaskDialog";
import { TaskCard } from "./TaskCard";
import { Column as ColumnType, Task } from "./types";

interface Props {
    column: ColumnType;
    tasks: Task[];
    createTask: (columnId: string | number, content: string, priority: string) => void;
}

export function Column({ column, tasks, createTask }: Props) {
    const taskIds = useMemo(() => tasks.map((task) => task.id), [tasks]);

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: column.id,
        data: {
            type: "Column",
            column,
        },
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="bg-slate-50 w-[350px] h-[500px] max-h-[500px] rounded-xl flex flex-col opacity-60 border-2 border-indigo-500/50 border-dashed"
            ></div>
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="bg-slate-50/50 w-[350px] shrink-0 rounded-xl flex flex-col h-full max-h-full border border-slate-200/60 shadow-sm"
        >
            <div
                {...attributes}
                {...listeners}
                className="bg-transparent text-sm font-semibold p-4 flex items-center justify-between cursor-grab text-slate-700"
            >
                <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${column.title === 'To Do' ? 'bg-slate-400' :
                            column.title === 'In Progress' ? 'bg-indigo-500' :
                                column.title === 'Done' ? 'bg-emerald-500' : 'bg-slate-400'
                        }`} />
                    <span className="uppercase tracking-wide text-xs font-bold">{column.title}</span>
                    <span className="flex items-center justify-center text-xs bg-slate-200 text-slate-600 font-bold px-2 py-0.5 rounded-full min-w-[20px]">
                        {tasks.length}
                    </span>
                </div>
                <div className="flex items-center gap-1">
                    <NewTaskDialog columnId={column.id} createTask={createTask} />
                    <button className="hover:bg-slate-200 p-1 rounded-md text-slate-500 hover:text-slate-900 transition-colors">
                        <MoreHorizontal className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <div className="flex-1 flex flex-col gap-3 p-3 overflow-x-hidden overflow-y-auto">
                <SortableContext items={taskIds}>
                    {tasks.map((task) => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </SortableContext>
            </div>
            <div className="p-3 pt-0">
                <NewTaskDialog
                    columnId={column.id}
                    createTask={createTask}
                    trigger={
                        <button
                            className="w-full py-2 flex items-center justify-center gap-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors text-sm font-medium border border-transparent hover:border-indigo-100"
                        >
                            <Plus className="h-4 w-4" />
                            <span>Add Task</span>
                        </button>
                    }
                />
            </div>
        </div>
    );
}
