export interface LoginUserI {
    email: string;
    password: string;
}

export interface SignupUserI extends UserI {
    password: string;
    confirmPassword: string;
}

export interface UserI {
    id?: string;
    name: string;
    email: string;
    phone: string;
}
