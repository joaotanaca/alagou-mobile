import { Coordenadas } from "../../utils/interfaces/location";
import { Action } from "../../utils/interfaces/redux";

export const SET_LOCATION = "SET_LOCATION";

export const setLocation = (location: Coordenadas): Action<Coordenadas> => ({
    type: SET_LOCATION,
    data: location,
});
