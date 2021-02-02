import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router} from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
//import { CSSReset } from '@emotion/react';
//import { CSSReset } from '@emotion/core';
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';

const {PORT, REACT_PORT, IP_ADDRESS} = require('./environment');

const theme = {
  color: 'hotpink',
  backgroundColor: 'purple'
}


const link = createHttpLink({
  uri: `http://${IP_ADDRESS}:${PORT}/graphql`,
  credentials: 'include',
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    
      <ThemeProvider theme={theme}>
      <Router>
        <ApolloProvider client={client}>
          
          <App />
        </ApolloProvider>
      </Router>
      </ThemeProvider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
