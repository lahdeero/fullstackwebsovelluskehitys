module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": ["standard", "standard-react"],
    "parser": "babel-eslint",
    "parserOptions" : { "sourceType": "module" },
    "rules": {
      "eqeqeq": "error",
      "no-trailing-spaces": "error",
      "no-multi-spaces": 0,
      "indent": [
          "error", 2, { "SwitchCase": 1 }
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
      "no-console": 0
    }
};
