import { loadEnvironments } from '../src/environment/environment'

describe('Environment tests', () => {
  it('should return all environment variables', async () => {

    const environment = loadEnvironments('none');

    expect(environment).not.toBeNull();

  })
})