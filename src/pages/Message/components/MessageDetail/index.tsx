import { Button } from 'antd-mobile'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'

import Message from './components/Message'
import styles from './index.module.scss'

import { useModel } from '@/store'

const MessageDetail = () => {
  const { userInfo } = useModel('user')
  const [value, setValue] = useState<string>('')
  const navigate = useNavigate()
  const socket = io('http://127.0.0.1:8000/')
  const messages = document.getElementById('messages') as HTMLElement
  const input = document.getElementById('input') as HTMLInputElement

  const sendMessage = () => {
    if (input.value) {
      socket.emit('chat message', input.value)
      // const item = document.createElement('li')

      // item.innerHTML = input.value
      // messages.appendChild(item)

      // console.log('inputvalue', input.value)
      // window.scrollTo(0, 0)
    }
  }
  useEffect(() => {
    socket.on('chat message', (msg: string) => {
      const item = document.createElement('li')

      console.log('msg', msg)

      item.textContent = msg
      messages.appendChild(item)
      // messages.appendChild(Message)
      window.scrollTo(0, document.body.scrollHeight)
    })

    // socket.on('global message', (msg: string) => {
    //   const item = document.createElement('li')
    //   console.log('msg', msg)

    //   item.textContent = msg
    //   messages.appendChild(item)
    //   window.scrollTo(0, document.body.scrollHeight)
    // })
  }, [])
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
          <div className={styles.username}>{userInfo?.name}</div>
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

export default MessageDetail
