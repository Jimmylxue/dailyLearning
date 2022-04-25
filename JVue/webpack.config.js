const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const TenserWebpackPlugin = require('terser-webpack-plugin')

module.exports = {
	entry: {
		jvue: './src/index.ts',
		'jvue.min': './src/index.ts',
	},
	output: {
		filename: '[name].js',
		library: 'jvue',
		libraryTarget: 'umd', //umd 是兼容的
		libraryExport: 'default',
	},

	resolve: {
		extensions: ['.js', '.json', '.ts'],
	},
	module: {
		rules: [
			{
				test: /\.ts/,
				use: {
					loader: 'babel-loader',
				},
			},
		],
	},

	mode: 'none',

	optimization: {
		minimize: true, // 是否开启压缩
		minimizer: [
			new TenserWebpackPlugin({
				test: /\.min\.js$/, // 只针对 .min.js进行压缩
			}),
		], // 压缩的方式  -- 使用 terser-webpack-plugin 压缩工具
	},

	plugins: [
		new htmlWebpackPlugin({
			template: './index.html',
			filename: 'index.html',
			scriptLoading: 'blocking',
		}),
	],

	devServer: {
		// contentBase: './dist', //这个一般都不会去改的
		port: 666, //服务器端口
		open: true, //自动打开浏览器的窗口
		// 配置代理 处理跨域
		// proxy: {
		// 	'/api': {
		// 		target: 'http://localhost:777',
		// 	},
		// },
	},
}
