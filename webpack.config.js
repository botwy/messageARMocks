const webpack = require('webpack');
const fs = require('fs');

let nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {

    name: 'server',

    target: 'node',

    entry: './index',

    output: {
        path: __dirname + '/public',
        filename: 'server.js'
    },

    externals: nodeModules,

    watch: false,

    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: 'source-map',

    plugins: [
        new webpack.NoEmitOnErrorsPlugin()
    ] ,

    resolve: {
        modules: ['node_modules', 'server/'],
        extensions: ['.js']
    },

    resolveLoader: {
        modules: ['node_modules'],
        moduleExtensions: ['-loader'],
        extensions: ['.js']
    },

    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                presets: ['es2017'],
                plugins: ['transform-object-rest-spread']
            }
        }]
    }

};
