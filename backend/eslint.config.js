const js = require("@eslint/js");
const typescript = require("@typescript-eslint/eslint-plugin");
const typescriptParser = require("@typescript-eslint/parser");

module.exports = [
  {
    // Apply to all TypeScript files
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        project: "./tsconfig.json",
      },
      globals: {
        process: "readonly",
        console: "readonly",
        Buffer: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        module: "readonly",
        require: "readonly",
        exports: "readonly",
        global: "readonly",
        NodeJS: "readonly",
        Express: "readonly",
        PDFKit: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": typescript,
    },
    rules: {
      // Extend recommended configurations
      ...js.configs.recommended.rules,

      // TypeScript specific rules
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/no-var-requires": "off",

      // General rules - less strict
      "no-console": "off",
      "no-debugger": "error",
      "no-duplicate-imports": "error",
      "no-unused-vars": "off",
      "prefer-const": "warn",
      "no-var": "error",
      "object-shorthand": "warn",
      "prefer-arrow-callback": "off",
      "no-undef": "off", // TypeScript handles this
      "no-prototype-builtins": "off",
      "no-constant-binary-expression": "off",

      // Code style - less strict
      indent: "off", // Let Prettier handle this
      quotes: "off", // Allow both single and double quotes
      semi: ["error", "always"],
      "comma-dangle": "off", // Let Prettier handle this
      "object-curly-spacing": "off",
      "array-bracket-spacing": "off",
      "space-before-function-paren": "off",

      // Best practices - less strict
      eqeqeq: ["error", "always"],
      curly: "off", // Allow single-line if statements
      "brace-style": "off",
      camelcase: "off", // Allow snake_case for external APIs
      "new-cap": "off", // Express Router constructors
      "no-trailing-spaces": "off",
      "eol-last": "off",
      "max-len": "off", // No line length restrictions
    },
  },
  {
    // Specific rules for test files
    files: ["**/*.test.ts", "**/*.spec.ts", "**/tests/**/*.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "no-console": "off",
    },
  },
  {
    // Specific rules for configuration files
    files: ["**/*.config.js", "**/*.config.ts", "**/config/**/*.ts"],
    rules: {
      "@typescript-eslint/no-var-requires": "off",
      "no-console": "off",
    },
  },
  {
    // Ignore patterns
    ignores: [
      "node_modules/**",
      "dist/**",
      "build/**",
      "coverage/**",
      "*.js",
      "!eslint.config.js",
      "!vitest.config.ts",
    ],
  },
];