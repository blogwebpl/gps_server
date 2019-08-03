export default (app) => {
	/* ignore coverage */
//	if (process.env.NODE_ENV === 'development') {
	app.use((req, res, next) => {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATH, DELETE');
		res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, X-Requested-With,content-type, Authorization, x-auth');
		res.setHeader('Access-Control-Expose-Headers', 'x-auth');
		res.setHeader('Access-Control-Allow-Credentials', true);
		next();
	});
//	}
};
