import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FsmEvent } from "../../../../../fsm/models";

@Component({
	selector: 'app-country-result',
	templateUrl: './country-result.component.html',
	styleUrls: ['./country-result.component.scss']
})
export class CountryResultComponent implements OnInit {
	@Input() public countryName: string | undefined;
	@Input() public capital: string | undefined;
	@Output() public buttonClicked: EventEmitter<FsmEvent> = new EventEmitter();

	public form: FormGroup;
	public selectedRadio: any;

	constructor(private fb: FormBuilder) {
	}

	public ngOnInit(): void {
		this.form = this.fb.group({
			currency: false,
			population: false
		});
		this.selectedRadio = this.form.get('selectedRadio');
	}

	public isDetailsSelected(): boolean {
		return this.form.controls['currency'].value || this.form.controls['population'].value;
	}

	public onBack() {
		this.buttonClicked.emit({type: 'BACK'} as FsmEvent);
	}

	public onMoreDetails() {
		const payload = {
			currencySelected: this.form.controls['currency'].value,
			populationSelected: this.form.controls['population'].value
		}
		this.buttonClicked.emit({type: 'FETCH_MORE_DETAILS', payload: payload} as FsmEvent);
	}
}
