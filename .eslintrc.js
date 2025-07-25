module.exports = {
  env: {
    browser: true
  },
  extends: ["plugin:react/recommended", "airbnb", "plugin:storybook/recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2021,
    sourceType: "module"
  },
  plugins: ["react"],
  rules: {
    "linebreak-style": 0,
    quotes: [2, "double", "avoid-escape"],
    "comma-dangle": ["error", "never"],
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }]
  }
};
