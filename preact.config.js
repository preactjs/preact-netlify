const { PreactCliMDCrawlerPlugin } = require('./src/crawler/plugin');
const netlifyPlugin = require('preact-cli-plugin-netlify');
const { join } = require('path');

module.exports = (config) => {
	config.plugins.push(new PreactCliMDCrawlerPlugin({
		src: join(__dirname, 'content')
	}));
	netlifyPlugin(config);
	return config;
};
