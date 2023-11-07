import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ReactFlowProvider } from 'reactflow'
// import App2 from './App2.jsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReactFlowProvider>
        <App />
        {/* <App2 /> */}
    </ReactFlowProvider>
  </React.StrictMode>,
)
