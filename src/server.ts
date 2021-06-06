import 'reflect-metadata';
import 'express-async-errors';

import express from 'express';

import env from './environment/environment';
import loaders from './loaders';

const PORT = env?.PORT || 3333;

async function startServer() {
  const app = express();

  await loaders({ expressApp: app });

  app.listen(process.env.PORT, () => {
    console.log(`Your server is ready on port ${PORT}!`);
  });
}

startServer();
