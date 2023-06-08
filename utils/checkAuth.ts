import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import * as Api from "@/api";

export const checkAuth = async () => {
    const cookieStore = cookies();
    const _token = cookieStore.get('_token')?.value
    if (!_token) {
        redirect('/auth')
    }
    try {
        return await Api.auth.getCurrentUser(_token)
    } catch (e) {
        console.log(e.message)
    }
}
