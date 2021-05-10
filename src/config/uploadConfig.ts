import crypto from 'crypto';
import multer from 'multer';
import path from 'path';

interface ITypeFolder {
  folder: 'img' | 'song';
}

interface IStorage {
  directory: string;
  storage: multer.StorageEngine;
}

export const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp'); // put in .env

export default function storage({ folder }: ITypeFolder): IStorage {
  const destination = path.resolve(tmpFolder, folder);
  return {
    directory: destination,

    storage: multer.diskStorage({
      destination,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const fileName = `${fileHash}-${file.originalname}`;

        return callback(null, fileName);
      },
    }),
  };
}
