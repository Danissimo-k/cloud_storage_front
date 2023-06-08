export interface LoginFormDto {
    email: string;
    password: string;
}

export interface LoginResponseDto {
    token: string;
}

export type RegisterFormDto = LoginFormDto & {fullName: string}
export type RegisterResponseDto  = LoginResponseDto

export interface User {
    fullName: string;
    email: string;
    password: string;
    id: string;
}