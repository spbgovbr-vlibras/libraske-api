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
  console.log('\n > Rabbitmq initialized');
  await expressLoader({ app: expressApp });
  console.log('\n > Express initialized');
};
