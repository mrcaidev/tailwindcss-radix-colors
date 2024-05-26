export default {
  "*.{js,ts}": [
    "eslint --fix --cache --cache-location ./node_modules/.cache/eslint/.eslintcache",
    "prettier --write --cache",
  ],
  "*.{json,md}": "prettier --write --cache",
};
