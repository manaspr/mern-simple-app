import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest", // Use latest ECMAScript version
      globals: globals.browser, // Include browser globals
      parserOptions: {
        ecmaFeatures: { jsx: true }, // Enable JSX
        sourceType: "module", // Set ES Modules
      },
    },
    settings: { react: { version: "detect" } }, // Automatically detect React version
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules, // Recommended JS rules
      ...react.configs.recommended.rules, // Recommended React rules
      ...react.configs["jsx-runtime"].rules, // JSX runtime rules
      ...reactHooks.configs.recommended.rules, // React hooks rules
      "react/prop-types": "off", // Disable PropTypes rule (good for TypeScript)
      "react/jsx-no-target-blank": "off", // Allow target="_blank" without restrictions
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
];
