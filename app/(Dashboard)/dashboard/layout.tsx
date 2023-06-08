'use client'
import {usePathname, useRouter} from "next/navigation";
import styles from "@/app/(Dashboard)/dashboard/styles.module.scss";
import {UploadButton} from "@/components/UploadButton/UploadButton";
import {Menu} from "antd";
import {DeleteOutlined, FileOutlined} from "@ant-design/icons";
import {FileList} from "@/components/FileList/FileList";
import React from "react";

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    const router = useRouter()
    const selectedMenu = usePathname()
    return (
        <>
            <div className={styles.sidebar}>
                <UploadButton />
                <Menu
                    className={styles.menu}
                    mode={'inline'}
                    selectedKeys={[selectedMenu]}
                    items={[
                        {
                            key: '/dashboard',
                            icon: <FileOutlined />,
                            label: 'Файлы',
                            onClick: () => router.push('/dashboard')
                        },
                        {
                            key: '/dashboard/trash',
                            icon: <DeleteOutlined />,
                            label: 'Корзина',
                            onClick: () => router.push('/dashboard/trash')
                        },

                    ]}
                />
            </div>
            <div className='container'>
                {children}
            </div>
        </>
    );
}