module.exports = {
  '**/*.{ts,tsx}': ['tsc', 'eslint --cache --fix'],
  '**/*.{js,jsx}': ['eslint --cache --fix'],
  '**/*.vue': ['eslint --cache --fix'],
  '**/*.{css,less,scss}': ['stylelint --cache --fix'],
}
