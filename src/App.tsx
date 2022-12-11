import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import Footer from '@/components/Footer'
import RoutesConfig from '@/routes'
import { useModel } from '@/store'

const App = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { userInfo, loginStatus } = useModel('user')
  // console.warn(userInfo, 'userInfo ', loginStatus)

  /** 初始化重定向 */
  const init = () => {
    if (loginStatus) {
      if (pathname === '/message') navigate('/message')
    } else if (pathname === '/register') {
      navigate('/register')
    } else {
      navigate('/login')
    }
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
