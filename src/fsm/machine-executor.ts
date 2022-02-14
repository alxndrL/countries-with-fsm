import { Machine } from "./machine";
import { BehaviorSubject, Observable } from "rxjs";
import { FsmEvent, FsmState } from "./models";

export function fsmExecutor(machine: Machine) {
	return new MachineExecutor(machine);
}

export class MachineExecutor {
	private machine: Machine;
	readonly transitionSubject$: BehaviorSubject<FsmState>;

	constructor(machine: Machine) {
		this.machine = machine;
		this.transitionSubject$ = new BehaviorSubject(this.machine.initialState);
	}

	/**
	* Executes the transition of the given state and invokes the provided callback
	*
	* @param event The event for transition to required state
	*/
	public send(event: FsmEvent): void {
		const nextStateName = this.machine.currentState?.transitions[event.type];
		const nextState = this.machine.states.get(nextStateName);
		if (!nextState) {
			this.transitionSubject$.next(this.machine.currentState);
			return;
		}

		this.machine.currentState = nextState;
		this.transitionSubject$.next(nextState);

		if (nextState.invoke) {
			nextState.invoke(event.payload);
		}
	}

	/**
	 * Returns Observable of current state
	 *
	 * @returns Observable<FsmState>
	 */
	public onTransition$(): Observable<FsmState> {
		return this.transitionSubject$;
	}
}
