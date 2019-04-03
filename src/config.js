export default {
	production: {
		MONGODB_URI: 'mongodb://localhost:27017/przewoznik',
		JWT_SECRET: 'tFE4fdckCpB4wuQxkdQAdv6NxHuqatm8',
		HTTPS: true,
		CA_PATH: '/etc/letsencrypt/live/blogweb.pl',
		CA_FILE: 'chain.pem',
		CERT_PATH: '/etc/letsencrypt/live/blogweb.pl',
		CERT_FILE: 'cert.pem',
		KEY_PATH: '/etc/letsencrypt/live/blogweb.pl',
		KEY_FILE: 'privkey.pem',
		PORT: 3000
	},
	development: {
		MONGODB_URI: 'mongodb://localhost:27017/przewoznikDev',
		JWT_SECRET: 'nFE4f3ckCaB4wuQskdQAdv6NxHuqatm8',
		HTTPS: false,
		PORT: 3001
	},
	test: {
		MONGODB_URI: 'mongodb://localhost:27017/przewoznikTest',
		JWT_SECRET: 'aFE4f3ckCaB4wu3skeQAdv6NxHuqatm8',
		HTTPS: false,
		PORT: 3002
	}
};
