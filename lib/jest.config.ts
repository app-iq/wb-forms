export default {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    modulePathIgnorePatterns: ['src/__tests__/Utils'],
};