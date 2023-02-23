import { message } from 'antd'
import classnames from 'classnames'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import styles from './index.module.scss'

import { getUserInfo } from '@/server/user'
import { useModel } from '@/store'
import { getCookie, removeCookie } from '@/utils/storage'
import { asyncFetch } from '@/utils/tools'

const Footer = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const { userInfo } = useModel('user')
  const [token, setToken] = useState('')

  const handClick = () => {
    userInfo?.account &&
      asyncFetch(getUserInfo(userInfo?.account), {
        onSuccess(res) {
          setToken(res.token)
        }
      })
  }
  useEffect(() => {
    // console.log(token)
    // console.log(getCookie('usertoken'), getCookie('usertoken') !== token)
    // 如果账号在别处登录，重新获取用户的token，与本地的相比，不一致则说明用户在别处登录，这里的需要登出
    if (token && getCookie('usertoken') && getCookie('usertoken') !== token) {
      message.warning('该账号在别处登录！', 2, () => {
        removeCookie('usertoken')
        localStorage.removeItem('userinfo')
        navigate('/login')
      })
    }
  }, [token])

  useEffect(() => {
    if (['/message', '/mine', '/contacts', '/'].includes(pathname)) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }, [visible, pathname])
  return visible ? (
    <div className={styles.footer}>
      <Link
        to='/message'
        className={
          styles[
            classnames({
              active: pathname === '/message' || pathname === '/'
            })
          ]
        }
        onClick={() => handClick()}
      >
        <div className={styles.icon_home} />
        <div className={styles.footer_home}>消息</div>
      </Link>
      <Link to='/contacts' className={styles[classnames({ active: pathname === '/contacts' })]}>
        <div className={styles.icon_order} />
        <div className={styles.footer_order}>联系人</div>
      </Link>
      <Link to='/mine' className={styles[classnames({ active: pathname === '/mine' })]}>
        <div className={styles.icon_mine} />
        <div className={styles.footer_mine}>我的</div>
      </Link>
    </div>
  ) : (
    <></>
  )
}
export default Footer
