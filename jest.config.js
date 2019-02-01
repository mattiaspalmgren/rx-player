/* eslint-env node */

const coverageIsWanted = !!process.env.RXP_COVERAGE;

module.exports = {
  roots: ["<rootDir>/src"],
  preset: "ts-jest",
  testEnvironment: "jsdom",
  collectCoverage: coverageIsWanted,
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/index.ts",
    "!**/__tests__/**",
  ],
  globals: {
    __DEV__: true,
    "ts-jest": {
      tsConfig: {
        allowJs: true,
        target: "es2017",
        lib: ["es2017", "dom"],
        forceConsistentCasingInFileNames: true,
        skipLibCheck: false,
        noImplicitAny: true,
        strict: true,
        strictNullChecks: true,
        strictPropertyInitialization: true,
        noUnusedParameters: true,
        noUnusedLocals: true,
        types: ["rxjs", "node", "jest"],
        module: "commonjs",
        moduleResolution: "node",
        typeRoots: [
          "./src/typings",
          "./node_modules/@types",
        ],
      },
    },
  },
};