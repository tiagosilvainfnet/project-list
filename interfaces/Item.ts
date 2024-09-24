export interface ItemInterface {
    uid: string;
    title: string;
    description: string;
    images?: Array<ItemImageInterface> | Array<string>,
    createdAt?: string;
    sync?: number
}

export interface ItemImageInterface {
    uid: string;
    image: string;
    itemUid: string,
    createdAt?: string;
    sync?: number
}