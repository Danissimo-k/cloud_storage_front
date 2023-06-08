"use client"
import {NextPage} from "next";
import Head from "next/head";
import {LoginForm} from "@/components/LoginForm/LoginForm";
import styles from './styles.module.scss'
import {Tabs} from "antd";
import {RegisterForm} from "@/components/RegisterForm/RegisterForm";

const Page: NextPage = () => {
    return (
        <>
        <main className={styles.mainWrapper}>
            <Tabs
                items={[
                    {
                        label: 'Войти',
                        key: '1',
                        children: <LoginForm />
                    },
                    {
                        label: 'Регистрация',
                        key: '2',
                        children: <RegisterForm />
                    },
                ]}
            />
        </main>
        </>
    )
}

export default Page