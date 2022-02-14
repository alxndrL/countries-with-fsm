export interface FsmEvent {
	type: string;
	payload: any;
}

export class FsmState {
	readonly _name: string
	readonly _transitions: any;
	readonly _invoke: any;

	constructor(name: string, transitions: any, invoke: any) {
		this._name = name;
		this._transitions = transitions;
		this._invoke = invoke;
	}

	get name() {
		return this._name;
	}

	get transitions() {
		return this._transitions;
	}

	get invoke() {
		return this._invoke;
	}
}
