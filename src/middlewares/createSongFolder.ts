import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp'); // put in .env

export default function createSongFolder(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const idSong = uuidv4();
  const destination = path.resolve(tmpFolder, 'song', idSong);

  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  request.idSong = idSong;
  request.destination = destination;
  next();
}
