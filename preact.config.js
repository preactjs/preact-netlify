const { PreactCliMDCrawlerPlugin } = require('./src/crawler/plugin');
const { join } = require('path');

module.exports = (config) => {
	config.plugins.push(new PreactCliMDCrawlerPlugin({
		src: join(__dirname, 'content')
	}));
	return config;
};
