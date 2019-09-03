const { writeFileSync } = require('fs');
const { join } = require('path');
const { generateFileList } = require('./index');

class PreactCliMDCrawlerPlugin {
	apply(compiler) {
		compiler.hooks.emit.tapAsync('PreactCliMDCrawlerPlugin', (compilation, callback) => {
			const files = generateFileList();
			writeFileSync(join(__dirname, '..', 'assets', 'source-fs.json'), JSON.stringify(files));
			callback();
		});
	}
}

module.exports = {
	PreactCliMDCrawlerPlugin
};
