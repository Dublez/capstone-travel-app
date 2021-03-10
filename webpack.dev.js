const StyleLoader = require('style-loader');
const CssLoader = require('css-loader');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    entry: './src/client/index.js',
    mode: 'development',
    devtool: 'source-map',
    stats: 'verbose',
    // devServer: {
    //     contentBase: ['./src/client/views','./src/client/styles']
    // },
    devServer: {
        contentBase: ['./dist']
    },
    output: {
        // publicPath: "/",
        // path: __dirname + '/dist',
        libraryTarget: 'var',
        library: 'Client'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(svg|png|jpe?g|gif)$/i,
                // loader: 'file-loader',
                loader: 'url-loader',
                options: {
                    name: '/media/[name].[ext]'
                }
            },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            // Do not allow removal of current webpack assets
            protectWebpackAssets: false
        }),
    ]
}
