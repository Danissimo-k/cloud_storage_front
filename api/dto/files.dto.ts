import {User} from "@/api/dto/auth.dto";

export interface FileItem {
    filename: string;
    originalName: string;
    size: number;
    mimeType: string;
    user: User;
    deletedAt: string | null;
    id: string
}