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

const App = () => {
  const [allCars, setAllCars] = useState([]);

  const loadCars = async () => {
    const cars = await fetchCars();
    setAllCars(cars);
  };

  useEffect(() => {
    if (allCars.length === 0) {
      loadCars();
    }
  }, [allCars]);

  console.log(`rendering ${JSON.stringify(allCars)}`);
  return (
    <div>
      <p>Start editing to see some magic happen :)</p>
      <CarList cars={allCars} />
    </div>
  );
};

render(<App />, document.getElementById('root'));
