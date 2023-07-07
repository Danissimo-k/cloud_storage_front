'use client'
import React, {FC} from 'react';
import styles from './FileActions.module.scss'
import {Button, Popconfirm} from "antd";
import {logout} from "@/api/auth";

interface FileActionsProps {
    onClickRemove: VoidFunction;
    onClickShare: VoidFunction;
    isActive: boolean;
    selectedIds: string[];
}

export const FileActions: FC<FileActionsProps> = ({
                                                      onClickRemove,
                                                      onClickShare,
                                                      isActive,
                                                      selectedIds
                                                  }) => {
    return (
        <div className={styles.root}>
            <Button onClick={onClickShare} disabled={!isActive}>
                {selectedIds.length > 1 ? 'Загрузить архив' : 'Загрузить файл'}
            </Button>
            <Popconfirm
                title={"Удалить файл(ы)?"}
                description={'Все файлы будут перемещены в корзину'}
                okText={'Да'}
                cancelText={'Нет'}
                disabled={!isActive}
                onConfirm={onClickRemove}
                >
                <Button disabled={!isActive} type="primary" danger>
                    Удалить
                </Button>
            </Popconfirm>
        </div>
    );
};

