import 'reflect-metadata';
import 'express-async-errors';

import express from 'express';
import figlet from 'figlet';

import environment from './environment/environment';
import chalk from 'chalk'
import loaders from './loaders';

const PORT = environment?.PORT || 3333;

console.log("TYPEORM_HOST: " + environment.TYPEORM_HOST);
console.log("TYPEORM_PORT: " + environment.TYPEORM_PORT);
console.log("TYPEORM_USERNAME: " + environment.TYPEORM_USERNAME);
console.log("TYPEORM_PASSWORD: " + environment.TYPEORM_PASSWORD);
console.log("TYPEORM_HOST: " + environment.TYPEORM_HOST);
console.log("TYPEORM_SYNCHRONIZE: " + environment.TYPEORM_SYNCHRONIZE);
console.log("TYPEORM_LOGGING: " + environment.TYPEORM_LOGGING);
console.log("TYPEORM_ENTITIES: " + environment.TYPEORM_ENTITIES);
console.log("TYPEORM_MIGRATIONS: " + environment.TYPEORM_MIGRATIONS);
console.log("TYPEORM_MIGRATIONS_DIR: " + environment.TYPEORM_MIGRATIONS_DIR);


// TODO Ajustar URL do Rabbit
// TODO Checkar antes de fazer os seeds

async function startServer() {
  const app = express();

  await loaders({ expressApp: app });

  app.listen(process.env.PORT, () => {
    console.log(`\n > Your server is ready on port ${PORT}`);
    console.log(chalk.green(figlet.textSync('Libraske-api', 'Standard')));
  });
}

startServer();
