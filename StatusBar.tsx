import React from 'react';
import { Car, LoadingState } from './types';

type Props = {
  loadingState: LoadingState;
  cars: Array<Car>;
};

const StatusBar: React.FC<Props> = ({ loadingState, cars }: Props) => {
  const statusBarContent = (): string => {
    switch (loadingState) {
      case LoadingState.Loaded:
        return `Showing ${cars.length} cars`;
      case LoadingState.Error:
        return `Couldn't load car info`;
      default:
        return 'Loading ...';
    }
  };
  return (
    <section className="statusBar">
      <p>{statusBarContent()}</p>
    </section>
  );
};

export default StatusBar;
