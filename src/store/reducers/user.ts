import { UserAction } from "../../utils/interfaces/user";
import { LOGIN, LOGOFF } from "../actions/user";

const userReducer = (
    state = {
        id: "600160e52094833f10245e1f",
        name: "Joao Tanaca",
        email: "jtanacar@gmail.com",
        phone: "13991887363",
    },
    { type, user }: UserAction,
) => {
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
