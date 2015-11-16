module.exports = function(config) {
  config.set({
    basePath: './',

    frameworks: ['jasmine'],

    files: [
		'node_modules/operative/dist/operative.js',
		'node_modules/crossfilter2/crossfilter.js',
		'node_modules/d3/d3.min.js',
		'promisefilter.js',
		'test/*.js'
    ],

	browsers: [
		'Chrome'
		// 'ChromeCanary',
		// 'Firefox',
		// 'PhantomJS'
		// 'PhantomJS'
	],

	plugins: [
		'karma-jasmine',
		'karma-chrome-launcher',
		'karma-firefox-launcher',
		'karma-phantomjs-launcher'
	],

	reporters: ['dots'],

	captureTimeout: 60000
  });
};
