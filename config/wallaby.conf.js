const wallabyWebpack = require('wallaby-webpack');

module.exports = function (wallaby) {

  const webpackConfig = require('./webpack.wallaby.js')({ env: 'test' });
  const webpackPostprocessor = wallabyWebpack({
    entryPatterns: [
      'config/spec-bundle.js',
      'src/**/*.spec.js'
    ],
    ...webpackConfig,
  });

  return {
    files: [
      { pattern: 'config/spec-bundle.js', load: false },
      { pattern: 'config/karma-require.js', load: false },

      { pattern: 'src/**/*.ts', load: false },
      { pattern: 'src/**/*.json', load: false },
      { pattern: 'src/**/*.scss', load: false },
      { pattern: 'src/**/*.css', load: false },
      { pattern: 'src/**/*.html', load: false },

      /** Test scripts should be ignored in files section */
      { pattern: 'src/**/*.spec.ts', ignore: true },
      /**
       * If .d.ts files doesn't ignoring, build will be broken with error:
       * "Can't resolve all parameters for ...: (?)."
       */
      { pattern: 'src/**/*.d.ts', ignore: true },
    ],

    tests: [
      { pattern: 'src/**/*.spec.ts', load: false },
    ],

    testFramework: 'jasmine',

    // May be it need to refactor to use Chrome browser
    // env: {
    //   runner: require('phantomjs-prebuilt').path,
    //   params: { runner: '--web-security=false' }
    // },

    postprocessor: webpackPostprocessor,

    setup: function () {
      window.__moduleBundler.loadTests();
    },

    debug: true,
  };
};
