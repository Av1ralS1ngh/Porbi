module.exports = function override(config, env) {
  // Disable source map warnings for node_modules
  config.ignoreWarnings = [
    {
      module: /node_modules/,
      message: /Failed to parse source map/,
    },
  ];

  // Disable source-map-loader for node_modules to prevent warnings
  config.module.rules.forEach((rule) => {
    if (rule.oneOf) {
      rule.oneOf.forEach((oneOfRule) => {
        if (
          oneOfRule.loader &&
          oneOfRule.loader.includes("source-map-loader")
        ) {
          oneOfRule.exclude = /node_modules/;
        }
      });
    }
  });

  return config;
};
