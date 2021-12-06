import express from 'express';
import { startDatabase } from '../database';
import expressLoader from './express';
import Rabbitmq from './Rabbitmq';


export default async ({
  expressApp,
}: {
  expressApp: express.Application;
}): Promise<void> => {
  await startDatabase();
  await Rabbitmq.createRabbitDefaultUsage();
  await expressLoader({ app: expressApp });
};
