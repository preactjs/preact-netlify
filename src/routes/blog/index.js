import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import style from './style';

const blogs = (props) => {
	const [blogs, setBlogs] = useState({});
	useEffect(async () => {
		setBlogs(await(await fetch('/source-fs.json')).json());
	}, []);
	console.log({blogs});
	return (
		<div>
			hi
		</div>
	);
};

export default blogs;
