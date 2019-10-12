import { h } from 'preact';
import { Link } from 'preact-router';
import { usePrerenderData } from '@preact/prerender-data-provider';
import Markdown from 'markdown-to-jsx';
import style from './style';

const blogs = (props) => {
	const [data, isLoading] = usePrerenderData(props);
	if (isLoading) {
		return (<h1>Loading</h1>);
	}

	if (data && data.data && data.data.content) {
		return (<Markdown>{ data.data.content }</Markdown>);
	}

	return (<h1>Blog</h1>);
};

export default blogs;
