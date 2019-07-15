import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as pino from 'pino';

import { ConfigurationContext } from '../../shared/ConfigurationContext';
import { House } from '../models/House.interface';
import { HouseDiedOut } from './HouseDiedOut.component';
import { HouseService } from '../services/HouseService';
import { Loading } from '../../shared/components/Loading.component';

export class HouseDetails extends Component {
	private _houseService!: HouseService;
	private _logger: pino.Logger = pino.default();

	static contextType = ConfigurationContext;

	state = {
		loading: true,
		house: {} as House,
	};

	componentDidMount() {
		this._houseService = new HouseService(this.context);
		const { match } = this.props as any;
		this._fetchData(match.params.id);
	}

	componentDidUpdate(prevProps: any) {
		const { match } = this.props as any;
		if (match.url !== prevProps.match.url) {
			this._fetchData(match.params.id);
		}
	}

	render() {
		const house: House = this.state.house;
		return (
			<article>
				{ this.state.loading && <Loading /> }
				( <Link to='/houses'>Back</Link> )
				<h1>
					{ house.name }
					&nbsp;
					{ house.diedOut && <HouseDiedOut /> }
				</h1>
				<dl>
					<dt>Region</dt>
					<dd>{ house.region }</dd>
					<dt>Coat of arms</dt>
					<dd>{ house.coatOfArms || 'Unknown' }</dd>
					<dt>Heir</dt>
					<dd>{ house.heir ||'Unknown' }</dd>
					<dt>Overlord</dt>
					<dd>{ house.overlord ||'Unknown' }</dd>
					<dt>Ancestral weapons</dt>
					<dd>{ this._renderAncestralWeapons(house) }</dd>
					<dt>Words</dt>
					<dd>{ house.words ||'Unknown' }</dd>
					<dt>Sworn members</dt>
					<dd>{ this._renderSwornMembers(house) }</dd>
				</dl>
			</article>
		);
	}

	private _fetchData(id: string): void {
		this.setState({ loading: true });

		this._houseService.getHouse(id)
			.then((response: any) => this.setState({
				house: response,
				loading: false,
			}))
			.catch((error: Error) => this._logger.error('[HouseDetails._fetchData]:', error));
	}

	private _renderAncestralWeapons(house: House) {
		return (house.ancestralWeapons || []).map((weapon: string) => {
			return (
				<React.Fragment key={ weapon }>
					{ weapon }
					<br />
				</React.Fragment>
			)
		});
	}

	private _renderSwornMembers(house: House) {
		return (house.swornMembers || []).map((member: string) => {
			return (
				<React.Fragment key={ member }>
					{ member }
					<br />
				</React.Fragment>
			)
		});
	}
};

export default HouseDetails;