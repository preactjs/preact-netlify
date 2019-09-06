import { h } from 'preact';
import { Link } from 'preact-router';
import { useState, useEffect } from 'preact/hooks';
import style from './style';

const photographs = (props) => {
	const [dataResponse, setDataResponse] = useState({});
	useEffect(async () => {
		setDataResponse(await(await fetch('/source-fs.json')).json());
	}, []);
	let photographs = [];
	if (dataResponse.nodes && dataResponse.nodes[1] && dataResponse.nodes[1].edges) {
		photographs = dataResponse.nodes[1].edges;
	}
	return (
		<div class={style.pageBlogs}>
			<h1 class={style.pageTitle}>Photographs</h1>
			{photographs.map(blog => (
				<Link href={`/blog/${blog.id}`}>
					<article>
						<h2>{blog.details.title}</h2>
						<div>
							{
								(blog.details.tags.substr(1, blog.details.tags.length - 2).split(',') || []).map(tag => <span class={style.tag}>{tag}</span>)
							}
						</div>
						<p class={style.preview}>
							{blog.preview}
						</p>
					</article>
				</Link>
			))}
		</div>
	);
};

export default photographs;
