'use client'
import React, {FC} from 'react';
import styles from './ProfileInfo.module.scss'
import {Button} from "antd";
import {User} from "@/api/dto/auth.dto";
import * as Api from '@/api'
import {useRouter, usePathname} from "next/navigation";


interface ProfileInfoProps {
    userData: User;

}
export const ProfileInfo: FC<ProfileInfoProps> = ({userData}) => {
    const router = useRouter()

    const logoutHandler = async () => {
        if (window.confirm("Вы действительно хотите выйти?")) {
            await Api.auth.logout()
            router.push('/')
        }
    }

    return (
        <div className={styles.root}>
            <h1>Мой профиль</h1>
            <br/>
            <p>
                ID: <b>{userData.id}</b>
            </p>
            <p>
                Полное имя: <b>{userData.fullName}</b>
            </p>
            <p>
                E-Mail: <b>{userData.email}</b>
            </p>
            <br/>
            <Button onClick={logoutHandler} type={'primary'} danger>
                Выйти
            </Button>
        </div>
    );
};

