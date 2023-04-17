import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css"
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './Themes/theme';
import { AuthContextProvider } from './Contexts/AuthContext';
import { CryptoContextProvider } from './Contexts/CryptoContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ChakraProvider theme={theme}>
      <AuthContextProvider>
        <CryptoContextProvider>
          <App />
        </CryptoContextProvider>
      </AuthContextProvider>
    </ChakraProvider>
  </BrowserRouter>
);

