import { HttpException, HttpStatus } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';

export const multerConfig = {
  dest: 'uploads',
};

const uuidRandom = (file) => {
  const result = `${uuid()}${extname(file.originalname)}`;
  return result;
};

export const multerOptions = {
  fileFilter: (req: any, file: any, cb: any) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png||gif)$/)) {
      cb(null, true);
    } else {
      cb(
        new HttpException(
          `Unsuported file type ${extname(file.originalname)}`,
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },

  storage: diskStorage({
    destination: (req: any, file: any, cb: any) => {
      const uploadPath = multerConfig.dest;
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }
      cb(null, uploadPath);
    },
  }),
  
  filename: (req: any, file: any, cb: any) => {
    cb(null, uuidRandom(file));
  },
};
