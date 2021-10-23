import { SONG_STORAGE } from '../config/applicationFolders';
import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';


export default function createSongFolder(
  request: Request,
  response: Response,
  next: NextFunction,
): void {

  if (!fs.existsSync(SONG_STORAGE)) {
    console.log(`Criando pasta: ${SONG_STORAGE}`);

    fs.mkdirSync(SONG_STORAGE, { recursive: true });
  }

  const idSong = fs.readdirSync(SONG_STORAGE).filter(folderPath => fs.lstatSync(path.join(SONG_STORAGE, folderPath)).isDirectory()).length;
  const idSongAsString = `${idSong}`;
  const destination = path.resolve(SONG_STORAGE, idSongAsString);

  if (!fs.existsSync(SONG_STORAGE)) {
    fs.mkdirSync(SONG_STORAGE, { recursive: true });
  }

  request.idSong = idSongAsString;
  request.destination = destination;
  next();
}
