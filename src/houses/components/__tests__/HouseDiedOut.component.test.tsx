import React from 'react';
import ReactDOM from 'react-dom';

import { HouseDiedOut } from '../HouseDiedOut.component';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<HouseDiedOut />, div);
  ReactDOM.unmountComponentAtNode(div);
});