import 'reflect-metadata';

import express from 'express';
import figlet from 'figlet';

import environment from './environment/environment';
import chalk from 'chalk'
import loaders from './loaders';

const PORT = environment?.PORT || 3333;

// TODO Ajustar URL do Rabbit

async function startServer() {
  const app = express();

  await loaders({ expressApp: app });

  app.listen(process.env.PORT, () => {
    console.log(`\n > Your server is ready on port ${PORT}`);
    console.log(chalk.green(figlet.textSync('Libraske-api', { font: 'Standard' })));
  });
}

startServer();
