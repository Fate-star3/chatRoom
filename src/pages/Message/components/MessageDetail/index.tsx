import { Button } from 'antd-mobile'
import { memo, useEffect, useMemo, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { io } from 'socket.io-client'

import Message from './components/Message'
import styles from './index.module.scss'

import Toast from '@/components/Toast'

const MessageDetail = () => {
  const [value, setValue] = useState<string>('')
  const navigate = useNavigate()
  const { state } = useLocation()
  console.log(useLocation())
  const socket = useMemo(() => io('http://127.0.0.1:8000/'), [])
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
              navigate(`/message`)
            }}
          />
          <div className={styles.username}>{state.name}</div>
          <div className={styles.more} />
        </div>
      </header>
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
              style={{
                width: '60px',
                height: '34px',
                fontSize: '14px',
                margin: '10px 10px 0 0',
                transition: 'all 1s ease-out',
                color: '#fff',
                backgroundColor: '#07C160',
                borderRadius: '5px'
              }}
              className='submit'
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
