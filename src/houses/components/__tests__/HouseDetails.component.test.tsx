import React from 'react';
import ReactDOM from 'react-dom';

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
  ReactDOM.render(<HouseDetails { ...props } />, div);
  ReactDOM.unmountComponentAtNode(div);
});