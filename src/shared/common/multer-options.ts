import { EnumImageFolders } from "@enums/image-folders.enum";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { diskStorage } from "multer";
import { v4 } from 'uuid';

export const uploadedImageConfig = (destination: EnumImageFolders) => ({
  storage: diskStorage({
    destination: `public/${destination}`,
    filename: (req, file, cb) =>
      cb(null, `${v4()}.${file.originalname.split('.').reverse()[0]}`)
  }),
  fileFilter: (req, file, cb) =>
    cb(null, ['image/jpg', 'image/png', 'image/jpeg'].includes(file.mimetype)),
  limits: {
    files: 1,
    fileSize: 1000000 // 1 MB
  }
} as MulterOptions);
