module.exports = {
  preset: "ts-jest",
  testRegex: "test/.*.test.tsx?$",
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  setupFilesAfterEnv: ["./test/setup.ts"],
  moduleNameMapper: {
    "^renderer/(.*)": "<rootDir>/src/renderer/$1",
    "^main/(.*)": "<rootDir>/src/main/$1",
    "^test/(.*)": "<rootDir>/test/$1"
  }
};
