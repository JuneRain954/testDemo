import * as multer from "multer";
import * as fs from 'fs';
import * as path from 'path';

const fileStorage = multer.diskStorage({
  // 文件保存目录
  destination(req, file, callback) {
    const filePath = path.join(process.cwd(), "uploads");
    try {
      fs.mkdirSync(filePath);
    } catch (error) {
      
    }
    callback(null, filePath);
  },
  // 文件名
  filename(req, file, callback) {
    const fileName = `${Date.now()}-${Math.round(Math.random() * 1E9)}-${file.originalname}`;
    callback(null, fileName);
  },
});

export {
  fileStorage,
}