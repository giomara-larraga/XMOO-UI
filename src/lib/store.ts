import { writable } from 'svelte/store';

// Define the store state type
interface StoreState {
  numObjectives: number;
  referencePoint: number[];
  lagrangeMultipliers: number[];
  partialTradeoffs: number[][];
  fx: number[];
  ideal:number[];
  nadir:number[];
}

// Define the number of objectives
const numObjectives = 4;

// Create a store with the defined state type
export const store = writable<StoreState>({
  numObjectives,
  referencePoint: Array(numObjectives).fill(0),
  lagrangeMultipliers: Array(numObjectives).fill(0),
  partialTradeoffs: Array(numObjectives).fill(Array(numObjectives).fill(0)),
  fx: Array(numObjectives).fill(0),
  ideal:Array(numObjectives).fill(0),
  nadir: Array(numObjectives).fill(0),
});
