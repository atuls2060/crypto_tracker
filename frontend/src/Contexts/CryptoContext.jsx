import { createContext, useState } from "react";


export const CryptoContext = createContext();


export const CryptoContextProvider = ({ children }) => {
  const [currency, setCurrency] = useState('inr');


  return <CryptoContext.Provider value={{ currency, setCurrency }}>
    {
      children
    }
  </CryptoContext.Provider>
}