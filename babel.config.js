module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ["transform-inline-environment-variables", {
        "include": [
          "REACT_APP_BACKEND_ENDPOINT"
        ]
      }]
    ]
  };
};
