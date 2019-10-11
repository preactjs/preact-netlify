import { h } from 'preact';
import { Link } from 'preact-router';
import { usePrerenderData } from '@preact/prerender-data-provider';
import style from './style';

const photographs = (props) => {
	const [data, isLoading] = usePrerenderData(props);

	if (isLoading) {
		return (<h1>Loading</h1>);
	}
	if (data && data.data) {
		const { data: { edges: photographs } } = data;
		return (
			<div class={style.pageBlogs}>
				<h1 class={style.pageTitle}>Photographs</h1>
				{photographs.map(photograph =>
					(<div>
						<img loading="lazy" class={style.photo} src={photograph.details.photo} />
						<caption class={style.caption}>{photograph.details.title}</caption>
					</div>)
				)}
			</div>
		);
	}
	return (<h1>Error</h1>);
};

export default photographs;
