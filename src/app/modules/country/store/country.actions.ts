import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from "@angular/common/http";

const  countryActionType = ' CountryActionType';

export const countryActions = {
	FETCH_CAPITAL: createAction(
		`${countryActionType}.FETCH_CAPITAL`,
		props<{ payload: any }>()
	),
	FETCH_CAPITAL_SUCCESS: createAction(
		`${countryActionType}.FETCH_CAPITAL_SUCCESS`,
		props<{ payload: any }>()
	),
	FETCH_CAPITAL_FAILURE: createAction(
		`${countryActionType}.FETCH_CAPITAL_FAILURE`,
		props<{ payload: HttpErrorResponse }>()
	),
	FETCH_MORE_DETAILS: createAction(
		`${countryActionType}.FETCH_CAPITAL`,
		props<{ payload: any }>()
	),
	FETCH_MORE_DETAILS_SUCCESS: createAction(
		`${countryActionType}.FETCH_MORE_DETAILS_SUCCESS`,
		props<{ payload: any }>()
	),
	FETCH_MORE_DETAILS_FAILURE: createAction(
		`${countryActionType}.FETCH_MORE_DETAILS_FAILURE`,
		props<{ payload: HttpErrorResponse }>()
	),
}
