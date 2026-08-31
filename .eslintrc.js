module.exports = {
  env: {
    browser: true,
    es2022: true
  },
  extends: ["plugin:react/recommended", "airbnb", "plugin:storybook/recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    // Class fields (`foo = () => {}`) are ES2022; at 2021 the parser could not
    // read any of the *Title components at all.
    ecmaVersion: 2022,
    sourceType: "module"
  },
  plugins: ["react"],
  settings: {
    react: {
      version: "detect"
    }
  },
  rules: {
    "linebreak-style": 0,
    quotes: [2, "double", "avoid-escape"],
    "comma-dangle": ["error", "never"],
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }]
  },
  overrides: [
    {
      files: ["**/*.test.js", "**/*.test.jsx", "src/setupTests.js"],
      env: {
        jest: true
      },
      rules: {
        // Test files use single quotes and lean on devDependencies.
        quotes: 0,
        "import/no-extraneous-dependencies": 0,
        "react/jsx-props-no-spreading": 0
      }
    }
  ]
};
