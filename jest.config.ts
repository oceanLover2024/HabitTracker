import type { Config } from "jest";
import nextJest from "next/jest.js";
const createJestConfig = nextJest({
  //nextJest(...) 是 Next.js 官方提供的工廠函式（factory function）會回傳一個函式，這個函式可協助產生完整的 Jest 設定
  dir: "./",
});
const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom", //模擬瀏覽器環境（測試 React 時用）
  moduleNameMapper: {
    "^@/components/(.*)$": "<rootDir>/components/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], //在所有測試前先執行初始化（例如載入 jest-dom）
  transform: { "^.+\\.tsx?$": "ts-jest" },
};
export default createJestConfig(config);
