const path = require('path');

module.exports = {
    entry: './src/index.js',

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        loaders: [{test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
            {test: /\.css$/, loaders: ['style-loader', 'css-loader']},
            {test: /\.svg/, loaders: ['file-loader']},
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    'url-loader?limit=10000',
                    'img-loader'
                ]
            }


        ]
    }
};
