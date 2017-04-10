const path = require('path');

module.exports = {
    //entry: './client/app.js',
    entry: './client/index.js',
    devtool: 'eval',
    output: {
        path: path.join(__dirname, './public'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {presets: ['react', 'es2015']}
            },
            {
                test: /\.json$/,      //This is to load json as how we load js files using import. Refer Search.js
                loader: 'json-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]

    },
    resolve: {
        extensions: ['.js']
    }
};
