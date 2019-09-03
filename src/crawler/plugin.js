const { generateFileList } = require('./index');

class PreactCliMDCrawlerPlugin {
	constructor(options = {}) {
		this._options = options;
	}
	apply(compiler) {
		compiler.hooks.emit.tapAsync('PreactCliMDCrawlerPlugin', (compilation, callback) => {
			const files = JSON.stringify(generateFileList(this._options.src));
			compilation.assets[this._options.fileName  || 'source-fs.json'] = {
				source: () => files,
				size: () => files.length
			};
			callback();
		});
	}
}

module.exports = {
	PreactCliMDCrawlerPlugin
};
