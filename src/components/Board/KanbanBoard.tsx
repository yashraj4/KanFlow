"use client";

import { createTask as createTaskAction, updateTaskPosition } from "@/actions/board";
import {
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useRouter } from "next/navigation";
import { startTransition, useEffect, useOptimistic, useState } from "react";
import { createPortal } from "react-dom";
import { Column } from "./Column";
import { TaskCard } from "./TaskCard";
import { Column as ColumnType, Task } from "./types";

interface Props {
    initialColumns: ColumnType[];
    initialTasks: Task[];
}

export function KanbanBoard({ initialColumns, initialTasks }: Props) {
    // Separate tasks from columns for flatter state management
    const [columns, setColumns] = useState<ColumnType[]>(initialColumns);
    const [activeColumn, setActiveColumn] = useState<ColumnType | null>(null);
    const [activeTask, setActiveTask] = useState<Task | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    const [optimisticTasks, setOptimisticTasks] = useOptimistic(
        initialTasks,
        (state, action: { type: 'move' | 'add' | 'update', payload: any }) => {
            if (action.type === 'move') {
                const { activeId, overId, activeIndex, overIndex, newColumnId } = action.payload;
                const newTasks = [...state];

                if (newColumnId) {
                    newTasks[activeIndex].columnId = newColumnId;
                }
                return arrayMove(newTasks, activeIndex, overIndex);
            }
            if (action.type === 'add') {
                return [...state, action.payload];
            }
            return state;
        }
    );

    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 3,
            },
        })
    );

    // Sync state if props change (server revalidation)
    useEffect(() => {
        // In a real app we might want to be careful about overwriting local drag state, 
        // but for now this ensures we see server updates.
        // However, since we use optimistic UI, we don't strictly need to sync valid initialTasks to state manually 
        // because useOptimistic handles the base state from the parent component (page).
        // But we passed initialTasks to useOptimistic, so we are good.
    }, [initialTasks]);

    return (
        <div className="flex h-full w-full overflow-x-auto overflow-y-hidden px-4 pb-4 items-start">
            <DndContext
                sensors={sensors}
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDragEnd={onDragEnd}
            >
                <div className="flex gap-6 h-full items-start">
                    <SortableContext items={columns.map((col) => col.id)}>
                        {columns.map((col) => (
                            <Column
                                key={col.id}
                                column={col}
                                tasks={optimisticTasks.filter((task) => task.columnId === col.id)}
                                createTask={createTask}
                            />
                        ))}
                    </SortableContext>
                </div>

                {isMounted && createPortal(
                    <DragOverlay>
                        {activeColumn && (
                            <Column
                                column={activeColumn}
                                tasks={optimisticTasks.filter(
                                    (task) => task.columnId === activeColumn.id
                                )}
                                createTask={createTask}
                            />
                        )}
                        {activeTask && <TaskCard task={activeTask} />}
                    </DragOverlay>,
                    document.body
                )}
            </DndContext>
        </div>
    );

    async function createTask(columnId: string | number, content: string, priority: string) {
        const tempId = Math.random().toString();
        const newTask = {
            id: tempId,
            columnId,
            content,
            priority: priority as 'low' | 'medium' | 'high' | 'critical',
            order: 999
        };

        startTransition(() => {
            setOptimisticTasks({ type: 'add', payload: newTask });
        });

        await createTaskAction(columnId.toString(), content, priority);
    }

    function onDragStart(event: DragStartEvent) {
        if (event.active.data.current?.type === "Column") {
            setActiveColumn(event.active.data.current.column);
            return;
        }

        if (event.active.data.current?.type === "Task") {
            setActiveTask(event.active.data.current.task);
            return;
        }
    }

    function onDragOver(event: DragOverEvent) {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveTask = active.data.current?.type === "Task";
        const isOverTask = over.data.current?.type === "Task";

        if (!isActiveTask) return;

        // Im dropping a Task over another Task
        if (isActiveTask && isOverTask) {
            const activeIndex = optimisticTasks.findIndex((t) => t.id === activeId);
            const overIndex = optimisticTasks.findIndex((t) => t.id === overId);

            if (optimisticTasks[activeIndex].columnId !== optimisticTasks[overIndex].columnId) {
                const newColumnId = optimisticTasks[overIndex].columnId;
                startTransition(() => {
                    setOptimisticTasks({
                        type: 'move',
                        payload: { activeId, overId, activeIndex, overIndex, newColumnId }
                    });
                });
            } else {
                startTransition(() => {
                    setOptimisticTasks({
                        type: 'move',
                        payload: { activeId, overId, activeIndex, overIndex }
                    });
                });
            }
        }

        const isOverColumn = over.data.current?.type === "Column";

        // Im dropping a Task over a column
        if (isActiveTask && isOverColumn) {
            const activeIndex = optimisticTasks.findIndex((t) => t.id === activeId);
            const newColumnId = overId;

            if (optimisticTasks[activeIndex].columnId !== newColumnId) {
                startTransition(() => {
                    // Move to end of column? or keep index? simplicity: just update columnId
                    // But arrayMove expects an overIndex. 
                    // If over column, we assume we just move it to that column visually.
                    // For simplicity in optimistic update, we just update the columnId in place
                    // But setOptimisticTasks expects generic reducer. 
                    // Let's just update the internal state logic properly in onDragEnd usually.
                    // DragOver is for visual preview.
                });

                // Actually dnd-kit recommends doing state updates during DragOver for sorting between containers
                // But for optimistic db persistence we do it on DragEnd.

                // Let's do the visual update here just for the UI using the state setter, 
                // but NOT the server action yet.
                // We need a local state for 'tasks' if we want to drive the UI completely, 
                // but we successfully used optimisticTasks as the source of truth.
            }
        }
    }

    function onDragEnd(event: DragEndEvent) {
        setActiveColumn(null);
        setActiveTask(null);

        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        // Drop logic
        const isActiveTask = active.data.current?.type === "Task";
        if (isActiveTask) {
            const activeIndex = optimisticTasks.findIndex(t => t.id === activeId);
            // Find where we dropped it.
            // If dropped over a task
            if (over.data.current?.type === "Task") {
                const overIndex = optimisticTasks.findIndex(t => t.id === overId);
                const newColumnId = optimisticTasks[overIndex].columnId;

                if (activeId !== overId || optimisticTasks[activeIndex].columnId !== newColumnId) {
                    startTransition(() => {
                        setOptimisticTasks({
                            type: 'move',
                            payload: { activeId, overId, activeIndex, overIndex, newColumnId }
                        });
                    });
                    // Call Server Action
                    updateTaskPosition(activeId.toString(), newColumnId.toString(), overIndex);
                }
            }
            // If dropped over a column (empty column or just column area)
            else if (over.data.current?.type === "Column") {
                const newColumnId = overId;
                if (optimisticTasks[activeIndex].columnId !== newColumnId) {
                    // For simplified dragging into empty column, we don't have an exact 'overIndex' relative to tasks.
                    // We effectively append it.
                    startTransition(() => {
                        // We need to construct a "fake" move effectively changing columnId
                        const newTasks = [...optimisticTasks];
                        newTasks[activeIndex].columnId = newColumnId as string;
                        // No reorder in array needed if we just render strictly by filter
                        // But arrayMove is good if we want to act like it moved to end?
                        // Actually filtering by columnId handles the visual grouping. 
                        // We just need to update the object.
                    });
                    // Call Server Action
                    updateTaskPosition(activeId.toString(), newColumnId.toString(), 0);
                }
            }
        }
    }
}
