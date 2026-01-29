module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    bail: 1,
    verbose: true,
    testMatch: ['**/src/tests/**/*.test.ts'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    moduleNameMapper: {
        '^axios$': require.resolve('axios/dist/node/axios.cjs'),
        '^@services/(.*)$': '<rootDir>/src/services/$1',
        '^@middlewares/(.*)$': '<rootDir>/src/middlewares/$1',
        '^@config/(.*)$': '<rootDir>/src/config/$1',
        '^@models/(.*)$': '<rootDir>/src/models/$1'
    }
};