// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

//plugin that generates an HTML file to serve the webpack bundles
const HtmlWebpackPlugin = require("html-webpack-plugin");
//plugin that generates a web app manifest file that provides metadata about the application. 
const WebpackPwaManifest = require("webpack-pwa-manifest");
//Node.js module used to resolve file paths.
const path = require("path");
//plugin that generates a service worker file that will cache and serve the application's assets.
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = () => {
  return {
    //specifies the mode in which webpack should run
    mode: "development",
    entry: {
      //specifies the entry point(s) for the application
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    //specifies where the output files should be saved
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    // Specifies the plugins that will be used
    plugins: [
       // Generates an HTML file to serve the webpack bundles
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "JATE",
      }),
       // Generates a service worker file that will cache and serve the application's assets
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js",
      }),
      // Generates a web app manifest file that provides metadata about the application
      new WebpackPwaManifest({
        name: "Just Another Text Editor",
        fingerprints: false,
        inject: true,
        short_name: "JATE",
        description: "This is my PWA",
        background_color: "#ffffff",
        theme_color: "#007bff",
        start_url: "/",
        publicPath: "/",
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
        ],
      }),
    ],
    // Specifies how webpack should handle different types of files
    module: {
      rules: [
        // Handles CSS files using the "style-loader" and "css-loader" plugins
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        // Handles JavaScript files using the "babel-loader" plugin with some additional plugins
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            },
          },
        },
      ],
    },
  };
};
