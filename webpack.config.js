const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'pagelock.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.js.inline$/,
                use: 'raw-loader'
            },
            {
                test: /\.html$/,
                use: 'raw-loader'
            }
        ]
    },
    resolve: {
        alias: {
            handlebars: 'handlebars/dist/handlebars.js'
        }
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                context: 'public',
                from: '**/*'
            }
        ])
    ]
};