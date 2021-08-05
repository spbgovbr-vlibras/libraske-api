import { tmpFolder as staticDirectory } from '@config/uploadConfig';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import ValidationErrors from '../errors/ValidationErrors';
import StatusCodeName from '../utils/StatusCodeName';

import AppError from '../errors/AppError';
import routes from '../routes';
import chalk from 'chalk';

export default async ({ app }: { app: express.Application }) => {
  console.log("Configuring and starting express...");

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
      }

      return response
        .status(500)
        .json({ status: 'error', message: 'Internal server error' });
    },
  );

  app.use('/info', express.static(path.resolve(staticDirectory, 'song')));
  app.use('/libraske', routes);

  console.log(chalk.green(`Express started!`));
  // Return the express app
  return app;
};
