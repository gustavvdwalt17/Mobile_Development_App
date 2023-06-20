module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    
      plugins: [
    [
      'react-native-reanimated/plugin',
    //  {
    //     globals: ['__detect'],
    //   },
    ],
  ]
    
  };
};
// module.exports = {presets: ['@babel/preset-env']}
// module.exports = function(api) {
//   api.cache(true);
  
//   const presets = ['babel-preset-expo'];
//   const plugins = [
//     [
//       'react-native-reanimated/plugin',
//       // {
//       //   globals: ['__detect'],
//       // },
//     ],
//     ['dotenv-import', { moduleSource: 'react-native-dotenv' }],
//   ];
  
//   return {
//     presets,
//     plugins,
//   };
// };