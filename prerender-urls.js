const { generateFileList } = require('./src/crawler');
const { join } = require('path');

const [blogs, images] = generateFileList(join(__dirname, 'content')).nodes;

module.exports = () => {
	const pages = [
		{ url: '/' }
	];

	// adding all blog posts page
	pages.push({
		url: '/blog/',
		data: blogs
	});

	pages.push({
		url: '/photography/',
		data: images
	});

	console.log({pages});

	return pages;
};
