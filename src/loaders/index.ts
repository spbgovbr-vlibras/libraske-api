import express from 'express';

import expressLoader from './express';
import Rabbitmq from './Rabbitmq';

import '../database';

export default async ({
  expressApp,
}: {
  expressApp: express.Application;
}): Promise<void> => {
  await Rabbitmq.createRabbitDefaultUsage();
  console.log('Rabbitmq initialized');
  await expressLoader({ app: expressApp });
  console.log('Express initialized');
};
