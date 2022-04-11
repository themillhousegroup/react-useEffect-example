import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import CarList from './CarList';
import ColorPicker from './ColorPicker';
import StatusBar from './StatusBar';
import './style.css';
import { Car, DebugSettings, LoadingState } from './types';
import { sleep } from './utils';

const debugSettings: DebugSettings = {
  forceError: false,
  loadDelayMillis: 777,
};

const fetchCars = async (): Promise<Array<Car>> => {
  if (debugSettings.forceError) {
    throw new Error('forced fetch error');
  }
  const response = await fetch('https://myfakeapi.com/api/cars/');
  if (debugSettings.loadDelayMillis) {
    await sleep(debugSettings.loadDelayMillis);
  }
  const json = await response.json();
  return json['cars'] as Array<Car>;
};

const filterCarsBy = (
  allCars: Array<Car>,
  preferredColor: string | undefined
): Array<Car> => {
  console.log(`filtering using color ${preferredColor}`);
  return allCars;
};

const App = () => {
  const [loadingState, setLoadingState] = useState(LoadingState.Unloaded);
  const [allCars, setAllCars] = useState([]);
  const [preferredColor, setPreferredColor] = useState(undefined);

  const filteredCars = filterCarsBy(allCars, preferredColor);
  console.log(`filtered cars to ${filteredCars.length}`);

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

  const spacer = () => <div style={{ height: '1em' }} />;
  return (
    <div>
      <ColorPicker
        possibilities={allCars.map((c) => c.car_color)}
        onColorSelected={setPreferredColor}
      />
      {spacer()}
      <StatusBar loadingState={loadingState} cars={filteredCars} />
      {spacer()}
      <CarList cars={filteredCars} />
    </div>
  );
};

render(<App />, document.getElementById('root'));
