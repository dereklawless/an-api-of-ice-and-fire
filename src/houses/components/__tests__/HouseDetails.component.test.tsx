import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";

import { HouseDetails } from '../HouseDetails.component';

const props = {
	match: {
		params: {
			id: '1'
		}
	}
}

it('renders without crashing', () => {
	const div = document.createElement('div');
  ReactDOM.render((
		<Router>
			<HouseDetails { ...props } />
		</Router>
	), div);
  ReactDOM.unmountComponentAtNode(div);
});