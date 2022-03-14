const path = require('path');

module.exports = {
  env: {
    browser: true,
    jest: true,
  },
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier', 'prettier/react'],
  plugins: ['prettier', 'chai-friendly', 'json'],
  globals: {
    log: false,
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
      },
    ],
    'react/jsx-curly-brace-presence': 0,
    'jsx-a11y/label-has-for': 0,
    'jsx-a11y/anchor-is-valid': ['error', {
      'components': ['Link'],
      'specialLink': ['to', 'hrefLeft', 'hrefRight'],
      'aspects': ['noHref', 'invalidHref', 'preferButton']
    }],
    "import/no-extraneous-dependencies": [
      "error",
      {
        "devDependencies": ["**/*.test.jsx", "**/*.test.js", "test/**"]
      }
    ],
    'no-unused-expressions': 0,
    'react/jsx-no-literals': [1, {'noStrings': false}],
    'chai-friendly/no-unused-expressions': 2,
  },
  settings: {
    'import/resolver': {
      node: {
        paths: [path.resolve(__dirname, 'src')],
      },
    },
  },
};