declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
    amqp: {
      connection: '';
      channel: '';
    };
  }
}
