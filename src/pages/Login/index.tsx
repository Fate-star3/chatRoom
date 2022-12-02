import { Toast } from 'antd-mobile'
import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './index.module.scss'

import { LoginUserInfo } from '@/server/user'
import { useModel } from '@/store'
import { setCookie } from '@/utils/storage'
import { formatParams, asyncFetch } from '@/utils/tools'

const Login = () => {
  const { userInfo, setUserInfo, setLoginStatus } = useModel('user')
  const navigate = useNavigate()
  const [account, setAccount] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const accountRef = useRef<HTMLDivElement | null>(null)
  const passwordRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const current = accountRef.current as HTMLElement
    const current1 = passwordRef.current as HTMLElement
    if (formatParams(account)) {
      current.style.display = 'block'
    } else {
      current.style.display = 'none'
    }
    if (formatParams(password)) {
      current1.style.display = 'block'
    } else {
      current1.style.display = 'none'
    }
  }, [account, password])

  /**
   * 处理登录的逻辑
   */
  const handleLogin = () => {
    console.warn('handleLogin', account, password)

    if (!formatParams(account) || !formatParams(password)) {
      Toast.show({
        content: '请输入信息',
        icon: 'fail'
      })
    }
    // 处理接口
    asyncFetch(
      LoginUserInfo({
        account,
        password
      }),
      {
        onSuccess(data) {
          setUserInfo({
            ...userInfo
          })
          setCookie('usertoken', data?.token)
          setLoginStatus(true)
          Toast.show({
            content: '登录成功',
            icon: 'success',
            afterClose: () => {
              navigate('/message')
            }
          })
          console.log(data, 'data')
        }
      }
    )
  }
  return (
    <div className={styles.login}>
      <div className={styles.logo} />
      <div className={styles.content}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <div
              className={styles.del_touch}
              ref={accountRef}
              onClick={() => {
                setAccount('')
              }}
            >
              <span className={styles.del_u} />
            </div>
            <input
              className={styles.inputstyle}
              placeholder='QQ号码/手机/邮箱'
              value={account}
              onChange={e => {
                setAccount(e.target.value)
              }}
            />
          </li>
          <li className={styles.item}>
            <div
              className={styles.del_touch}
              ref={passwordRef}
              onClick={() => {
                setPassword('')
              }}
            >
              <span className={styles.del_u} />
            </div>
            <input
              className={styles.inputstyle}
              maxLength={16}
              type='password'
              value={password}
              onChange={e => {
                setPassword(e.target.value)
              }}
              placeholder='请输入你的QQ密码'
            />
          </li>
        </ul>
        <div
          className={styles.btn_login}
          onClick={() => {
            handleLogin()
          }}
        >
          登录
        </div>
        <div className={styles.btn_login_v2}>免登录</div>
      </div>
      <div className={styles.feedback}>
        <span className={styles.forgetpwd}>找回密码</span>
        <span className={styles.split} />
        <span
          onClick={() => {
            navigate('/register')
          }}
          className={styles.register}
        >
          新用户注册
        </span>
      </div>
    </div>
  )
}

export default Login
