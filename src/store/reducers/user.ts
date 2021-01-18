import { UserAction } from "../../utils/interfaces/user";
import { LOGIN, LOGOFF } from "../actions/user";

const userReducer = (state = null, { type, user }: UserAction) => {
    switch (type) {
        case LOGIN: {
            return user;
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
