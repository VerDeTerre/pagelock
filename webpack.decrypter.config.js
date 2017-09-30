const path = require('path');

const webpack = require('webpack');

module.exports = {
    entry: './src/decrypter.js',
    output: {
        filename: 'decrypter.js.inline',
        path: path.resolve(__dirname, 'dist.decrypter')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader'
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            test: /\.js.inline$/
        })
    ]
};