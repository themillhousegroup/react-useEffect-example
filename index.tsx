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
}

const App = () => {
  const [loadingState, setLoadingState] = useState(LoadingState.Unloaded);
  const [allCars, setAllCars] = useState([]);

  const loadCars = async () => {
    const cars = await fetchCars();
    setAllCars(cars);
    setLoadingState(LoadingState.Loaded);
  };

  useEffect(() => {
    if (loadingState === LoadingState.Unloaded) {
      setLoadingState(LoadingState.Loading);
      loadCars();
    }
  }, [loadingState]);

  // console.log(`rendering ${JSON.stringify(allCars)}`);
  return (
    <div>
      <p>{loadingState === LoadingState.Loading && 'Loading ...'}</p>
      <CarList cars={allCars} />
    </div>
  );
};

render(<App />, document.getElementById('root'));
