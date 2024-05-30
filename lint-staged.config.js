export default {
  "*.{js,ts}": [
    "eslint --fix --cache --cache-location ./node_modules/.cache/eslint/.eslint-cache",
    "prettier --write --cache",
  ],
  "*.{json,md}": "prettier --write --cache",
};
