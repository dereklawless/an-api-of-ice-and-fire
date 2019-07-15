import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";

import { AppRouter } from './shared/components/AppRouter.component';
import { Configuration } from './shared/models/Configuration.interface';
import { ConfigurationContext } from './shared/ConfigurationContext';

const configuration: Configuration = {
	apiBaseUrl: 'https://anapioficeandfire.com',
	apiPageSize: 5,
};

export class App extends Component {
	render() {
		return (
			<Router>
				<ConfigurationContext.Provider value={ configuration }>
					<AppRouter />
				</ConfigurationContext.Provider>
			</Router>
		);
	}
}

export default App;