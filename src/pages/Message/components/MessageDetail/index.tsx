import { Button } from 'antd-mobile'
import { UserAddOutline } from 'antd-mobile-icons'
import { memo, useEffect, useMemo, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { io } from 'socket.io-client'

import Message from './components/Message'
import styles from './index.module.scss'

import Toast from '@/components/Toast'
import { useModel } from '@/store'

const MessageDetail = () => {
  const { userInfo } = useModel('user')
  const [value, setValue] = useState<string>('')
  const navigate = useNavigate()
  const { state } = useLocation()

  const socket = io(
    process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8000' : 'http://47.97.80.211:8000'
  )
  const messages = document.getElementById('messages') as HTMLElement
  const input = document.getElementById('input') as HTMLInputElement

  const sendMessage = () => {
    if (input.value) {
      socket.timeout(3000).emit('chat message', input.value, (err, args) => {
        if (err) {
          Toast.show(err)
        }
        console.log(args)
      })
      const item = document.createElement('li')

      item.innerHTML = input.value
      messages.appendChild(item)
      window.scrollTo(0, 0)
      setValue('')
    }
  }
  // socket.on('global message', args => {
  //   console.log(args, 'global')
  // })
  useEffect(() => {
    document.addEventListener('keydown', e => {
      if (e.keyCode === 13) {
        sendMessage()
      }
    })
    return () => {
      document.removeEventListener('keydown', e => {
        if (e.keyCode === 13) {
          sendMessage()
        }
      })
    }
  }, [value])

  return (
    <div className={styles.detail}>
      <header className={styles.back}>
        <div className={styles.wrap}>
          <div
            className={styles.back_icon}
            onClick={() => {
              navigate(-1)
            }}
          />
          <div className={styles.username}>{state.name}</div>
          <div
            className={styles.more}
            onClick={() => {
              if (state.type === 'group') {
                navigate('/groupDetail')
              } else {
                navigate('/friendDetail', {
                  state: {
                    name: state.name,
                    avatar: state.avatar,
                    signature: state.signature,
                    account: state.account
                  }
                })
              }
            }}
          />
        </div>
      </header>
      {userInfo.friend.filter(item => item.account === state.account).length === 0 &&
        userInfo.group.filter(item => item.account === state.account).length === 0 && (
          <div className={styles.warning}>
            <div className={styles.left}>
              <UserAddOutline />
              <span>加入黑名单</span>
            </div>

            <div className={styles.right} onClick={() => navigate('/search')}>
              <UserAddOutline />
              <span>加为好友</span>
            </div>
          </div>
        )}
      <ul className={styles.messages} id='messages' />
      <div className={styles.form}>
        <div className={styles.container}>
          <div className={styles.voice} />
          <input
            className={styles.input}
            id='input'
            type='text'
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <div className={styles.expression} />
          {value ? (
            <Button
              type='submit'
              className={styles.submit}
              onClick={e => {
                e.preventDefault()
                sendMessage()
              }}
            >
              发送
            </Button>
          ) : (
            <div className={styles.func} />
          )}
        </div>
      </div>
    </div>
  )
}

export default memo(MessageDetail)
