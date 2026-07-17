import { NextFunction, Request, Response } from 'express';
import authRouter from '../routes/authetication.routes';
import { closeTestDatabase, initializeTestDatabase } from './helpers/testDatabase';

jest.setTimeout(20000);

function getFakeLoginHandler() {
  const layer = (authRouter as any).stack.find(
    (l: any) => l.route?.path === '/fake-login' && l.route.methods.post,
  );

  if (!layer) {
    throw new Error('POST /fake-login route not found on authRouter');
  }

  return layer.route.stack[0].handle as (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => Promise<void>;
}

describe('Authentication routes - fake-login guard', () => {
  const originalNodeEnv = process.env.NODE_ENV;

  beforeAll(async () => {
    await initializeTestDatabase();
  });

  afterAll(async () => {
    process.env.NODE_ENV = originalNodeEnv;
    await closeTestDatabase();
  });

  it('should reject POST /fake-login with 404 when NODE_ENV is not "dev"', async () => {
    process.env.NODE_ENV = 'production';

    const handler = getFakeLoginHandler();

    await expect(
      handler({} as Request, {} as Response, jest.fn()),
    ).rejects.toMatchObject({ statusCode: 404 });
  });
});
