module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: 
  [
    [
      'babel-plugin-root-import',
      {
        paths: [
          {
            rootPathSuffix: 'app',
            rootPathPrefix: '~',
          },
          {
            rootPathSuffix: 'storybook',
            rootPathPrefix: '#',
          },
        ],
      },
    ],
  ],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
};
