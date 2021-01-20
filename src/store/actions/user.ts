import { Action } from "../../utils/interfaces/redux";
import { UserI } from "../../utils/interfaces/user";

export const LOGIN = "LOGIN";
export const LOGOFF = "LOGOFF";

export const login = (user: UserI): Action<UserI> => ({
    type: LOGIN,
    data: user,
});
export const logoff = () => ({ type: LOGOFF });
