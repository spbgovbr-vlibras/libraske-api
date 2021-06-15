declare namespace Express {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export interface Request {
    user: {
      id: string;
    };
    idSong: string;
    destination: string;
    // song: {
    //   id: string;
    //   destination: string;
    // };
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
