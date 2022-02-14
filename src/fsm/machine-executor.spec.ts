import { fsmExecutor, MachineExecutor } from "./machine-executor";
import { createMachine, Machine } from "./machine";
import { FsmEvent, FsmState } from "./models";


describe('MachineExecutor', () => {
	let executor: MachineExecutor;
	let machine: Machine;
	let machineConfig = {
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
				}
			},
			successFetchCountry: {
				on: {
					BACK: 'idle',
					FETCH_MORE_DETAILS: 'fetchingMoreDetails'
				}
			},
			fetchingMoreDetails: {
				on: {
					SUCCESS_FETCH_MORE_DETAILS: 'successFetchMoreDetails'
				}
			},
			successFetchMoreDetails: {
				on: {
					RESET: 'idle'
				}
			},
			failure: {
				on: {
					TRY_AGAIN: 'idle'
				}
			}
		}
	}

	it('should throw Initial state not provided error', () => {
		expect(() => createMachine({ })).toThrow(new Error('Initial state not provided'));
	});

	describe('Machine Executor', ()=> {
		beforeEach(() => {
			machine  = createMachine(machineConfig);
			executor = fsmExecutor(machine);
		});

		it('should transit from idle to fetchingCountry', () => {
			executor = fsmExecutor(machine);
			executor.send({ type: 'FETCH_COUNTRY' } as FsmEvent);
			executor.onTransition$().subscribe((state: FsmState) =>
				expect(state.name).toEqual('fetchingCountry')
			);
		});

		it('should transit from fetchingCountry to successFetchCountry', () => {
			machine.currentState = new FsmState('fetchingCountry',
				{
					SUCCESS_FETCH_COUNTRY: 'successFetchCountry'
				}, undefined)

			executor.send({ type: 'SUCCESS_FETCH_COUNTRY' } as FsmEvent);
			executor.onTransition$().subscribe((state: FsmState) =>
				expect(state.name).toEqual('successFetchCountry')
			)
		});

		it('should transit from fetchingCountry to failure', () => {
			machine.currentState = new FsmState('fetchingCountry',
				{
					FAILURE: 'failure'
				}, undefined)

			executor.send({ type: 'FAILURE' } as FsmEvent);
			executor.onTransition$().subscribe((state: FsmState) =>
				expect(state.name).toEqual('failure')
			)
		});

		it('should transit from successFetchCountry to fetchingMoreDetails', () => {
			machine.currentState = new FsmState('successFetchCountry',
				{
					FETCH_MORE_DETAILS: 'fetchingMoreDetails'
				}, undefined)

			executor.send({ type: 'FETCH_MORE_DETAILS' } as FsmEvent);
			executor.onTransition$().subscribe((state: FsmState) =>
				expect(state.name).toEqual('fetchingMoreDetails')
			)
		});

		it('should transit from fetchingMoreDetails to successFetchMoreDetails', () => {
			machine.currentState = new FsmState('fetchingMoreDetails',
				{
					SUCCESS_FETCH_MORE_DETAILS: 'successFetchMoreDetails'
				}, undefined)

			executor.send({ type: 'SUCCESS_FETCH_MORE_DETAILS' } as FsmEvent);
			executor.onTransition$().subscribe((state: FsmState) =>
				expect(state.name).toEqual('successFetchMoreDetails')
			)
		});

		it('should transit from successFetchMoreDetails to idle', () => {
			machine.currentState = new FsmState('successFetchMoreDetails',
				{
					RESET: 'idle'
				}, undefined)

			executor.send({ type: 'RESET' } as FsmEvent);
			executor.onTransition$().subscribe((state: FsmState) =>
				expect(state.name).toEqual('idle')
			)
		});

		it('should transit from failure to idle', () => {
			machine.currentState = new FsmState('successFetchMoreDetails',
				{
					TRY_AGAIN: 'idle'
				}, undefined)

			executor.send({ type: 'TRY_AGAIN' } as FsmEvent);
			executor.onTransition$().subscribe((state: FsmState) =>
				expect(state.name).toEqual('idle')
			)
		});
	});
});
