import { createReducer, MetaReducer, on } from "@ngrx/store";
import { environment } from "../../../../environments/environment";
import { countryActions } from "./country.actions";
import { countryInitialState, CountryState } from "./country.state";

export const reducers = createReducer(
	countryInitialState,
	on(countryActions.FETCH_CAPITAL_SUCCESS, (state, action) => ({
		...state,
		name: action.payload.name,
		capital: action.payload.capital
	})),
	on(countryActions.FETCH_CAPITAL_FAILURE, (state, action) => ({
		...state,
		error: action.payload.error.msg
	})),
	on(countryActions.FETCH_CAPITAL_FAILURE, (state, action) => ({
		...state,
		error: action.payload.error.msg
	})),
	on(countryActions.FETCH_MORE_DETAILS_SUCCESS, (state, action) => ({
		...state,
		currency: action.payload.currency,
		population: action.payload.population
	}))
)


export const metaReducers: MetaReducer<CountryState>[] = !environment.production ? [] : [];
