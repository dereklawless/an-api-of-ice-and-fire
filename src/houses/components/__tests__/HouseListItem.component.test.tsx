import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";

import { House } from '../../models/House.interface';
import { HouseListItem } from '../HouseListItem.component';

const mockHouse: House = require('../../services/__tests__/get-house-response-transformed.json');
const props = {
	house: mockHouse
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render((
		<Router>
			<HouseListItem { ...props } />
		</Router>
	), div);
  ReactDOM.unmountComponentAtNode(div);
});