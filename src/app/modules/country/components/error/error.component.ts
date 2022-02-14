import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FsmEvent } from "../../../../../fsm/models";

@Component({
	selector: 'app-error',
	templateUrl: './error.component.html',
	styleUrls: ['./error.component.scss']
})
export class ErrorComponent {
	@Input() errorMessage: any;
	@Output() public tryAgainButtonClicked: EventEmitter<FsmEvent> = new EventEmitter();

	public tryAgainClicked() {
		this.tryAgainButtonClicked.emit({ type: 'TRY_AGAIN' } as FsmEvent);
	}
}
