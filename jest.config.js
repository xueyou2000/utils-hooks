module.exports = {
    setupFilesAfterEnv: ["react-testing-library/cleanup-after-each"],
    preset: "ts-jest",
    transform: {
        "^.+\\.js$": "babel-jest",
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    testMatch: ["<rootDir>/tests/**/*.(spec|test).ts?(x)"],
    transformIgnorePatterns: ["<rootDir>/node_modules/(?!(utils-dom))"]
};
