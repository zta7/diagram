import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'App';
import 'reactflow/dist/base.css';
import './main.css';
import { TooltipProvider } from '@radix-ui/react-tooltip';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TooltipProvider delayDuration={200} skipDelayDuration={200} disableHoverableContent>
      <App />
    </TooltipProvider>
  </React.StrictMode>,
);
