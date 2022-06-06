import cx from 'classnames';
import { TableHeader } from '../TableHeader/TableHeader';
import { TableRow } from '../TableRow/TableRow';

export type TOrderSortBy<T = string> = { key: T; direction: 'asc' | 'desc' };
export interface TableProps {
  className?: string;
  columns: { field: string; header: string; sortable: boolean }[];
  rows?: any[];
  onSort?: (sortBy: TOrderSortBy) => void;
  sortBy?: TOrderSortBy;
}

export const Table = ({
  className,
  rows,
  columns,
  onSort,
  sortBy,
}: TableProps) => {
  const toggleDirection = sortBy?.direction === 'asc' ? 'desc' : 'asc';

  return (
    <div className={cx(className, 'pt-5')}>
      <table
        className="w-full border-separate"
        style={{ borderSpacing: '0 16px' }}
      >
        <thead>
          <tr>
            {columns.map((col, index) => (
              <TableHeader
                key={index}
                field={col.field}
                header={col.header}
                sortable={col.sortable}
                onSort={() => {
                  onSort?.({
                    key: col.field,
                    direction:
                      sortBy?.key === col.field ? toggleDirection : 'asc',
                  });
                }}
                sortBy={sortBy}
              />
            ))}
          </tr>
        </thead>

        <tbody>
          {rows?.map((row, index) => (
            <TableRow
              className="bg-white"
              key={index}
              tableCells={columns.map((col) => ({
                content: row[col.field],
              }))}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
