export interface ImageUploader {
  (params: { fileBuffer: Buffer; fileName: string; mimeType: string; bucket: string }): Promise<{ fileName: string; url: string }>;
}

export interface ImageDeleter {
  (params: { fileName: string; bucket: string }): Promise<void>;
}
