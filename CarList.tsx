import React, { FC } from 'react';
import { Car } from './types';

type Props = {
  cars: Array<Car>;
};

const CarList: FC<Props> = ({ cars }: Props) => {
  return (
    <section>
      <p>Found {cars.length} cars</p>
      <table>
        <thead>
          <tr>
            <th>Make</th>
            <th>Model</th>
            <th>Model Year</th>
            <th>Color</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.id}>
              <td>{car.car}</td>
              <td>{car.car_model}</td>
              <td>{car.car_model_year}</td>
              <td>{car.car_color}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
export default CarList;
