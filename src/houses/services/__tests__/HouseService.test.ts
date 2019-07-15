import * as axios from 'axios';
import * as MockAdapter from 'axios-mock-adapter';

import { Configuration } from '../../../shared/models/Configuration.interface';
import { House } from '../../models/House.interface';
import { HouseService } from '../HouseService';

const mockAdapter: any = new MockAdapter.default(axios.default);
const mockConfiguration: Configuration = {
	apiBaseUrl: 'api_base_url',
	apiPageSize: 5,
}
const mockGetHouseResponse: any = require('./get-house-response.json');
const mockGetHouseResponseTransformed: House = require('./get-house-response-transformed.json');
const mockGetHousesResponse: any = require('./get-houses-response.json');
const mockGetHousesResponseTransformed: House[] = require('./get-houses-response-transformed.json');

afterEach(() => {
	mockAdapter.reset();
});

describe('HouseService', () => {
	const houseService: HouseService = new HouseService(mockConfiguration);

	it('is exported', () => {
		expect(HouseService).toBeDefined();
	})

	describe('getHouse()', () => {
		it('given a house ID, returns the expected result', async () => {
			mockAdapter
				.onGet()
				.reply(200, mockGetHouseResponse);

			expect(await houseService.getHouse('1')).toEqual(mockGetHouseResponseTransformed);
		});

		it('given an invalid house ID, returns the expected 404 error', async () => {
			mockAdapter
				.onGet()
				.reply(404);

			try {
				await houseService.getHouse('0');
			} catch (error) {
				expect.assertions(2);
				expect(error).toBeInstanceOf(Error);
				expect(error.message).toBe('Request failed with status code 404');
			}
		});

		it('given an unhandled error, returns it', async () => {
			mockAdapter
				.onGet()
				.reply(500);

			try {
				await houseService.getHouse('1');
			} catch (error) {
				expect.assertions(1);
				expect(error).toBeInstanceOf(Error);
			}
		});
	});

	describe('getHouses()', () => {
		it('given a request, returns a collection of houses', async () => {
			mockAdapter
				.onGet()
				.reply(200, mockGetHousesResponse);

			expect(await houseService.getHouses()).toEqual(mockGetHousesResponseTransformed);
		});

		it('given an unhandled error, returns it', async () => {
			mockAdapter
				.onGet()
				.reply(500);

			try {
				await houseService.getHouses();
			} catch (error) {
				expect.assertions(1);
				expect(error).toBeInstanceOf(Error);
			}
		});
	});
});