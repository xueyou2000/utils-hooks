module.exports = {
    setupFilesAfterEnv: ["react-testing-library/cleanup-after-each"],
    preset: "ts-jest",
    testMatch: ["<rootDir>/tests/**/*.(spec|test).ts?(x)"]
};
