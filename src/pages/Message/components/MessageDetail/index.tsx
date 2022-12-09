import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'

import styles from './index.module.scss'

import { useModel } from '@/store'

const MessageDetail = () => {
  const { userInfo, setUserInfo } = useModel('user')
  const [value, setValue] = useState<string>('')
  const navigate = useNavigate()
  // useEffect(() => {
  //   const socket = io('http://127.0.0.1:8000/')
  //   const messages = document.getElementById('messages') as HTMLElement
  //   const form = document.getElementById('form') as HTMLElement
  //   const input = document.getElementById('input') as HTMLInputElement
  //   const fn = e => {
  //     e.preventDefault()

  //     if (input.value) {
  //       socket.emit('chat message', input.value)
  //       const item = document.createElement('li')

  //       item.innerHTML = input.value
  //       messages.appendChild(item)

  //       console.log('inputvalue', input.value)
  //       window.scrollTo(0, 0)
  //     }
  //   }
  //   form.addEventListener('submit', fn)

  //   socket.on('chat message', (msg: string) => {
  //     const item = document.createElement('li')
  //     console.log('msg', msg)

  //     item.textContent = msg
  //     messages.appendChild(item)
  //     window.scrollTo(0, document.body.scrollHeight)
  //   })

  //   socket.on('global message', (msg: string) => {
  //     const item = document.createElement('li')
  //     console.log('msg', msg)

  //     item.textContent = msg
  //     messages.appendChild(item)
  //     window.scrollTo(0, document.body.scrollHeight)
  //   })
  //   return () => {
  //     form.removeEventListener('submit', fn)
  //   }
  // }, [])
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
          <div className={styles.username}>{userInfo.name}</div>
          <div className={styles.more} />
        </div>
      </header>
      <ul className={styles.messages} id='messages' />
      <form className={styles.form} id='form'>
        <div className='container'>
          <div className='voice' />
          <input
            className={styles.input}
            id='input'
            type='text'
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <div className='expression' />
          <div className='func' />
        </div>

        {/* <input type='submit' value='send' className={styles.submit} id='submit' /> */}
      </form>
    </div>
  )
}

export default MessageDetail
