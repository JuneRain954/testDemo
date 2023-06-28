import { Controller ,Inject, Post, Body, UseInterceptors, UploadedFile, UploadedFiles } from "@nestjs/common";
import { FileInterceptor, FilesInterceptor, FileFieldsInterceptor, AnyFilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './uploadFile.service';
import { fileStorage } from './storage';
import type { File, resData } from "./public.type";

const UPLOAD_PATH = "uploads";
const SINGLE_FILE = "single-file";
const FILE_WITH_ONE_FIELD_NAME = "one-field";
const FILE_FIELDS = {
  ONE: "file-fields-one",
  TWO: "file-fields-two",
};

@Controller("/uploadFile")
export class UploadFileController{
  @Inject(UploadService)
  private service: UploadService;
  constructor(){}

  // 单文件
  @Post("/file")
  // @UseInterceptors(FileInterceptor(SINGLE_FILE, {dest: UPLOAD_PATH}))
  @UseInterceptors(FileInterceptor(SINGLE_FILE, { storage: fileStorage }))
  uploadFile(@UploadedFile() file: File, @Body() body: any): resData{
    console.log("\n [uploadFile] ==> ", body, file);
    return this.service.uploadFile(file);
  }

  // 多文件 -- 共用唯一 fieldName
  @Post("/files")
  // @UseInterceptors(FilesInterceptor(FILE_WITH_ONE_FIELD_NAME, 3, {dest: UPLOAD_PATH}))
  @UseInterceptors(FilesInterceptor(FILE_WITH_ONE_FIELD_NAME, 3, {storage: fileStorage}))
  uploadFiles(@UploadedFiles() files: File[], @Body() body: any): resData{
    console.log("\n[uploadFiles] ===> ", body, files);
    return this.service.uploadFiles(files);
  }

  // 多文件 -- 使用多个已知的 fieldName
  @Post("/files-fields")
  @UseInterceptors(FileFieldsInterceptor([
    {name: FILE_FIELDS.ONE, maxCount: 2},
    {name: FILE_FIELDS.TWO, maxCount: 3},
  ], {
    // dest: UPLOAD_PATH,
    storage: fileStorage,
  }))
  uploadFilesWithFields(@UploadedFiles() files: File[], @Body() body: any): resData{
    console.log("\n[uploadFilesWithFields] ===> ", body, files);
    return this.service.uploadFilesWithFields(files);
  }

  // 多文件 -- 使用未知的 fieldName
  @Post("/any-files")
  // @UseInterceptors(AnyFilesInterceptor({dest: UPLOAD_PATH}))
  @UseInterceptors(AnyFilesInterceptor({storage: fileStorage}))
  uploadAnyFiles(@UploadedFiles() files: File[], @Body() body: any): resData{
    console.log("\n[uploadAnyFiles] ===> ", body, files);
    return this.service.uploadAnyFiles(files);
  }
}