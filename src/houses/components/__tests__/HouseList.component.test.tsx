import React from 'react';
import ReactDOM from 'react-dom';

import { HouseList } from '../HouseList.component';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<HouseList />, div);
  ReactDOM.unmountComponentAtNode(div);
});