import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { removeCookie } from './utils/storage'

import Footer from '@/components/Footer'
import RoutesConfig from '@/routes'
import { useModel } from '@/store'

const App = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { loginStatus } = useModel('user')

  /** 初始化重定向 */
  const init = () => {
    if (loginStatus) {
      if (pathname === '/message') navigate('/message')
    } else if (pathname === '/register') {
      navigate('/register')
    } else {
      navigate('/login')
    }
    // if (JSON.parse(localStorage.getItem('userinfo'))) {
    //   localStorage.removeItem('userinfo')
    //   removeCookie('usertoken')
    //   navigate('/login')
    // }
  }
  useEffect(init, [pathname])

  return (
    <div className='App'>
      <RoutesConfig />
      <Footer />
    </div>
  )
}

export default App
