import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadFileModule } from './uploadFile/uploadFile.module';

@Module({
  imports: [UploadFileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
