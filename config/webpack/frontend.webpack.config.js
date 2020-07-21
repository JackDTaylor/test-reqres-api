const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	"plugins[]": [
		new UglifyJsPlugin({
			cache: true,
			parallel: true,
			sourceMap: true,
			uglifyOptions: {
				ecma: 6,
				compress: true,
				mangle: {
					keep_fnames: true,
				},
			}

		}),
	]
};