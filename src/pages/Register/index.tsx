import { Form, message, Input } from 'antd'
import { Button } from 'antd-mobile'
import { LeftOutline } from 'antd-mobile-icons'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './index.module.scss'

import { RegisterUserInfo } from '@/server/user'
import { useModel } from '@/store'
import { formatParams, asyncFetch } from '@/utils/tools'

const Register = () => {
  const { setUserInfo } = useModel('user')
  const navigate = useNavigate()
  const [account, setAccount] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  /**
   * 处理注册的逻辑
   */
  const handleRegitser = () => {
    console.warn('handleRegitser', account, password)

    // 校对
    if (!formatParams(account) || !formatParams(password)) {
      message.warning('请输入信息！')
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
              account,
              password
            })
            message.success('注册成功！', 1, () => {
              navigate('/login')
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
        <Form className={styles.list}>
          <Form.Item className={styles.item}>
            <Input
              className={styles.inputstyle}
              placeholder='请输入你的chatRoom账号'
              value={account}
              onChange={e => {
                setAccount(e.target.value)
              }}
              maxLength={8}
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
          className={styles.btn_regitser}
          onClick={() => {
            handleRegitser()
          }}
        >
          注册
        </Button>
      </div>
    </div>
  )
}

export default Register
