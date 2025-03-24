export type SimpleDataTableProps = {
  id: string;
  rows: Array<Array<{ label: string; value: string | number }>>;
};

const rowKey = (id: string, rowIndex: number) => `${id}-row-${rowIndex}`;
const colKey = (id: string, rowIndex: number, colIndex: number) =>
  `${id}-row-${rowIndex}-col-${colIndex}`;

const borderB = (rows: Array<any>, rowIndex: number) =>
  rows.length > 1 && rowIndex !== rows.length - 1 && 'border-b border-purple-500';

const colW = (columns: Array<any>) => `w-[${100 / (columns.length * 2)}%]`;

export const SimpleDataTable = ({ id, rows }: SimpleDataTableProps) => (
  <table className="table-fixed w-full">
    {rows.map((columns, rowIndex) => (
      <tr key={rowKey(id, rowIndex)}>
        {columns.map((column, colIndex) => (
          <>
            <th
              key={`${colKey(id, rowIndex, colIndex)}-label`}
              className={`${borderB(rows, rowIndex)} p-1 text-sm text-left ${colW(columns)}`}
            >
              {column.label}
            </th>
            <td
              key={`${colKey(id, rowIndex, colIndex)}-value`}
              className={`${borderB(rows, rowIndex)} p-1 text-sm text-right ${colW(columns)}`}
            >
              {column.value}
            </td>
          </>
        ))}
      </tr>
    ))}
  </table>
);
