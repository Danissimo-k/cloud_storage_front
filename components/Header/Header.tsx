'use client'
import React, {FC} from 'react';
import {Avatar, Button, Layout, Menu, Popover} from "antd";
import {CloudOutlined} from "@ant-design/icons";
import styles from './Header.module.scss'
import {useRouter, usePathname} from "next/navigation";
import * as Api from '@/api/index';

export const Header: FC = () => {
    const router = useRouter()
    const selectedMenu = usePathname()

    const onClickLogout = async () => {
        if (window.confirm("Вы действительно хотите выйти?")) {
            await Api.auth.logout()
            router.push('/')
        }
    }

    return (
        <Layout.Header className={styles.root}>
            <div className={styles.headerInner} >
                <div className={styles.headerLeft} >
                    <h2>
                        <CloudOutlined />
                        Cloud storage
                    </h2>
                <Menu
                    className={styles.topMenu}
                    theme={'dark'}
                    mode={'horizontal'}
                    defaultSelectedKeys={[selectedMenu]}
                    onSelect={({key}) => router.push(key)}
                    items={[
                        {key: '/dashboard', label: 'Главная'},
                        {key: '/dashboard/profile', label: 'Профиль'},
                    ]}
                />
                </div>
                <div className={styles.headerRight}>
                    <Popover
                        trigger={'click'}
                        content={
                            <Button onClick={onClickLogout} type='primary' danger>
                                Выйти
                            </Button>
                        }
                    >
                        <Avatar>A</Avatar>
                    </Popover>
                </div>
            </div>
        </Layout.Header>
    );
};

