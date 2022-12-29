import { Toast } from 'antd-mobile'
import { LeftOutline } from 'antd-mobile-icons'
import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './index.module.scss'

import { RegisterUserInfo } from '@/server/user'
import { useModel } from '@/store'
import { formatParams, asyncFetch } from '@/utils/tools'

const Register = () => {
  const { userInfo, setUserInfo } = useModel('user')
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
   * 处理注册的逻辑
   */
  const handleRegitser = () => {
    console.warn('handleRegitser', account, password)

    // 校对
    if (!formatParams(account) || !formatParams(password)) {
      Toast.show({
        content: '请输入信息！',
        icon: 'fail'
      })
    } else {
      // 处理接口
      asyncFetch(
        RegisterUserInfo({
          account,
          password
        }),
        {
          onSuccess(data) {
            setUserInfo({
              ...userInfo,
              account,
              password,
              name: data.name,
              email: data.email,
              avatar: data.avatar,
              indentify: data.indentify,
              date: data.date
            })
            Toast.show({
              content: '注册成功！',
              icon: 'success',
              afterClose: () => {
                navigate('/login')
              }
            })

            console.log(data, 'data')
          }
        }
      )
    }
  }
  return (
    <div className={styles.regitser}>
      <LeftOutline
        onClick={() => {
          navigate('/login')
        }}
      />
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
          className={styles.btn_regitser}
          onClick={() => {
            handleRegitser()
          }}
        >
          注册
        </div>
      </div>
    </div>
  )
}

export default Register
