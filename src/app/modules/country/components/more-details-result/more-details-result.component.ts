import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FsmEvent } from "../../../../../fsm/models";

@Component({
	selector: 'app-more-details-result',
	templateUrl: './more-details-result.component.html',
	styleUrls: ['./more-details-result.component.scss']
})
export class MoreDetailsResultComponent {
	@Input() public countryName: string | undefined;
	@Input() public capital: string | undefined;
	@Input() public currency: string | undefined;
	@Input() public population: any[] | undefined;

	@Output() public resetButtonClicked: EventEmitter<FsmEvent> = new EventEmitter();

	public onReset() {
		this.resetButtonClicked.emit({type: 'RESET'} as FsmEvent);
	}
}
