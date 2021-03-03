const StyleLoader = require('style-loader');
const CssLoader = require('css-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/client/index.js',
    mode: 'production',
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
                test: /\.css$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader']
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: "[name].css" }),
    ]
}