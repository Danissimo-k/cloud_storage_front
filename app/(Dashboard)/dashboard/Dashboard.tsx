'use client'
import React, {FC, useEffect} from 'react';
import {Button, Menu} from "antd";
import styles from './styles.module.scss'
import {usePathname, useRouter} from "next/navigation";
import {DeleteOutlined, FileOutlined} from "@ant-design/icons";
import {UploadButton} from "@/components/UploadButton/UploadButton";
import {FileItem} from "@/api/dto/files.dto";
import {FileList} from "@/components/FileList/FileList";

interface DashboardProps {
    files: FileItem[],
}

export const Dashboard: FC<DashboardProps> = ({files}) => {
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
                <FileList items={files} onFileSelect={() => {}} />
            </div>
        </>
    );
};

