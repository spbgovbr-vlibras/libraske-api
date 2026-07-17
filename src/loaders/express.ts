import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import multer from 'multer';
import path from 'path';
import ValidationErrors from '../errors/ValidationErrors';
import StatusCodeName from '../utils/StatusCodeName';
import env from '../environment/environment';

import AppError from '../errors/AppError';
import routes from '../routes';
import { SONG_STORAGE } from '@config/applicationFolders';
import { isConnectionAlive } from '../database';
import cliColors from '../utils/cliColors';
import stripControlCharacters from '../middlewares/stripControlCharacters';

export default async ({ app }: { app: express.Application }) => {
  const staticDirectory = env.ROOT_STORAGE;

  console.log("Configuring and starting express...");

  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });
  app.enable('trust proxy');

  const isDev = process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'test';

  if (!isDev && !env.CORS_ALLOWED_ORIGIN) {
    throw new Error('CORS_ALLOWED_ORIGIN must be set outside of dev/test environments.');
  }

  app.use(cors({ origin: isDev ? '*' : env.CORS_ALLOWED_ORIGIN }));
  app.use(helmet());
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(stripControlCharacters);

  const staticOptions = {
    setHeaders: (res: any, reqPath: string) => {
      if (reqPath.endsWith('.svg')) {
        res.setHeader('Content-Disposition', 'attachment');
      }
      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader('Content-Security-Policy', "default-src 'none'; img-src 'self' data:; media-src 'self';");
      res.setHeader('X-Content-Type-Options', 'nosniff');
    }
  };

  app.use(express.static(path.resolve(SONG_STORAGE), staticOptions));
  app.use('/info', express.static(path.resolve(staticDirectory), staticOptions));

  app.use('/libraske', routes);
  app.use('/health-check', async (req, res) => {
    res.status(200).json({
      isDatabaseConnectionAlive: await isConnectionAlive()
    });
  })

  app.use(
    (err: Error, request: Request, response: Response, _: NextFunction) => {
      console.error(err);

      if (err instanceof AppError) {

        const status = StatusCodeName(err.statusCode);

        return response
          .status(err.statusCode)
          .json({ status, message: err.message });
      } else if (err instanceof ValidationErrors) {
        return response
          .status(err.statusCode)
          .json({ status: 'ValidationError', errors: err.errors });
      } else if (err instanceof multer.MulterError) {
        return response
          .status(400)
          .json({ status: 'MulterError', message: err.message });
      }

      return response
        .status(500)
        .json({ status: 'error', message: 'Internal server error' });
    },
  );
  console.log(cliColors.green(`Express started!`));

  return app;
};
