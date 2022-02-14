import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { FsmEvent } from "../../../../../fsm/models";

@Component({
	selector: 'app-search-country',
	templateUrl: './search-country.component.html',
	styleUrls: ['./search-country.component.scss']
})
export class SearchCountryComponent implements OnInit {
	public countryForm: FormGroup;
	public capitalControl: any;
	@Output() searchButtonClicked: EventEmitter<FsmEvent> = new EventEmitter();

	constructor(private formBuilder: FormBuilder) {
	}

	ngOnInit(): void {
		this.countryForm    = this.formBuilder.group({
			country: [
				''
			]
		})
		this.capitalControl = this.countryForm.get('country');
	}

	public submit(): void {
		this.searchButtonClicked.emit({ type: 'FETCH_COUNTRY', payload: this.countryForm.value.country } as FsmEvent);
	}
}
