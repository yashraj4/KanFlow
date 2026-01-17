export type Id = string | number;

export type Task = {
    id: Id;
    columnId: Id;
    content: string;
    priority?: 'low' | 'medium' | 'high';
    tags?: string[];
    assignee?: string;
};

export type Column = {
    id: Id;
    title: string;
};
