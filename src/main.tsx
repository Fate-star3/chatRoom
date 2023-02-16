import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'

import App from './App'

import '@/styles/reset.scss'
import { StoreProvider } from '@/store'
import flexible from '@/utils//flexible'

flexible()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <StoreProvider>
      <App />
    </StoreProvider>
  </HashRouter>
)
