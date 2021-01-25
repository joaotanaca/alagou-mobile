import AsyncStorage from "@react-native-async-storage/async-storage";
import { Action } from "../../utils/interfaces/redux";
import { UserI } from "../../utils/interfaces/user";
import { LOGIN, LOGOFF } from "../actions/user";

const userReducer = (state = null, { type, data }: Action<UserI>) => {
    switch (type) {
        case LOGIN: {
            AsyncStorage.setItem("USER", JSON.stringify(data));
            return data;
        }
        case LOGOFF: {
            AsyncStorage.removeItem("USER");
            return null;
        }
        default: {
            return state;
        }
    }
};

export default userReducer;
