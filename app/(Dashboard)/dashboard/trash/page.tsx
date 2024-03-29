import {NextPage} from "next";
import {checkAuth} from "@/utils/checkAuth";
import * as Api from '@/api'
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {Files} from "@/components/Files/Files";



const Page: NextPage = async ({req, res}) => {
    const cookieStore = cookies();
    const _token = cookieStore.get('_token')?.value
    if (!_token) {
        redirect('/auth')
    }

    await checkAuth()
    const files = await Api.files.getAllFiles('trash', _token)
    return (
        <main>
            <Files items={files} />
        </main>
    )
}

export default Page