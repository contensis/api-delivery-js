var webpack = require("webpack");
var path = require('path');
var rootDir = path.resolve(__dirname);


module.exports = {	

    devtool: 'source-map',

	entry: {
        'zengenti.contensis-client': './src/index.ts',
		'zengenti.contensis-client.spec': './src/index.spec.ts'
    },

    output: {
        path: __dirname + "/bundle-test",
        filename: "[name].js",
        sourceMapFilename: "[file].map",
        publicPath: "/bundle-test/",

        library: ['Zengenti', 'Contensis']
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
        loaders: [

        ]
    },

	resolve: {
        extensions: ['.ts']
    }
};