import React, { Component } from 'react';
import * as pino from 'pino';

import { ConfigurationContext } from '../../shared/ConfigurationContext';
import { House } from '../models/House.interface';
import { HouseListItem } from './HouseListItem.component';
import { HouseService } from '../services/HouseService';
import { Loading } from '../../shared/components/Loading.component';

export class HouseList extends Component {
	private _houseService!: HouseService;
	private _logger: pino.Logger = pino.default();

	static contextType = ConfigurationContext;

	state = {
		diedOutHousesFilter: false,
		houses: [],
		loading: false,
		page: 1,
	};

	componentDidMount() {
		this._houseService = new HouseService(this.context);
		this._fetchData();
	}

	render() {
		return (
			<section>
				{ this.state.loading && <Loading /> }
				<h1>Houses</h1>
				{ this._renderFilterOptions() }
				{	this._renderFilteredHouses() }

				<hr />
				<button onClick={ () => this._fetchData(this.state.page) }>
					Load more
				</button>
			</section>
		);
	};

	private _fetchData(page: number = 1): void {
		this.setState({ loading: true });

		const nextPage: number = (this.state.page || page) + 1;
		this._houseService.getHouses(page)
			.then((response: any) => this.setState({
				houses: this.state.houses.concat(response),
				loading: false,
				page: nextPage,
			}))
			.catch((error: Error) => this._logger.error('[HouseList._fetchData]:', error));
	}

	private _filterHouses(): void {
		this.setState({ diedOutHousesFilter: !this.state.diedOutHousesFilter });
	}

	private _renderFilterOptions() {
		const urlFragment: string = this.state.diedOutHousesFilter ? '#died-out' : '#all';
		return (
			<div>
				<strong>Showing:</strong>
				&nbsp;
				<a href={ urlFragment } onClick={ () => this._filterHouses() }>
					{ this.state.diedOutHousesFilter ? 'Died out' : 'All' }
				</a>
			</div>
		);
	}

	private _renderFilteredHouses() {
		return this.state.houses
				.filter((house: House) => (this.state.diedOutHousesFilter) ? house.diedOut : true)
				.map((house: House) => <HouseListItem key={ house.id } house={ house } />)	
	}
};

export default HouseList;