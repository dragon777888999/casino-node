import React, { createContext, useState } from "react";

// Create Context
export const DataContext = createContext();

// Create Provider
export const DataProvider = ({
  children,
  wsData,
  coinsDataAfterFetch,
  // walletProvider,
}) => {
  const [theme, setTheme] = useState("dark"); // default theme
  const [depositAddress, setDepositAddress] = useState(null);
  const [network, setNetwork] = useState(null);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <DataContext.Provider
      value={{
        depositAddress,
        setDepositAddress,
        setNetwork,
        network,
        theme,
        toggleTheme,
        wsData,
        coinsDataAfterFetch,
        // walletProvider,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
