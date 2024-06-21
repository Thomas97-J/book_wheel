module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "prefer-const": "off", // is never reassigned. Use 'const' instead 문구 제거
    "@typescript-eslint/no-explicit-any": "off", // Unexpected any. Specify a different type 문구 제거
    "@typescript-eslint/explicit-module-boundary-types": "off", // React, { ReactElement } from "react" 설정 안함
    "@typescript-eslint/no-unused-vars": "off", // 사용하지 않는 프로퍼티 경고 문구 제거
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};
