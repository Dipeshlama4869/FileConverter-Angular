export interface ImportLog {
    Id: number;
    Filename: string;
    Status: string;
    IsUploaded: boolean;
    IsConverted: boolean;
    IsSuccess: boolean;
    ErrorMessage?: string;
    ErrorTrace?: string;
    FilePath: string;
    ConvertedFilePath?: string;
    UploadedAt: Date;
}