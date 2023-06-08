'use client'
import React, {useState} from 'react';
import {Button, notification, Upload, UploadFile} from "antd";
import {CloudUploadOutlined} from "@ant-design/icons";
import * as Api from '@/api'
import styles from './UploadButton.module.scss'

export const UploadButton = () => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);


    const onUploadSuccess = async (options) => {

        try {
            const file = await Api.files.uploadFile(options)
            console.log(file)
            setFileList([])
            window.location.reload()
        } catch (e) {
            notification.error({
                message: "Ошибка!",
                description: "Не удалось загрузить файл",
                duration: 2
            })
        }

    }

    return (
        <Upload
            customRequest={onUploadSuccess}
            fileList={fileList}
            onChange={({fileList}) => setFileList(fileList)}
            className={styles.upload}
        >
            <Button type={'primary'} icon={<CloudUploadOutlined />} size={'large'}>
                Загрузить файл
            </Button>
        </Upload>
    );
};

