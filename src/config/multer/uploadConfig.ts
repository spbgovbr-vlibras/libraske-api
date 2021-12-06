import crypto from 'crypto';
import { Request } from 'express';
import multer from 'multer';
import path from 'path';
import { MulterFileValidatorFactory } from './validators';
import env from '../../environment/environment';

interface ITypeFolder {
  folder: string;
  request?: Request;
}

interface IStorage {
  directory: string;
  storage: multer.StorageEngine;
}

export const rootFolder = path.resolve(env.ROOT_STORAGE);
export const songsFolder = path.resolve(env.SONG_STORAGE);

export default function storage({ folder, request }: ITypeFolder): IStorage {
  let destination = path.resolve(folder);

  return {
    directory: destination,
    storage: multer.diskStorage({
      destination,
      filename(request, file, callback) {
        const fileValidator = MulterFileValidatorFactory(file.fieldname);
        const errors = [];

        errors.push({
          fieldName: file.fieldname,
          errors: fileValidator.validate(file)
        });

        request.multerErrors = errors;

        const fileHash = crypto.randomBytes(10).toString('hex');
        const fileName = `${fileHash}-${file.fieldname}.${file.originalname}`;

        return callback(null, fileName);
      }
    }),

  };
}
