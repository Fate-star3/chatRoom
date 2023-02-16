import { message } from 'antd'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { getUserInfo } from './server/user'
import { getCookie, removeCookie } from './utils/storage'
import { asyncFetch } from './utils/tools'

import Footer from '@/components/Footer'
import RoutesConfig from '@/routes'
import { useModel } from '@/store'

const App = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { loginStatus, userInfo } = useModel('user')
  const [token, setToken] = useState('')

  /** 初始化重定向 */
  const init = () => {
    if (loginStatus) {
      if (pathname === '/message') navigate('/message')
    } else if (pathname === '/register') {
      navigate('/register')
    } else {
      navigate('/login')
    }
    // console.log(token)
    // console.log(getCookie('usertoken'), getCookie('usertoken') !== token)
    if (token && getCookie('usertoken') && getCookie('usertoken') !== token) {
      // message.warning('该账号在别处登录！', 2, () => {
      //   removeCookie('usertoken')
      //   removeCookie('userinfo')
      //   navigate('/login')
      // })
    }
  }
  useEffect(init, [pathname])

  useEffect(() => {
    setTimeout(() => {
      userInfo?.account &&
        asyncFetch(getUserInfo(userInfo?.account), {
          onSuccess(res) {
            setToken(res.token)
            // console.log(res, '---')
          }
        })
    }, 100)
  }, [pathname])
  return (
    <div className='App'>
      <RoutesConfig />
      <Footer />
    </div>
  )
}

export default App
