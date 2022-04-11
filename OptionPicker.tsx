import React, { ChangeEvent } from 'react';

type Props = {
  label: string;
  identifier: string;
  possibilities: Array<string>;
  onOptionSelected: (newColor: string | undefined) => void;
};

const NONE_MARKER = 'None';

const OptionPicker: React.FC<Props> = ({
  label,
  identifier,
  possibilities,
  onOptionSelected,
}: Props) => {
  const distinct = new Set(possibilities);
  const sorted = Array.from(distinct).sort((a, b) => a.localeCompare(b));

  const handleSelection = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === NONE_MARKER) {
      return onOptionSelected(undefined);
    }
    onOptionSelected(e.target.value);
  };
  return (
    <section>
      <label htmlFor={identifier}>{label}:</label>
      <select id={identifier} onChange={handleSelection}>
        <option value={NONE_MARKER}>{NONE_MARKER}</option>
        {sorted.map((o) => (
          <option value={o}>{o}</option>
        ))}
      </select>
    </section>
  );
};

export default OptionPicker;
