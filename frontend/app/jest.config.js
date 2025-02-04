module.exports = {
    roots: [
        '<rootDir>/src'
    ],
    modulePaths: [],
    transform: {
        '^.+\\.[jt]sx?$': 'babel-jest'
    },
    verbose: true,
    testMatch: ["**/**/**/*.test.tsx"],
    testEnvironment: "jsdom",
    testEnvironmentOptions: {
        browsers: [
        "chrome",
        "firefox",
        "safari"
        ]
    },
    setupFiles: ['<rootDir>/setup.jest.js'],
    resetMocks: true,
    transformIgnorePatterns: ['/node_modules/(?!@react-dnd|react-dnd|dnd-core)'],
  };