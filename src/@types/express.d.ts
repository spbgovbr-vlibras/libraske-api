declare namespace Express {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export interface Request {
    user: User;
    idSong: string;
    destination: string;
    // song: {
    //   id: string;
    //   destination: string;
    // };
    amqp: {
      connection: '';
      channel: '';
    };
    files: {
      thumbnail: [
        {
          filename: string;
        },
      ];
      subtitle: [
        {
          filename: string;
        },
      ];
    };
  }
}
