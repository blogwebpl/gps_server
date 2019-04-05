process.env.NODE_ENV = 'test';

module.exports = function(wallaby) {
	return {
		hints: {
			ignoreCoverage: /ignore coverage/
		},
		files: [
			'src/**/*.js', '!src/**/*.test.js'
		],
		tests: [
			'src/**/*.test.js'
		],
		compilers: {
			'src/**/*.js': wallaby.compilers.babel()
		},
		env: {
			type: 'node'
		},
		testFramework: 'jest',
		debug: true,
		workers: {
			recycle: true
		}
	};
};
