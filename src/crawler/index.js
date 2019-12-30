const fs = require('fs');
const { join, sep } = require('path');

function parseMarkdownToObject(markdownString) {
	const markDown = markdownString.match(/---(.*(\r)?\n)*---/g);
	const metadata = markDown[0];

	const details = metadata.match(/(.*):(.*)/g).reduce((obj, detail) => {
		const value = detail.substr(detail.indexOf(':') + 2);
		const key = detail.substr(0, detail.indexOf(':'));
		obj[key] = value;
		return obj;
	}, {});

	return details;
}

function getExtensionFromFilename(fileName) {
	return fileName.substr(fileName.lastIndexOf('.') + 1);
}

function getDetails(format, data) {
	const formatNormalised = format.toLowerCase();

	switch (formatNormalised) {
		case 'md': {
			return parseMarkdownToObject(data);
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
	let preview = data.replace(/---(.*(\r)?\n)*---/, '').replace(/\[.*\]\(.*\)/g, '').replace(/(\r)?\n/,'');
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
			id: file.substr(file.lastIndexOf(sep) + 1),
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
