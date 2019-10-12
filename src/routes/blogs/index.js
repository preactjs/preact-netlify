import { h } from 'preact';
import { Link } from 'preact-router';
import { usePrerenderData } from '@preact/prerender-data-provider';
import style from './style';

const blogs = (props) => {
	const [data, isLoading] = usePrerenderData(props);
	if (isLoading) {
		return (<h1>Loading</h1>);
	}
	if (data && data.data) {
		const { data: blogs } = data;
		return (
			<div class={style.pageBlogs}>
				<h1 class={style.pageTitle}>My Blogs</h1>
				{blogs.edges.map(blog => (
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
	}

	return (<h1>Error</h1>);
};

export default blogs;
