export interface Car {
  id: string;
  car: string;
  car_color: string;
  car_model: string;
  car_model_year: number;
}

export enum LoadingState {
  Unloaded,
  Loading,
  Loaded,
  Error,
}

export type DebugSettings = {
  forceError: boolean;
  loadDelayMillis: number;
};
