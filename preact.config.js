const netlifyPlugin = require('preact-cli-plugin-netlify');

module.exports = (config) => {
	netlifyPlugin(config);
	return config;
};
