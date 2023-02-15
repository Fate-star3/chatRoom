import { message } from 'antd'
import { Button, Input, Toast } from 'antd-mobile'
import { LeftOutline } from 'antd-mobile-icons'
import { useState } from 'react'
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
              account,
              password,
              name: data.name,
              email: data.email,
              avatar: data.avatar,
              identity: data.identity,
              date: data.date,
              signature: data.signature,
              sex: data.sex,
              birthday: data.birthday,
              message: data.message,
              type: data.type
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
        <ul className={styles.list}>
          <li className={styles.item}>
            <Input
              className={styles.inputstyle}
              placeholder='请输入你的chatRoom账号'
              value={account}
              onChange={value => {
                setAccount(value)
              }}
              maxLength={8}
              clearable
            />
          </li>
          <li className={styles.item}>
            <Input
              className={styles.inputstyle}
              maxLength={16}
              type='password'
              value={password}
              onChange={value => {
                setPassword(value)
              }}
              placeholder='请输入你的chatRoom密码'
              clearable
            />
          </li>
        </ul>

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
