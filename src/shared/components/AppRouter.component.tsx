import React from 'react';
import { Redirect, Route, Switch } from "react-router-dom";

import { HouseDetails } from '../../houses/components/HouseDetails.component';
import { HouseList } from '../../houses/components/HouseList.component';

export const AppRouter = () => {
	return (
		<Switch>
			<Redirect exact path='/' to='/houses' />
			<Route component={ HouseList } exact path='/houses' />
			<Route component={ HouseDetails } exact path='/houses/:id' />
		</Switch>
	);
}

export default AppRouter;