import React from 'react';
import ReactDOM from 'react-dom/client';
import { IconContext } from 'react-icons';
import App from 'App';
import 'reactflow/dist/base.css';
import './main.css';
import { RouterP } from '@tanstack/router';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <RouterProvider /> */}
    <IconContext.Provider value={{ size: '1.25rem' }}>
      <App />
    </IconContext.Provider>
  </React.StrictMode>,
);
