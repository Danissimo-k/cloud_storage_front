import {NextPage} from "next";
import {checkAuth} from "@/utils/checkAuth";
import styles from './styles.module.scss'
import * as Api from '@/api'
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {FileList} from "@/components/FileList/FileList";
import React from "react";
import {Files} from "@/components/Files/Files";



const Page: NextPage = async ({req, res}) => {
    const cookieStore = cookies();
    const _token = cookieStore.get('_token')?.value
    await checkAuth()

    const files = await Api.files.getAllFiles('other', _token)
    return (
        <main>
            <Files items={files} withActions />
        </main>
    )
}

export default Page