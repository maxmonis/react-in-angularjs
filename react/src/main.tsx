import React from 'react'
import ReactDOM from 'react-dom/client'
import { defineElements } from './interop/defineElements'

// Create custom HTML elements during build
if (import.meta.env.PROD) defineElements()
// Otherwise render the WIP component in dev mode
else
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <div>
        Replace this div with the component you're currently working on. This
        will enable you to take advantage of hot reloading. Do not commit
        changes to this file. When you're ready to try your component out within
        the Angular app, add it to `interop/elements.ts`.
      </div>
    </React.StrictMode>,
  )
