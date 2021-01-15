import { UserI } from "../../utils/interfaces/user";

export const LOGIN = "LOGIN";
export const LOGOFF = "LOGOFF";

export const login = (user: UserI) => ({ type: LOGIN, user });
export const logoff = () => ({ type: LOGOFF });
