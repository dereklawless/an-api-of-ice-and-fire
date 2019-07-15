import React from 'react';
import { Link } from 'react-router-dom';

import { House } from '../models/House.interface';
import { HouseDiedOut } from './HouseDiedOut.component';

export const HouseListItem = (props: any) => {
	const house: House = props.house;

	return (
		<article>
			<h1>
				<Link to={`/houses/${ house.id }`}>{ house.name }</Link>
				&nbsp;
				{ house.diedOut && <HouseDiedOut /> }
			</h1>
			<dl>
				<dt>Region</dt>
				<dd>{ house.region }</dd>
				<dt>Coat of arms</dt>
				<dd>{ house.coatOfArms || 'Unknown' }</dd>
			</dl>
		</article>
	)
};

export default HouseListItem;