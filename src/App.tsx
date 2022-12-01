import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import Footer from '@/components/Footer'
import RoutesConfig from '@/routes'
import { useModel } from '@/store'
// import { tokenStorage } from '@/utils/storage'

const App = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { userInfo } = useModel('user')

  /** 初始化重定向 */
  const init = () => {
    if (userInfo.status) {
      if (pathname === '/message') navigate('/message')
    } else if (pathname === '/register') {
      navigate('/register')
    } else if (pathname !== '/login') {
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
