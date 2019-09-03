const { PreactCliMDCrawlerPlugin } = require('./src/crawler/plugin');

module.exports = (config) => {
	config.plugins.push(new PreactCliMDCrawlerPlugin());
	return config;
};
