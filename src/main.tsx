import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'

import App from './App'
import Loading from './components/Loading'

import { StoreProvider } from '@/store'
import flexible from '@/utils//flexible'

import '@/styles/reset.scss'

flexible()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <StoreProvider>
      <App />
      {React.cloneElement(Loading.init())}
    </StoreProvider>
  </HashRouter>
)
