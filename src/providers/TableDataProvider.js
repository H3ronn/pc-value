import React, { createContext } from 'react';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { getRandomId } from 'helpers/getRandomId';
import { formatFloat } from 'helpers/formatFloat';
import { useCurrencies } from 'hooks/useCurrencies';

export const TableDataContext = createContext({
  tableData: [],
  setTableData: () => {},
  addItem: () => {},
  deleteItem: () => {},
  editItem: () => {},
  amount: 0,
  totalValue: '',
  categoryInformation: {},
});

const TableDataProvider = ({ children }) => {
  const [tableData, setTableData] = useLocalStorage('tableData', []);

  const addItem = (values) => {
    setTableData((prevState) => [...prevState, { ...values, id: getRandomId() }]);
  };

  const deleteItem = (id) => {
    setTableData((prevState) => prevState.filter((item) => item.id !== id));
  };

  const editItem = (newValues) => {
    const newState = tableData.map((item) => (item.id === newValues.id ? newValues : item));
    setTableData(newState);
  };

  const getTotalValue = () => {
    const total = tableData.reduce(
      (acc, item) => ({
        ...acc,
        [item.currency]: formatFloat(acc[item.currency] + parseFloat(item.price)),
      }),
      { zloty: 0, euro: 0, dollar: 0 }
    );
    console.log(total);
    return `Total value: ${total.zloty}zloty, ${total.euro}euro, ${total.dollar}$`;
  };

  const getCategoryInformations = () => {
    const result = tableData.reduce((acc, item) => {
      if (!acc?.[item.category]) {
        acc[item.category] = { amount: 0 };
      }
      if (!acc[item.category]?.[item.currency]) {
        acc[item.category][item.currency] = 0;
      }

      acc[item.category].amount++;
      acc[item.category][item.currency] = acc[item.category][item.currency] + parseFloat(item.price);
      return acc;
    }, {});

    return result;
  };

  const state = {
    tableData,
    setTableData,
    addItem,
    deleteItem,
    editItem,
    amount: tableData.length,
    totalValue: getTotalValue(),
    categoryInformation: getCategoryInformations(),
  };

  return <TableDataContext.Provider value={state}>{children}</TableDataContext.Provider>;
};

export default TableDataProvider;
