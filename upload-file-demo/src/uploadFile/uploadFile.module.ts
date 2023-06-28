import { Module } from "@nestjs/common";
import { UploadFileController } from "./uploadFile.controller";
import { UploadService } from "./uploadFile.service";

@Module({
  imports: [],
  controllers: [UploadFileController],
  providers: [UploadService],
})
export class UploadFileModule{
  
}