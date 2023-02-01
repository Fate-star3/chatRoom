import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'

import App from './App'

import '@/styles/reset.scss'
import Loading from '@/components/Loading/'
import Toast from '@/components/Toast'
import { StoreProvider } from '@/store'
import flexible from '@/utils//flexible'

flexible()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <StoreProvider>
      <App />
      {React.createElement(Loading.init)}
      {React.createElement(Toast.init)}
    </StoreProvider>
  </HashRouter>
)
