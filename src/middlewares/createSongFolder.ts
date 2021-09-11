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
  const sonsgFolder = path.join(tmpFolder, "song");
  const idSong = fs.readdirSync(sonsgFolder).filter(folderPath => fs.lstatSync(path.join(sonsgFolder, folderPath)).isDirectory()).length;
  const idSongAsString = `${idSong}`;
  const destination = path.resolve(tmpFolder, 'song', idSongAsString);

  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  request.idSong = idSongAsString;
  request.destination = destination;
  next();
}
