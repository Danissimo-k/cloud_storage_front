import axios from '@/core/axios'
import {LoginFormDto, LoginResponseDto, RegisterFormDto, RegisterResponseDto, User} from "@/api/dto/auth.dto";
import {destroyCookie, parseCookies} from "nookies";
export const login = async (values: LoginFormDto): Promise<LoginResponseDto> => {
    const { data } = await axios.post('auth/login', values);
    return data as LoginResponseDto
}

export const register = async (values: RegisterFormDto): Promise<RegisterResponseDto> => {
    const { data } = await axios.post('auth/register', values);
    return data as LoginResponseDto
}

export const getCurrentUser = async (token: string) : Promise<User> => {
    const { data } = await axios.get('/users/me', {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })
    return data as User
}

export const logout = async () => {
    destroyCookie(null, '_token', {path: '/'})
}