export interface User {
    _id: string;
    fullName: string;
    email: string;
    role: string;
}

export interface LoginResponse {
    token: string;
    user: User;
}