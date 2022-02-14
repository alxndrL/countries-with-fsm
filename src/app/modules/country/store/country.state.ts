export const countryStateFeatureKey = 'countryState';

export interface CountryState {
	name?: string;
	capital?: string;
	population?: string[];
	currency?: string
	error?: string
}

export const countryInitialState: CountryState = {
	name: undefined,
	capital: undefined,
	population: undefined,
	currency: undefined,
	error: undefined
}
