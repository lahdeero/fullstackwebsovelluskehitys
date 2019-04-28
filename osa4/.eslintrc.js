module.exports = {
  "env": {
      "es6": true,
    "node": true,
    "jest": true
  },
  "parser": "babel-eslint",
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 8
  },
  "rules": {
      "indent": [
          "error",
          2
      ],
      "quotes": [
          "error",
          "single"
      ],
      "semi": [
          "error",
          "never"
      ],
      "eqeqeq": "error",
      "no-trailing-spaces": "error",
      "object-curly-spacing": [
      "error", "always"
      ],
      "arrow-spacing": [
      "error", { "before": true, "after": true }
      ],
      "linebreak-style": 0, 
      "no-console": 0
  },
  "globals": {
    "test": true,
    "expect": true,
    "describe": true
  }
};
