import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from "rxjs";
import { countryActions } from "./country.actions";
import { CountryService } from "../services/country.service";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class CountryEffects {

	// fetchCapitalName$ = createEffect(() =>
	// 	this.actions$.pipe(
	// 		ofType(countryActions.FETCH_CAPITAL),
	// 		exhaustMap((action: {payload: string}) => {
	// 			return this.countryService.fetchCapitalByCountry(action.payload).pipe(
	// 				map((response: any) => response.data.name),
	// 				map((capitalName: string) =>
	// 					countryActions.FETCH_CAPITAL_SUCCESS({payload: capitalName})),
	// 				catchError((err: HttpErrorResponse) =>
	// 					of(countryActions.FETCH_CAPITAL_FAILURE({payload: err}))
	// 				)
	// 			)
	// 		})
	// 	)
	// )

	constructor(private actions$: Actions, private countryService: CountryService) {
	}
}
