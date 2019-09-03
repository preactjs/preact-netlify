const { writeFileSync } = require('fs');
const { join } = require('path');
const { generateFileList } = require('./index');

class PreactCliMDCrawlerPlugin {
	constructor(options = {}) {
		this._options = options;
	}
	apply(compiler) {
		compiler.hooks.emit.tapAsync('PreactCliMDCrawlerPlugin', (compilation, callback) => {
			const files = generateFileList(this._options.src);
			writeFileSync(join(__dirname, '..', 'assets', this._options.fileName || 'source-fs.json'), JSON.stringify(files));
			callback();
		});
	}
}

module.exports = {
	PreactCliMDCrawlerPlugin
};
