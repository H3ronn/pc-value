import { useContext } from 'react';
import { TableDataContext } from 'providers/TableDataProvider';

const useTableData = () => useContext(TableDataContext);

export default useTableData;
