
export type Problem = {
    id: number;
    name: string;
    type: string;
    objectives: Objective[];
    variables: Variable[];
    n_constraints: number;
    ideal_point: number[];
    nadir_point: number[];
  };

  export type Objective = {
    name: string;
    minimize: boolean;
    ideal: number;
    nadir: number;
  };
  
  export type Variable = {
    name: string;
    upperbound: number;
    lowerbound: number;
    type: string;
  };

  export type Solution = {
    name: string;
    objective_values: number[];
    decision_values: number[];
    multipliers: number [];
    local_tradeoffs: number[][];
  }

  export type Iteration = {
    it_num: number;
    name: string;
    solutions: Solution[];
    reference_point: number[];
    num_solutions: number;
  }

  export type SolutionProcess = {
    list_iterations: Iteration[];
  }