import { User } from "./user";

export class Item {
    id: string;
    title: string;
    description: string;
    image: string;
    votes : User[];
}