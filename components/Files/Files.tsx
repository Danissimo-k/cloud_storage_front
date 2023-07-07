'use client'
import React, {FC, useState} from 'react';
import {FileItem} from "@/api/dto/files.dto";
import {FileList, FileSelectType} from "@/components/FileList/FileList";
import * as Api from '@/api'
import {Empty} from "antd";
import {FileActions} from "@/components/FileActions/FileActions";


interface FilesProps {
    items: FileItem[];
    withActions?: boolean;
}

export const Files: FC<FilesProps> = ({items, withActions}) => {
    const [files, setFiles] = useState(items || []);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const onFileSelect = (id: string, type: FileSelectType) => {
        if (type=== 'select') {
            setSelectedIds((prev) => [...prev, id])
        } else {
            setSelectedIds((prev) => prev.filter((_id) => _id !== id));
        }
    }

    const onClickRemove = async () => {
        setFiles((prev) => prev.filter(file => !selectedIds.includes(file.id)))
        setSelectedIds([]);
        await Api.files.remove(selectedIds)
    }

    const onShare = async () => {
        await Api.files.downloads(selectedIds)
    }

    return (
        <div>
            {
                files.length ? (
                    <>
                        {withActions && (
                            <FileActions
                                selectedIds={selectedIds}
                                onClickRemove={onClickRemove}
                                onClickShare={onShare}
                                isActive={selectedIds.length > 0}
                            />
                        )}
                        <FileList items={files} onFileSelect={onFileSelect} />
                    </>
                )
                    : (
                        <Empty className='empty-block' description='Список файлов пуст' />
                    )

            }
        </div>
    );
};

