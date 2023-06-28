import { Injectable } from '@nestjs/common';
import type { File, resData } from "./public.type";

@Injectable()
export class UploadService{
  constructor(){}
  // 单文件
  uploadFile(file: File): resData{
    return {
      code: 200,
      data: file,
      msg: "success",
    };
  }

  // 多文件 -- 共用唯一 fieldName
  uploadFiles(files: File[]): resData{
    return {
      code: 200,
      data: files,
      msg: "success",
    };
  }

  // 多文件 -- 使用已知的不同的 fieldName
  uploadFilesWithFields(files: File[]): resData{
    return {
      code: 200,
      data: files,
      msg: "success",
    };
  }

  // 多文件 -- 使用未知的 fieldName
  uploadAnyFiles(files: File[]): resData{
    return {
      code: 200,
      data: files,
      msg: "success",
    };
  }

}