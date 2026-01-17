"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getBoardData() {
    const columns = await prisma.column.findMany({
        include: {
            tasks: {
                orderBy: {
                    order: "asc",
                },
            },
        },
        orderBy: {
            order: "asc",
        },
    });
    return columns;
}

export async function createInitialData() {
    const count = await prisma.column.count();
    if (count > 0) return; // Already initialized

    await prisma.column.create({
        data: {
            title: "To Do",
            order: 0,
            tasks: {
                create: [
                    { content: "Research competitors", priority: "medium", order: 0, assignee: "Alex" },
                    { content: "Design system tokens", priority: "high", order: 1, assignee: "Sam" }
                ]
            }
        }
    });

    await prisma.column.create({
        data: {
            title: "In Progress",
            order: 1,
            tasks: {
                create: [
                    { content: "Setup Next.js project", priority: "high", order: 0, assignee: "You" }
                ]
            }
        }
    });

    await prisma.column.create({
        data: {
            title: "In Review",
            order: 2,
            tasks: {
                create: [
                    { content: "Auth flow implementation", priority: "critical", order: 0, assignee: "Dev" }
                ]
            }
        }
    });

    await prisma.column.create({
        data: {
            title: "Done",
            order: 3,
            tasks: {
                create: [
                    { content: "Kickoff meeting", priority: "low", order: 0 }
                ]
            }
        }
    });
}

export async function updateTaskPosition(
    taskId: string,
    newColumnId: string,
    newOrder: number
) {
    // In a real app we'd handle reordering all other items. 
    // For this clone, we just update the columnId. 
    // Correctly handling order needs a bit more logic to shift items.

    await prisma.task.update({
        where: { id: taskId },
        data: {
            columnId: newColumnId,
        },
    });

    revalidatePath("/");
}

export async function createTask(columnId: string, content: string, priority: string = 'low') {
    await prisma.task.create({
        data: {
            columnId,
            content,
            priority,
            order: 999 // Add to end
        }
    });
    revalidatePath("/");
}

export async function updateTask(taskId: string, data: any) {
    await prisma.task.update({
        where: { id: taskId },
        data
    });
    revalidatePath("/");
}

export async function deleteTask(taskId: string) {
    await prisma.task.delete({
        where: { id: taskId }
    });
    revalidatePath("/");
}
