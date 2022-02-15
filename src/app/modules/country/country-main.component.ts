import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { catchError, delay, forkJoin, map, Observable, of, tap } from "rxjs";
import { fsmExecutor, MachineExecutor } from "../../../fsm/machine-executor";
import { CountryService } from "./services/country.service";
import { HttpErrorResponse } from "@angular/common/http";
import { FsmEvent } from "../../../fsm/models";
import { FsmState } from "../../../fsm/models";
import { Store } from "@ngrx/store";
import { countryActions } from "./store/country.actions";
import { createMachine, Machine } from "../../../fsm/machine";
import { CountryState } from "./store/country.state";
import { getCountryName, getCountryState } from "./store/country.selectors";


@Component({
	selector: 'app-country-main',
	templateUrl: './country-main.component.html',
	styleUrls: ['./country-main.component.scss']
})
export class CountryMainComponent implements OnInit {
	public fsm: Machine;
	public countryState$: Observable<CountryState | undefined>;
	public currentFsmStateName: string = '';
	public showDiagram: boolean        = false;

	private fsmExecutor: MachineExecutor | undefined;
	private countryName: string = '';

	constructor(private formBuilder: FormBuilder,
				private countryService: CountryService,
				private store: Store<CountryState>) {
	}

	public ngOnInit(): void {
		this.initStateMachine();

		this.countryState$ = this.store.select(getCountryState);

		this.fsmExecutor?.onTransition$().subscribe((state: FsmState) => {
			console.log(state);
			this.currentFsmStateName = state.name;
		});

		this.store.select(getCountryName).subscribe((countryName: any) =>
			this.countryName = countryName);
	}

	public sendFsmEvent(event: FsmEvent) {
		this.fsmExecutor?.send({ type: event.type, payload: event.payload } as FsmEvent);
	}

	private fetchCapital = (countryName: string) => {
		this.countryService.fetchCapital(countryName).pipe(
			map((response: any) => response.data),
			delay(200),
			tap((data: any) =>
				this.fsmExecutor?.send({ type: 'SUCCESS_FETCH_COUNTRY', payload: data } as FsmEvent)),
			catchError((err: HttpErrorResponse) => {
				this.fsmExecutor?.send({ type: 'FAILURE', payload: err } as FsmEvent);
				return of({});
			})
		).subscribe();
	}

	private fetchMoreDetails = (payload: any) => {
		const requiredData: Observable<any>[] = [];
		if (payload.currencySelected) {
			requiredData.push(this.countryService.fetchCurrency(this.countryName));
		}
		if (payload.populationSelected) {
			requiredData.push(this.countryService.fetchPopulation(this.countryName));
		}

		forkJoin(requiredData).pipe(
			map((response: any[]) => {
				const payload = {} as any;
				response.map((response: any) => response.data).forEach((data: any) => {
					if (data.hasOwnProperty('currency')) {
						payload.currency = data[ 'currency' ];
					}
					if (data.hasOwnProperty('populationCounts')) {
						payload.population = data[ 'populationCounts' ];
					}
				})
				return payload;
			}),
			map((payload: any) =>
				this.fsmExecutor?.send({ type: 'SUCCESS_FETCH_MORE_DETAILS', payload: payload } as FsmEvent)),
			catchError((err: HttpErrorResponse) => {
				this.fsmExecutor?.send({ type: 'FAILURE', payload: err } as FsmEvent);
				return of({});
			})
		).subscribe();
	}

	private initStateMachine(): void {
		const stateMachine = createMachine({
			initial: 'idle',
			states: {
				idle: {
					on: {
						FETCH_COUNTRY: 'fetchingCountry'
					}
				},
				fetchingCountry: {
					on: {
						SUCCESS_FETCH_COUNTRY: 'successFetchCountry',
						FAILURE: 'failure'
					},
					invoke: this.fetchCapital
				},
				successFetchCountry: {
					on: {
						BACK: 'idle',
						FETCH_MORE_DETAILS: 'fetchingMoreDetails'
					},
					invoke: (payload: string) => this.store.dispatch(
						countryActions.FETCH_CAPITAL_SUCCESS({ payload: payload }))
				},
				fetchingMoreDetails: {
					on: {
						SUCCESS_FETCH_MORE_DETAILS: 'successFetchMoreDetails',
						FAILURE: 'failure'
					},
					invoke: this.fetchMoreDetails
				},
				successFetchMoreDetails: {
					on: {
						RESET: 'idle'
					},
					invoke: (payload: string) => this.store.dispatch(
						countryActions.FETCH_MORE_DETAILS_SUCCESS({ payload: payload }))
				},
				failure: {
					on: {
						TRY_AGAIN: 'idle'
					},
					invoke: (err: HttpErrorResponse) => this.store.dispatch(
						countryActions.FETCH_CAPITAL_FAILURE({ payload: err }))
				}
			}
		});

		this.fsmExecutor = fsmExecutor(stateMachine);
	}
}
