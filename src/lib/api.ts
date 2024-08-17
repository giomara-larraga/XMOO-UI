
//
// TODO: Replace anything that depends on Svelte with something else to make
// the module reusable elsewhere. Currently only the state uses Svelte stores.
// These stores could be replaced with RxJS observables.
//
import type { AxiosInstance } from "axios";
import axios from "axios";

/** An interface for accessing a backend server. */
export interface Backend {
  with_instance: () => AxiosInstance;
}

//
// Export this module as a backend instance.
//
// TODO: It would be nice to have a function that creates new backend
// instances.
//
export const backend: Backend = {
  with_instance: connect,
};

//
// The backend URL
//
// TODO: Move this to a configuration file.
//
export const baseURL = "http://localhost:5000";




function connect() {
  return axios.create({ baseURL });
}

//
// NOTE: Requires a version of the backend that sends the problems as a list
// rather than a record. This format is easier to handle and more useful in
// general.
//
export async function getDetails(): Promise<Problem>  {
    const response = await connect().get("/get_details_problem");
    return {
      ideal: response.data.ideal,
      nadir: response.data.nadir,
      objective_names: response.data.objective_names,
      short_names: response.data.short_names,
      decimal_places: response.data.decimal_places
    }
}

/**
 * Problem data in the format used by the frontend.
 *
 * @property type - It is unclear what this field represents. It is included in
 *   the type because the backend makes it available.
 */
export type Problem = {
  decimal_places: number;
  objective_names: string[];
  short_names: string[];
  ideal: number[];
  nadir: number[];
};

/**
 * @property minimize - `true` if the goal is to minimize, `false` if the goal
 *   is to maximize.
 */
export type Objective = {
  name: string;
  minimize: boolean;
};

export type Variable = {
  name: string;
};




