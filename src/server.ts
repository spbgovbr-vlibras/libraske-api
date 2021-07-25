import 'reflect-metadata';
import 'express-async-errors';

import express from 'express';
import figlet from 'figlet';

import env from './environment/environment';
import chalk from 'chalk'
import loaders from './loaders';

const PORT = env?.PORT || 3333;

async function startServer() {
  const app = express();

  await loaders({ expressApp: app });

  app.listen(process.env.PORT, () => {
    console.log(`\n > Your server is ready on port ${PORT}`);
    console.log(chalk.green(figlet.textSync('Libraske-api', 'Standard')));
  });
}

startServer();
