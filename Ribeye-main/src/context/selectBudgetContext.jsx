import { useState, useEffect, createContext } from "react";
const budgetContext = createContext();

export const SelectBudgetProvider = ({ children }) => {
  const [budgetName, setBudgetName] = useState(
    localStorage.getItem("selectedValue") || "total"
  );

  const handleBudgetName = (e) => {
    setBudgetName(e);
  };

  useEffect(() => {
    localStorage.setItem("selectedValue", budgetName);
  }, [budgetName]);
  return (
    <budgetContext.Provider
      value={{ budgetName, setBudgetName, handleBudgetName }}
    >
      {children}
    </budgetContext.Provider>
  );
};

export default budgetContext;
