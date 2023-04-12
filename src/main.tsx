import React from 'react';
import ReactDOM from 'react-dom/client';
import { IconContext } from 'react-icons';
import App from 'App';
import 'reactflow/dist/base.css';
import './main.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <RouterProvider /> */}
    <IconContext.Provider value={{ size: '1.5rem' }}>
      <App />
    </IconContext.Provider>
  </React.StrictMode>,
);
