import { createConnection, getConnection } from 'typeorm';

createConnection().then(() => getConnection());
