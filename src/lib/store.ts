import { writable } from 'svelte/store';

// Define the store state type
interface StoreState {
  numObjectives: number;
  referencePoint: number[];
  potentialReferencePoint: number[];
  lagrangeMultipliers: number[];
  partialTradeoffs: number[][];
  fx: number[]| undefined;
  ideal:number[] | undefined;
  nadir:number[] | undefined;
  objective_names: string[];
  short_names: string[];
  decimal_places: number;
  approximated_solution: number[];
  history_solutions: number[][];
  suggestions: string [];
  explanations: string [];
  method: string;
}

// Define the number of objectives
//const numObjectives = 4;

// Create a store with the defined state type
export const store = writable<StoreState>({
  numObjectives:0,
  referencePoint: [],
  potentialReferencePoint: [],
  lagrangeMultipliers: [],
  partialTradeoffs: [],
  fx: undefined,
  ideal: undefined,
  nadir: undefined,
  objective_names: [],
  short_names: [],
  decimal_places: 0,
  approximated_solution: [],
  history_solutions: [],
  suggestions: [],
  explanations: [],
  method:"",
});

export const selected_problem = writable<number>();
export const selected_method = writable<number>();
