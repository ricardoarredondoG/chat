import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import apolloClient from './ApolloSetup'
import { ApolloProvider} from "@apollo/client";
import 'primeflex/primeflex.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";  
import "primereact/resources/primereact.min.css";                  
import "primeicons/primeicons.css";                                

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
