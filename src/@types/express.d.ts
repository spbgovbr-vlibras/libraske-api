declare namespace Express {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export interface Request {
    user: User;
    idSong: string;
    destination: string;
    multerErrors: MulterValidationError[];

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
      animation: [
        {
          filename: string;
        },
      ];
      song: [
        {
          filename: string;
        },
      ];
      trainingAnimation1: [
        {
          filename: string;
        },
      ];
      trainingAnimation2: [
        {
          filename: string;
        },
      ];
      trainingAnimation3: [
        {
          filename: string;
        },
      ];
      trainingAnimation4: [
        {
          filename: string;
        },
      ];
      trainingAnimation5: [
        {
          filename: string;
        },
      ];
    };
  }
}
