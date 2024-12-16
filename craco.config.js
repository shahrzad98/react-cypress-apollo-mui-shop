const CracoSwcPlugin = require('craco-swc');

const isWindowsPlatform = true;

module.exports = {
  webpack: {
    configure: {
      module: {
        rules: [
          {
            test: /\.js$/,
            enforce: 'pre',
            use: ['source-map-loader']
          },
          {
            test: /\.m?js/,
            type: 'javascript/auto'
          },
          {
            test: /\.m?js/,
            resolve: {
              fullySpecified: false
            }
          }
        ]
      },
      ignoreWarnings: [/Failed to parse source map/]
    }
  },
  plugins: [
    !isWindowsPlatform && {
      plugin: CracoSwcPlugin,
      options: {
        swcLoaderOptions: {
          jsc: {
            externalHelpers: true,
            target: 'es2015',
            parser: {
              syntax: 'ecmascript',
              jsx: true,
              dynamicImport: true,
              exportDefaultFrom: true
            }
          }
        }
      }
    }
  ].filter(Boolean)
};
