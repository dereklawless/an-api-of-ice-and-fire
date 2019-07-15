export interface House {
	ancestralWeapons: string[];
	coatOfArms: string;
	currentLord: string;
	diedOut: boolean;
	heir: string;
	id: string;
	name: string;
	overlord: string;
	region: string;
	swornMembers: string[];
	url: string;
	words: string;
}

export default House;