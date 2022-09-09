module.exports = {
	globDirectory: '_site/',
	globPatterns: [
		'**/*.{html,css,ico,xml,woff,woff2,png,jpeg,svg}'
	],
	swDest: '_site/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};