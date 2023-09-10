export interface IThumb {
    src: string;
    name: string;
    type: string;
}

export enum ColumnType {
    Pending = 'pending',
    Processing = 'processing',
    Done = 'done',
}

export interface ITask {
    id?: string,
    title: string,
    description: string,
    estimatedTime?: string,
    estimatedDate?: string,
    attachments?: string,
    isPlaceholder: boolean,
    tags: string[],
    ref: HTMLElement
}

