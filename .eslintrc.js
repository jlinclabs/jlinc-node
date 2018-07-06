module.exports = {
  "env": {
    "browser": false,
    "es6": true,
    "mocha": true,
  },
  "globals": {
    "expect": true,
    "console": true,
    "process": true,
  },
  "parserOptions": {
    "ecmaVersion": 2017,
  },
  "plugins": [
  ],
  "rules": {
    "indent": ["error", 2, {
      "ObjectExpression": 1,
      "VariableDeclarator": 0,
    }],
    "linebreak-style": ["error", "unix"],
    "quotes": "off",
    "semi": ["error", "always"],
    "strict": [2, "global"],
    "no-console": "error",
    "no-unused-vars": 0,
    "space-before-function-paren": "off",
    "object-curly-spacing": "off",
    "comma-dangle": "off",
    "space-before-blocks": "off",
    "curly": "off",
    "prefer-reflect": "off",
    "padded-blocks": "off",
    "keyword-spacing": "off",
    "max-nested-callbacks": "off",
    "no-multi-spaces": "off",
    "key-spacing": "off",
    "no-use-before-define": "off",
    "no-nested-ternary": "off",
    "operator-linebreak": "off",
    "no-unused-expressions": "off",
    "no-bitwise": 2,
    "eqeqeq": 2,
    "wrap-iife": [ 2, "any" ],
    "new-cap": 2,
    "no-caller": 2,
    "no-undef": 0,
    "no-debugger": 2,
    "dot-notation": 0,
    "no-sequences": "error",
    "comma-dangle": ["error", "only-multiline"],
    "one-var": ["error", "never"],
  }
};
