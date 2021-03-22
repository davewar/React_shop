import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ShoppingProvider from './contexts/shopping'
import UserProvider from './contexts/user';

ReactDOM.render(
  <React.StrictMode>

          <UserProvider>
              <ShoppingProvider>
                    <App />
              </ShoppingProvider>
         </UserProvider>

  </React.StrictMode>,
  document.getElementById('root')
);

