import * as fs from 'fs';
import { join } from 'path';

function getDetails(data) {
	const matadata = data.match(/---(.*\n)*---/)[0];
	return matadata.match(/(.*):(.*)/g).reduce((obj, detail) => {
		const value = (detail.substr(detail.indexOf(':') + 2));
		const key = (detail.substr(0, detail.indexOf(':') ));
		obj[key] = value;
		return obj;
	}, {});
}

function getMarkdownDetails(file) {
	const data = fs.readFileSync(file, 'utf-8');
	return getDetails(data);
}

function getFolders(source) {
	const isDirectory = source => fs.lstatSync(source).isDirectory();
	const isFile = source => !fs.lstatSync(source).isDirectory();
	const getAllListings = source =>
		fs.readdirSync(source).map(name => join(source, name));
	let allContent = getAllListings(source);
	const edges = allContent.filter(isFile).map(file => ({
		id: file.substr(file.lastIndexOf('/') + 1),
		path: file,
		details: getMarkdownDetails(file)
	}));
	const nodes= allContent.filter(isDirectory).map(dir => getFolders(dir));
	const result = {
		id: source.substr(source.lastIndexOf('/')+1)
	};
	if (nodes.length) {
		result.nodes = nodes;
	}
	if (edges.length) {
		result.edges = edges;
	}
	return result;
}

function generateFileList() {
	return getFolders(join(__dirname,'..','..','content'));
}

module.exports = {
	generateFileList
};
