import { tmpFolder as staticDirectory } from '@config/uploadConfig';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';

import AppError from '../errors/AppError';
import routes from '../routes';

export default async ({ app }: { app: express.Application }) => {
  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });
  app.enable('trust proxy');

  app.use(cors());
  app.use(helmet());
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/libraske', routes);
  app.use(express.static(path.resolve(staticDirectory, 'img')));
  app.use(express.static(path.resolve(staticDirectory, 'song')));
  app.use(express.static(path.resolve(staticDirectory, 'thumbnail')));

  app.use(
    (err: Error, request: Request, response: Response, _: NextFunction) => {

      if (err instanceof AppError) {
        return response
          .status(err.statusCode)
          .json({ status: 'error', message: err.message });
      }

      console.log(err);

      return response
        .status(500)
        .json({ status: 'error', message: 'Internal server error' });
    },
  );

  app.use('/info', express.static(path.resolve(staticDirectory, 'song')));
  app.use('/libraske', routes);

  // Return the express app
  return app;
};
