import { Action } from "../../utils/interfaces/redux";
import { UserI } from "../../utils/interfaces/user";
import { LOGIN, LOGOFF } from "../actions/user";

const userReducer = (state = null, { type, data }: Action<UserI>) => {
    switch (type) {
        case LOGIN: {
            return data;
        }
        case LOGOFF: {
            return null;
        }
        default: {
            return state;
        }
    }
};

export default userReducer;
