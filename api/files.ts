import {FileItem} from "@/api/dto/files.dto";
import axios from "@/core/axios";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export type FileType = 'other' | 'trash'

export const getAllFiles = async (type: FileType = 'other', token=''): Promise<FileItem[]> => {
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
        headers: { "Content-Type" : "multipart/form-data" },
        onProgress: (event: ProgressEvent) => {
            onProgress({ percent: (event.loaded / event.total) * 100 })
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