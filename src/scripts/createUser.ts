// yarn setup-create-user --name admintest --email admin@test.com

import minimist from 'minimist';
import { createConnection, getConnection } from 'typeorm';
import { uuid } from 'uuidv4';

import User from '../models/User';

let { name, email } = minimist(process.argv.slice(2));

name = name.toLowerCase();
email = email.toLowerCase();

async function createUser() {
  if (!name || !email) {
    return process.on('exit', () =>
      console.log(
        `\nIt was not possible to create the user, check the fields: \n name: ${name}, \n email: ${email}`,
      ),
    );
  }

  const query = {
    name,
    email,
    refreshToken: uuid(),
  };

  return createConnection().then(() =>
    getConnection()
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(query)
      .onConflict('("email") DO UPDATE SET name = EXCLUDED."name"')
      .execute()
      .then(() =>
        process.on('exit', code =>
          console.log(`\nuser was created successfully with code ${code}`),
        ),
      ),
  );
}

createUser();
