import { Button, Checkbox } from '@/components';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import cls from './SetColumn.module.css';

const allColumns = [
  'year',
  'population',
  'co2',
  'co2_per_capita',
  'methane',
  'oil_co2',
  'temperature_change_from_co2',
];

interface SetColumnProps {
  onClose: () => void;
  onChange: (value: string[]) => void;
  columns: string[];
}

export const SetColumn: FC<SetColumnProps> = memo(
  ({ columns, onChange, onClose }) => {
    const [tempSelectedColumns, setTempSelectedColumns] = useState([
      ...columns,
    ]);

    useEffect(() => {
      setTempSelectedColumns([...columns]);
    }, [columns]);

    const handleToggleColumn = useCallback(
      (column: string) => {
        if (tempSelectedColumns.includes(column)) {
          setTempSelectedColumns(
            tempSelectedColumns.filter((col) => col !== column)
          );
        } else {
          setTempSelectedColumns([...tempSelectedColumns, column]);
        }
      },
      [tempSelectedColumns]
    );

    const handleApply = useCallback(() => {
      onChange(tempSelectedColumns);
      onClose();
    }, [onChange, onClose, tempSelectedColumns]);

    return (
      <>
        <h2 className={cls.title}>Select Columns to Display</h2>
        <div className={cls.list}>
          {allColumns.map((column) => (
            <div key={column} className={cls.choose}>
              <Checkbox
                id={column}
                isChecked={tempSelectedColumns.includes(column)}
                onChange={() => handleToggleColumn(column)}
              />
              {column.replace(/_/g, ' ').toUpperCase()}
            </div>
          ))}
        </div>
        <div className="modal-actions">
          <Button className={cls.button} variant="filled" onClick={handleApply}>
            Apply
          </Button>
        </div>
      </>
    );
  }
);

SetColumn.displayName = 'SetColumn';
