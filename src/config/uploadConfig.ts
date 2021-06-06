import crypto from 'crypto';
import { Request } from 'express';
import multer from 'multer';
import path from 'path';

interface ITypeFolder {
  folder: 'img' | 'song';
  request?: Request;
}

interface IStorage {
  directory: string;
  storage: multer.StorageEngine;
}

export const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp'); // put in .env

export default function storage({ folder, request }: ITypeFolder): IStorage {
  let destination = path.resolve(tmpFolder, folder);

  if (folder === 'song') {
    destination = request?.destination || destination;
  }

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
