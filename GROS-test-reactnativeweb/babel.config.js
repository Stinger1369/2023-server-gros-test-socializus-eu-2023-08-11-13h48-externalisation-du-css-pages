module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', '@babel/preset-env'],
     plugins: ['@babel/plugin-proposal-class-properties',
     'react-native-reanimated/plugin']
  };
};
