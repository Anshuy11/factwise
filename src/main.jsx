import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AgGridProvider } from "ag-grid-react";
import { AllCommunityModule } from "ag-grid-community";

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AgGridProvider modules={[AllCommunityModule]}>
      <App />
    </AgGridProvider>
  </StrictMode>,
)
