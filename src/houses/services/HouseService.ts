import * as axios from 'axios';
import * as pino from 'pino';

import { Configuration } from '../../shared/models/Configuration.interface';
import { House } from '../models/House.interface';

export class HouseService {
	private _logger: pino.Logger = pino.default();

	public constructor(private readonly _configuration: Configuration) {}

	public async getHouse(id: string): Promise<House> {
		try {
			const response = await axios.default.get(
				`${this._configuration.apiBaseUrl}/api/houses/${id}`
			);
			return {
				...response.data,
				id: HouseService._extractId(response.data.url),
			};
		} catch (error) {
			this._logger.error('[HouseService.getHouse]:', error);
			throw error;
		}
	}

	public async getHouses(page: number = 1, pageSize: number = this._configuration.apiPageSize || 10): Promise<House[]> {
		try {
			const response = await axios.default.get(
				`${this._configuration.apiBaseUrl}/api/houses?page=${page}&pageSize=${pageSize}`
			);
			return response.data.map((house: House) => {
				return {
					...house,
					id: HouseService._extractId(house.url),
				}
			});
		} catch (error) {
			this._logger.error('[HouseService.getHouses]:', error);
			return [];
		}
	}

	private static _extractId(url: string): string {
		return url.split('/').pop() || '';
	}
}

export default HouseService;