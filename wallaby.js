process.env.NODE_ENV = 'test';

module.exports = function(wallaby) {
	return {
		hints: {
			ignoreCoverage: /ignore coverage/
		},
		files: [
			'src/*.js', 'src/**/*.js', '!src/**/*.test.js'
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
		testFramework: 'mocha',
		setup: (wallaby) => {
			const runningMocha = wallaby.testFramework;
			runningMocha.timeout(15000);
		},
		debug: true,
		workers: {
			recycle: true,
			initial: 1,
			regular: 1
		}
	};
};
