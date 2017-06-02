export interface IStoreList {
    name: string; // Store Name
    items: IStoreItem[];
}

export interface IStoreItem {
        listSeq: number;
        name: string;
        note: string;
        checked: boolean;
        dateTouched: Date;
}
