import { Item } from "./item.model";
import { User } from "./user";

export class List {
    id: string;
    title: string;
    description: string;
    image: string;
    items: Item[];
    owner: User;
}   
