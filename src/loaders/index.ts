import express from 'express';

import Rabbitmq from '../queue/Rabbitmq';
import expressLoader from './express';
import '../database';

export default async ({
  expressApp,
}: {
  expressApp: express.Application;
}): Promise<void> => {
  await Rabbitmq.createConnection();
  console.log('Rabbitmq initialized');
  await expressLoader({ app: expressApp });
  console.log('Express initialized');
};
