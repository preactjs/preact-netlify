const fs = require('fs');
const { join, sep } = require('path');
const parseMD = require('parse-md').default;

function getExtensionFromFilename(fileName) {
	return fileName.substr(fileName.lastIndexOf('.') + 1);
}

function getDetails(format, data) {
	const formatNormalised = format.toLowerCase();

	switch (formatNormalised) {
		case 'md':
		case 'markdown': {
			const { metadata } = parseMD(data);
			return metadata;
		}

		case 'json': {
			return JSON.parse(data);
		}

		default: {
			console.error('File format not recognised');
		}
	}
}

function getPreview(data) {
	const { content } = parseMD(data);
	let preview = content.replace(/---(.*(\r)?\n)*---/, '').replace(/\[.*\]\(.*\)/g, '').replace(/(\r)?\n/,'');
	preview = preview.substr(0, (preview.indexOf('\n') -1));
	return preview.length < 500? preview : preview.substr(0, 500);
}

function getFolders(source) {
	const isDirectory = source => fs.lstatSync(source).isDirectory();
	const isFile = source => !fs.lstatSync(source).isDirectory();
	const getAllListings = source =>
		fs.readdirSync(source).map(name => join(source, name));
	let allContent = getAllListings(source);
	const edges = allContent.filter(isFile).map(file => {
		const data = fs.readFileSync(file, 'utf-8');
		const id = file.substr(file.lastIndexOf(sep) + 1);
		const format = getExtensionFromFilename(id);
		return {
			id,
			format,
			path: file,
			details: getDetails(format, data),
			preview: getPreview(data)
		};
	});
	const nodes = allContent.filter(isDirectory).map(dir => getFolders(dir));
	const result = {
		id: source.substr(source.lastIndexOf(sep) + 1)
	};
	if (nodes.length) {
		result.nodes = nodes;
	}
	if (edges.length) {
		result.edges = edges;
	}
	return result;
}

function generateFileList(src) {
	return getFolders(src);
}

module.exports = {
	generateFileList
};
