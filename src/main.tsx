import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

import '@/styles/reset.scss'
import Loading from '@/components/Loading/'
import Toast from '@/components/Toast'
import { StoreProvider } from '@/store'
import flexible from '@/utils//flexible'

flexible()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <StoreProvider>
      <App />
      {React.createElement(Loading.init)}
      {React.createElement(Toast.init)}
    </StoreProvider>
  </BrowserRouter>
)
