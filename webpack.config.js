const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const moduleName = 'airlines.search.widget';

// For DEV mode prepend "NODE_ENV=dev" before "webpack" command.
// terminal: NODE_ENV=dev webpack
const isDevMode = process.env.NODE_ENV === 'dev';

// Streaming compiled styles to the separate ".css" file.
const extractSass = new ExtractTextPlugin({
	filename: `${moduleName}.css`
});

let config = {
	// Root folder for Webpack.
	context: __dirname,
	
	// Entry file.
	entry: './src/main',

	// Watch for changes in file.
	watch: isDevMode,

	watchOptions: {
		// Do not watch for changes in "node_modules".
		ignored: /node_modules/,
		// Webpack will wait for 500ms before building bundles.
		aggregateTimeout: 500
	},

	output: {
		// Folder to store generated files.
		path: path.resolve(__dirname, 'dist'),
		// Path for loading assets.
		publicPath: '/dist/',
		// Output file name.
		filename: `${moduleName}.min.js`
	},

	resolve: {
		// Where to look for modules.
		modules: [
			'node_modules',
			path.resolve(__dirname, 'src')
		],
		extensions: ['.js', '.json', '.jsx', '.css']
	},

	module: {
		// List of loaders ("handlers") for different types of files.
		rules: [
			// Handling ".jsx" and ".js" files in "/src" folder with Babel-Loader.
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				// Converting JSX and ES6 to the common ES5 standart.
				options: {
					presets: ['es2015', 'react']
				},
				include: [
					path.resolve(__dirname, 'src')
				],
				// Do not parse these folders.
				exclude: [
					path.resolve(__dirname, 'node_modules')
				]
			},
			
			// Handling ".scss" files, converting them to ".css", appending vendor prefixes.
			{
				test: /\.scss$/,
				include: [
					path.resolve(__dirname, 'src/css')
				],
				use: extractSass.extract({
					use: [
						// Allows to import CSS through JavaScript.
						'css-loader',
						// Resolving relative URL in CSS code.
						'resolve-url-loader',
						// Compiles Sass to CSS.
						'sass-loader',
						// Using autoprefixe plugin.
						'postcss-loader'
					],
					fallback: 'style-loader',
					publicPath: path.resolve(__dirname, 'dist')
				})
			}
		]
	},

	plugins: [
		extractSass
	]
};

if (!isDevMode) {
	config.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				drop_console: false,
			}
		})
	);

	config.plugins.push(
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		})
	);
}

module.exports = config;