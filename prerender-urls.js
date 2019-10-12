const { generateFileList } = require('./src/crawler');
const { join } = require('path');
const fs = require('fs');

const [blogs, images] = generateFileList(join(__dirname, 'content')).nodes;
module.exports = () => {
	const pages = [
		{ url: '/' }
	];

	// adding blogs list posts page
	pages.push({
		url: '/blogs/',
		data: blogs
	});

	// adding all blog pages
	pages.push(...blogs.edges.map(blog => {
		const data = fs.readFileSync(join('content', 'blog', blog.id), 'utf-8').replace(/---(.*\n)*---/, '');
		return {
			url: `/blog/${blog.id}`,
			data: {
				title: blog.details.title,
				content: data
			}
		};
	}));


	pages.push({
		url: '/photography/',
		data: images
	});

	return pages;
};
