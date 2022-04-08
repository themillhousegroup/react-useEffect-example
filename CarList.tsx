import React, { FC } from 'react';
import { Car } from './types';

type Props = {
  cars: Array<Car>;
};

enum SortOrder {
  Default,
  Asc,
  Desc,
}

type CarSortSelections = Record<keyof Car, SortOrder>;

type ComparatorWithOrdering<T> = (a: T, b: T, o: SortOrder) => number;
type Comparator<T> = (a: T, b: T) => number;

function numberComparator(a: number, b: number, o: SortOrder): number {
  switch (o) {
    case SortOrder.Asc:
      return a - b;
    case SortOrder.Desc:
      return b - a;
    default:
      return 0;
  }
}
function stringComparator(a: string, b: string, o: SortOrder): number {
  switch (o) {
    case SortOrder.Asc:
      return a.localeCompare(b);
    case SortOrder.Desc:
      return b.localeCompare(a);
    default:
      return 0;
  }
}

function defaultComparator(a: any, b: any, o: SortOrder): number {
  return 0;
}

const carFieldComparators: Record<keyof Car, Comparator<string | number>> = {
  id: defaultComparator,
  car: stringComparator,
  car_model: stringComparator,
  car_model_year: numberComparator,
  car_color: stringComparator,
};

const comparatorFor = (sortSelections: CarSortSelections): Comparator<Car> => {
  // const fieldComparators = Object.entries(sortSelections).map(
  //   ([fieldName, sortOrder]) => {
  //     console.log(`Sort Order for field ${fieldName} is ${sortOrder}`);
  //     return fieldComparatorFor();
  //   }
  // );

  // FIXME: reduce this noise
  const comparatorChain = (a: Car, b: Car): number => {
    const makeSorted = stringComparator(a.car, b.car, sortSelections.car);
    if (makeSorted !== 0) {
      return makeSorted;
    }
    const modelSorted = stringComparator(
      a.car_model,
      b.car_model,
      sortSelections.car_model
    );
    if (modelSorted !== 0) {
      return modelSorted;
    }
    const yearSorted = numberComparator(
      a.car_model_year,
      b.car_model_year,
      sortSelections.car_model_year
    );
    if (yearSorted !== 0) {
      return yearSorted;
    }
    const colorSorted = stringComparator(
      a.car_color,
      b.car_color,
      sortSelections.car_color
    );
    return colorSorted;
  };

  return comparatorChain;
};

const defaultCarSortSelections: CarSortSelections = {
  id: SortOrder.Default,
  car: SortOrder.Asc,
  car_model: SortOrder.Asc,
  car_model_year: SortOrder.Asc,
  car_color: SortOrder.Asc,
};

const CarList: FC<Props> = ({ cars }: Props) => {
  const comparator = comparatorFor(defaultCarSortSelections);
  const sortedCars = cars.sort(comparator);
  return (
    <section>
      <p>Found {cars.length} cars</p>
      <table>
        <thead>
          <tr>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
            <th>Color</th>
          </tr>
        </thead>
        <tbody>
          {sortedCars.map((car) => (
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
