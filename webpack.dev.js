const StyleLoader = require('style-loader');
const CssLoader = require('css-loader');
const HtmlWebPackPlugin = require('html-webpack-plugin');

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
        libraryTarget: 'var',
        library: 'Client'
    },
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(svg|png|jpe?g|gif)$/i,
                loader: 'file-loader',
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
        })
    ]
}
