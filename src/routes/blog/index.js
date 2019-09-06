import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import style from './style';

const blogs = (props) => {
	const [dataResponse, setDataResponse] = useState({});
	useEffect(async () => {
		setDataResponse(await(await fetch('/source-fs.json')).json());
	}, []);
	let blogs = [];
	if (dataResponse.nodes && dataResponse.nodes[0] && dataResponse.nodes[0].edges) {
		blogs = dataResponse.nodes[0].edges;
	}
	return (
		<div class={style.pageBlogs}>
			<h1 class={style.pageTitle}>My Blogs</h1>
			{blogs.map(blog => (
				<article>
					<h2>{blog.details.title}</h2>
					<div>
						{
							((blog.details.tags||'').split(',') || []).map(tag => <span class={style.tag}>{tag}</span>)
						}
					</div>
					<p class={style.preview}>
						{blog.preview}
					</p>
				</article>
			))}
		</div>
	);
};

export default blogs;
