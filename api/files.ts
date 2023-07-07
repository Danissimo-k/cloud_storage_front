import {FileItem} from "@/api/dto/files.dto";
import axios from "@/core/axios";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export type FileType = 'other' | 'trash'

export const getAllFiles = async (type: FileType = 'other', token = ''): Promise<FileItem[]> => {
    try {
        const {data} = await axios.get('/files?type=' + type, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })
        return data as FileItem[]
    } catch (e) {
        console.log(e.message)

    }
}

export const remove = async (ids: string[]) => {
    return axios.delete("/files?ids=" + ids)
}

export const uploadFile = async (options) => {
    const {onSuccess, onError, file, onProgress} = options;

    const formData = new FormData()

    formData.append("file", file)

    const config = {
        headers: {"Content-Type": "multipart/form-data"},
        onProgress: (event: ProgressEvent) => {
            onProgress({percent: (event.loaded / event.total) * 100})
        }
    }

    try {
        const {data} = await axios.post('files', formData, config)

        onSuccess()

        return data
    } catch (error) {
        onError({err: error})

    }

}

export const downloads = async (fileIds: string[]) => {
    try {
        const response = await axios.get('files/download', {
            responseType: 'arraybuffer',
            params: {
                ids: fileIds.join(',')
            }
        })
        const contentDisposition = response.headers['content-disposition']
        const fileName = contentDisposition.slice(contentDisposition.indexOf('filename="') + 'filename="'.length , -1)
        const href = URL.createObjectURL(new Blob([response.data], {type: "octet/stream"}));
        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    } catch (error) {
        console.log(error)
    }
}