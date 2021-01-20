import { Coordenadas } from "../../utils/interfaces/location";
import { Action } from "../../utils/interfaces/redux";
import { SET_LOCATION } from "../actions/location";

const userReducer = (state = {}, { type, data }: Action<Coordenadas>) => {
    switch (type) {
        case SET_LOCATION: {
            return data;
        }
        default: {
            return state;
        }
    }
};

export default userReducer;
