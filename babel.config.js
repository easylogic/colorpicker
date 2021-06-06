module.exports = function(api) {
  api.cache(true);

  // set presets
  const presets = [
    [
      '@babel/preset-env',
      {},
    ],
  ];

  // set plugins
  const plugins = [
    [
      '@babel/plugin-transform-runtime',
      {},
    ],
  ];

  return {
    presets,
    plugins,
  };
};
