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
  const songsFolder = path.join(tmpFolder, "song");

  if (!fs.existsSync(songsFolder)) {
    fs.mkdirSync(songsFolder, { recursive: true });
  }

  const idSong = fs.readdirSync(songsFolder).filter(folderPath => fs.lstatSync(path.join(songsFolder, folderPath)).isDirectory()).length;
  const idSongAsString = `${idSong}`;
  const destination = path.resolve(tmpFolder, 'song', idSongAsString);

  if (!fs.existsSync(songsFolder)) {
    fs.mkdirSync(songsFolder, { recursive: true });
  }

  request.idSong = idSongAsString;
  request.destination = destination;
  next();
}
