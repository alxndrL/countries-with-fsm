import {
	createFeatureSelector,
	createSelector
} from '@ngrx/store';
import { CountryState, countryStateFeatureKey } from "./country.state";


export const getCountryState = createFeatureSelector<CountryState>(
	countryStateFeatureKey
);

export const getCountryName = createSelector(getCountryState, (state: CountryState) =>
	state.name
);


