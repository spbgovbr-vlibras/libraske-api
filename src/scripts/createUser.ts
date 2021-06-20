// yarn setup-create-user --name "admintest" --email "admin@test.com" --cpf "01234567899"

import minimist from 'minimist';
import { createConnection, getConnection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import User from '../models/User';

const args = minimist(process.argv.slice(2), {
  string: ['cpf'],
});

let { name, email } = args;
const { cpf } = args;

name = name.toLowerCase();
email = email.toLowerCase();

async function createUser() {
  if (!name || !email || !cpf) {
    return process.on('exit', () =>
      console.log(
        `\nIt was not possible to create the user, check the fields: \n name: ${name}, \n email: ${email}, \n cpf: ${cpf}`,
      ),
    );
  }

  const query = {
    name,
    email,
    cpf,
    refreshToken: uuidv4(),
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
