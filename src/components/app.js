import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { Provider } from '../prerender-data-provider';
import Header from './header';

// Code-splitting is automated for routes
import Home from '../routes/home';
import Blog from '../routes/blog';
import Photographs from '../routes/photographs';

export default class App extends Component {

	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render(props) {
		return (
			<Provider value={props}>
				<div id="app">
					<Header />
					<Router onChange={this.handleRoute}>
						<Home path="/" />
						<Blog path="/blog/" />
						<Photographs path="/photography/" />
					</Router>
				</div>
			</Provider>
		);
	}
}
