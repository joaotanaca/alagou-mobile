import { Coordenadas } from "./location";
import { UserI } from "./user";

export interface GlobalState {
    user: UserI;
    location: Coordenadas;
}

export interface Action<T> {
    type: string;
    data?: T;
}
