import { FsmState } from "./models";

export function createMachine(config: any) {
	if (!config.initial) {
		throw new Error('Initial state not provided');
	}

	return new Machine(config);
}

export class Machine {
	readonly _initialState: FsmState;
	private _currentState: FsmState;
	private _states: Map<string, FsmState> = new Map();

	constructor(config: any) {
		this._initialState =
			new FsmState(config.initial, config.states[ config.initial ].on, config.states[ config.initial ].invoke);
		this._currentState = this._initialState;
		this.init(config);
	}

	private init(config: any) {
		const statesNames = Object.getOwnPropertyNames(config.states);
		statesNames.forEach((stateName: string) =>
			this._states.set(stateName,
				new FsmState(stateName, config.states[ stateName ].on, config.states[ stateName ].invoke))
		);
	}

	get initialState(): FsmState {
		return this._initialState;
	}

	get states(): Map<string, FsmState> {
		return this._states;
	}

	get currentState(): FsmState {
		return this._currentState;
	}

	set currentState(state: FsmState) {
		this._currentState = state
	}
}
