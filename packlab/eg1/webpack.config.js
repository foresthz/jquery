module.exports = {
	entry: './entry',
	output: {
		filename: 'webpack_jquery.js'
	},
	module: {
		loaders: [
            { test: /src[\\\/]selector\.js$/, loader: 'amd-define-factory-patcher-loader' }

		]
	}
}