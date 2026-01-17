import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "./types";

interface Props {
    task: Task;
}

export function TaskCard({ task }: Props) {
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.id,
        data: {
            type: "Task",
            task,
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
                className="bg-slate-50 opacity-40 p-4 h-[120px] items-center flex text-left rounded-xl border-2 border-indigo-500 cursor-grab relative"
            />
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="bg-white p-4 min-h-[120px] flex flex-col justify-between rounded-xl hover:shadow-md hover:border-indigo-200 shadow-sm border border-slate-200 cursor-grab group transition-all duration-200 relative select-none"
        >
            <div className="w-full">
                <p className="text-slate-700 font-medium text-sm leading-snug line-clamp-3">
                    {task.content}
                </p>
            </div>

            <div className="flex items-center justify-between w-full pt-3 mt-auto border-t border-slate-50">
                <div className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md ${task.priority === 'high' ? 'bg-red-50 text-red-600' :
                        task.priority === 'medium' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-500'
                    }`}>
                    {task.priority || 'Low'}
                </div>
                {task.assignee && (
                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-white flex items-center justify-center text-[10px] font-bold shadow-sm ring-2 ring-white">
                        {task.assignee.substring(0, 2).toUpperCase()}
                    </div>
                )}
            </div>
        </div>
    );
}
