//var webpack = require("webpack");
//var plugins = [];

//do we minify it all
/*
if(process.env.NODE_ENV === 'production'){
	console.log("creating production build");
	plugins.push(new webpack.optimize.UglifyJsPlugin({
		mangle: {
			keep_fnames: true
		},
		compress: {
			keep_fnames: true,
			warnings: false,
		}
	}));
	plugins.push(new webpack.DefinePlugin({
		'process.env.NODE_ENV': JSON.stringify('production')
	}));
}
*/
/**
 * @author Dylan Vorster
 */
/*
module.exports = [
	//for building the umd distribution
	{
		entry: './src/index.tsx',
		output: {
			filename: 'index.js',
			path: __dirname + '/dist',
			libraryTarget: 'umd',
			library: 'storm-react-diagrams'
		},
		externals: {
			react: {
				root: 'React',
				commonjs2: 'react',
				commonjs: 'react',
				amd: 'react'
			},
			'react-dom': {
				root: 'ReactDOM',
				commonjs2: 'react-dom',
				commonjs: 'react-dom',
				amd: 'react-dom'
			},
			"lodash": {
				commonjs: 'lodash',
				commonjs2: 'lodash',
				amd: '_',
				root: '_'
			}
		},
		plugins:plugins,
		module: {
			rules: [
				{
					enforce: 'pre',
					test: /\.js$/,
					loader: "source-map-loader"
				},
				{
					test: /\.tsx?$/,
					loader: 'awesome-typescript-loader'
				}
			]
		},
		resolve: {
			extensions: [".tsx", ".ts", ".js"]
		},
		devtool: process.env.NODE_ENV === 'production'?false:'eval-cheap-module-source-map'
	}
];
*/



var path = require("path");     //allows to resolve path of application

var DIST_DIR = path.resolve(__dirname, "dist");  

const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
//directory from which app is served
//copy everything which has been prepared for serving into the dist folder (created automatically)

var SRC_DIR = path.resolve(__dirname, "./src/");
//tells where to find the untranspiled source code

var config = {
    devtool: 'inline-source-map',
    entry: SRC_DIR + "/app/index.jsx",   //this is the root file (file which starts app)
    output: {
        path: DIST_DIR + "/app",
        filename: "./bundle.js",
        publicPath: "/app/"
        //important for webpack development server -> our public folder
        //in this case, have to tell the webpack folder what would be the place to look (where app lives)
    },

    node: {
        fs: 'empty'
    },

    module: {
        loaders: [
            //only one loader, babel
            {
                test: /\.js?/,  //which files should webpack have a look at regarding this loader
                include: SRC_DIR,  //which folders should you scan for such files
                exclude: [
                    /node_modules/,
                    '/app/server.js',
                ],
                loader: "babel-loader",
                query: {
                    plugins: ['transform-decorators-legacy' ],
                    presets: ["react", "es2015", "stage-2"]
                }
			},  {
                test: /\.css$/,
                loaders: ["style-loader", "css-loader"]
            },  {
                test: /\.ts?$/,
                loader: 'awesome-typescript-loader'
			}
		]
	},

	plugins: [
        new TsConfigPathsPlugin(/* { tsconfig, compiler } */),
    ],
};


module.exports = config;