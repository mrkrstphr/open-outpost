import { Fragment } from 'react';

export type SimpleDataTableProps = {
  id: string;
  data: Array<{ label: string; value: string | number }>;
};

const key = (id: string, rowIndex: number) => `${id}-row-${rowIndex}`;

export const SimpleDataTable = ({ id, data }: SimpleDataTableProps) => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
    {data.map((column, index) => (
      <Fragment key={`${key(id, index)}-columns`}>
        <div className={`p-1 text-sm text-left`}>{column.label}</div>
        <div className={`p-1 text-sm text-right`}>{column.value}</div>
      </Fragment>
    ))}
  </div>
);
