'use client'
import styles from './FileCard.module.scss'
import {FC, memo} from "react";
import {getExtensionFromFileName} from "@/utils/getExtensionFromFileName";
import {isImage} from "@/utils/isImage";
import {getColorByExtension} from "@/utils/getColorByExtension";
import {FileTextOutlined} from "@ant-design/icons";

interface FileCardProps {
    filename: string,
    originalName: string,
}

const FileCardComponent: FC<FileCardProps> = ({
    originalName,
    filename
}) => {
    const ext = getExtensionFromFileName(filename)
    const imageUrl = ext && isImage ? "http://localhost:7777/uploads/" + filename : ""

    const color = getColorByExtension(ext)
    const classColor = styles[color]

    return (
        <div className={styles.root}>
            <div className={styles.icon}>
                <i className={classColor}>{ext}</i>
                {
                    isImage(ext) ?
                        <img className={styles.image} src={imageUrl} alt={'File'} />
                        :
                        <FileTextOutlined />

                }
            </div>
        </div>
    )
}
export const FileCard = memo(FileCardComponent)