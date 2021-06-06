/**
 * yarn setup-create-song --name "Batom de Cereja" --user_id {rodar o código create user primeiro} --description "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." --singers "Israel & Rodolffo" --subtitle "path/random" --thumbnail "path/random"
 */

import minimist from 'minimist';
import { createConnection, getConnection } from 'typeorm';

import Song from '../models/Song';

let { name, user_id, description, singers, thumbnail, subtitle } = minimist(
  process.argv.slice(2),
);

name = name.toLowerCase();
user_id = user_id.toLowerCase();
description = description.toLowerCase();
singers = singers.toLowerCase();
subtitle = subtitle.toLowerCase();
thumbnail = thumbnail.toLowerCase();

async function createUser() {
  if (
    !name ||
    !user_id ||
    !description ||
    !singers ||
    !thumbnail ||
    !subtitle
  ) {
    return process.on('exit', () =>
      console.log(
        `\nIt was not possible to create the user, check the fields: \n
        user_id: ${user_id}, \n
        name: ${name} \n
        description: ${description}, \n
        singers: ${singers} \n
        thumbnail: ${thumbnail} \n
        subtitle: ${subtitle} \n
        `,
      ),
    );
  }

  const query = {
    name,
    user_id,
    description,
    singers,
    thumbnail,
    subtitle,
  };

  return createConnection().then(() =>
    getConnection()
      .createQueryBuilder()
      .insert()
      .into(Song)
      .values(query)
      .execute()
      .then(() =>
        process.on('exit', code =>
          console.log(`\nsong was created successfully with code ${code}`),
        ),
      ),
  );
}

createUser();
