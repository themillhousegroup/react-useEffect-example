import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import CarList from './CarList';
import './style.css';
import { Car } from './types';

const fetchCars = async (): Promise<Array<Car>> => {
  const response = await fetch('https://myfakeapi.com/api/cars/');
  const json = await response.json();
  return json['cars'] as Array<Car>;
};

enum LoadingState {
  Unloaded,
  Loading,
  Loaded,
  Error,
}

const App = () => {
  const [loadingState, setLoadingState] = useState(LoadingState.Unloaded);
  const [allCars, setAllCars] = useState([]);

  const loadCars = async () => {
    try {
      const cars = await fetchCars();
      setAllCars(cars);
      setLoadingState(LoadingState.Loaded);
    } catch (e) {
      console.error('Error loading cars', e);
      setLoadingState(LoadingState.Error);
    }
  };

  useEffect(() => {
    if (loadingState === LoadingState.Unloaded) {
      setLoadingState(LoadingState.Loading);
      loadCars();
    }
  }, [loadingState]);

  const statusBar = () => {
    return (
      <section className="statusBar">
        <p>{loadingState === LoadingState.Loading && 'Loading ...'}</p>
        <p>
          {loadingState === LoadingState.Loaded &&
            `Showing ${allCars.length} cars`}
        </p>
      </section>
    );
  };

  const spacer = () => <div style={{ height: '1em' }} />;
  return (
    <div>
      {spacer()}
      {statusBar()}
      {spacer()}
      <CarList cars={allCars} />
    </div>
  );
};

render(<App />, document.getElementById('root'));
