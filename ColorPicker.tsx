import React, { ChangeEvent } from 'react';

type Props = {
  possibilities: Array<string>;
  onColorSelected: (newColor: string | undefined) => void;
};

const ColorPicker: React.FC<Props> = ({
  possibilities,
  onColorSelected,
}: Props) => {
  const distinct = new Set(possibilities);
  const sorted = Array.from(distinct).sort((a, b) => a.localeCompare(b));

  const handleSelection = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(`selected ${e.target.value}`);
    onColorSelected(e.target.value);
  };
  return (
    <section>
      <label htmlFor="colorSelection">Color:</label>
      <select id="colorSelection" onChange={handleSelection}>
        <option value={undefined}>None</option>
        {sorted.map((o) => (
          <option value={o}>{o}</option>
        ))}
      </select>
    </section>
  );
};

export default ColorPicker;
