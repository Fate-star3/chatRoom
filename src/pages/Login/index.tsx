import { Form, message, Input } from 'antd'
import { Button, Dialog } from 'antd-mobile'
// import { decode, verify } from 'jsonwebtoken'
import { Action } from 'antd-mobile/es/components/dialog'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './index.module.scss'

import { LoginUserInfo, updateUserInfo } from '@/server/user'
import { useModel } from '@/store'
import { getCookie, setCookie } from '@/utils/storage'
import { formatParams, asyncFetch } from '@/utils/tools'

const Login = () => {
  const { userInfo, setLoginStatus, setUserInfo } = useModel('user')
  const navigate = useNavigate()
  const [account, setAccount] = useState<string>(userInfo?.account || '')
  const [password, setPassword] = useState<string>(
    getCookie('userinfo') && userInfo?.password.length <= 20 ? userInfo?.password : ''
  )
  const [visible, setvisible] = useState<boolean>(false)

  const send = action => {
    if (action.key === 'delete') {
      handleLogin(false)
    }
    setvisible(false)
  }
  /**
   * 处理登录的逻辑
   */
  const handleLogin = (flag = true) => {
    if (!formatParams(account) || !formatParams(password)) {
      message.error('请输入信息')
    }
    // 处理接口
    asyncFetch(
      LoginUserInfo({
        account,
        password
      }),
      {
        onSuccess(data) {
          console.log(userInfo, data, 'login')
          if (data.status && flag) {
            return setvisible(true)
          }
          asyncFetch(updateUserInfo({ ...data, status: true }), {
            onFinish() {
              message.success('登录成功', 1, () => {
                navigate('/message')
              })
            }
          })
          setUserInfo({ ...data, status: true, token: data?.token })
          setCookie('usertoken', data?.token)
          setLoginStatus(true)
        }
      }
    )
  }
  return (
    <div className={styles.login}>
      <div className={styles.logo} />
      <div className={styles.content}>
        <Form className={styles.list}>
          <Form.Item className={styles.item}>
            <Input
              className={styles.inputstyle}
              placeholder='请输入你的chatRoom账号'
              value={account}
              onChange={e => {
                setAccount(e.target.value)
              }}
              allowClear
              autoComplete='off'
            />
          </Form.Item>
          <Form.Item className={styles.item}>
            <Input
              className={styles.inputstyle}
              maxLength={16}
              type='password'
              value={password}
              onChange={e => {
                setPassword(e.target.value)
              }}
              placeholder='请输入你的chatRoom密码'
              allowClear
              autoComplete='off'
            />
          </Form.Item>
        </Form>
        <Button
          className={styles.btn_login}
          onClick={() => {
            handleLogin()
          }}
        >
          登录
        </Button>
        <Button className={styles.btn_login_v2} onClick={() => message.info('该功能未开发')}>
          免登录
        </Button>
      </div>
      <div className={styles.feedback}>
        <span className={styles.forgetpwd} onClick={() => message.info('该功能未开发')}>
          找回密码
        </span>
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
      <Dialog
        visible={visible}
        content='该账号已有用户登录，是否继续登录？'
        actions={[
          [
            {
              key: 'cancel',
              text: '取消'
            },
            {
              key: 'delete',
              text: '确定',
              bold: true,
              danger: true
            }
          ]
        ]}
        onAction={(action: Action) => send(action)}
      />
    </div>
  )
}

export default Login
