import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'

import styles from './index.module.scss'

const MessageDetail = () => {
  const [value, setValue] = useState<string>('')
  const navigate = useNavigate()
  useEffect(() => {
    const socket = io('http://127.0.0.1:8000/')
    const messages = document.getElementById('messages') as HTMLElement
    const form = document.getElementById('form') as HTMLElement
    const input = document.getElementById('input') as HTMLInputElement

    form.addEventListener('submit', e => {
      e.preventDefault()

      if (input.value) {
        socket.emit('chat message', input.value)
        const item = document.createElement('li')

        item.innerHTML = input.value
        messages.appendChild(item)

        console.log('inputvalue', input.value)
        window.scrollTo(0, 0)
      }
    })

    socket.on('chat message', (msg: string) => {
      const item = document.createElement('li')
      console.log('msg', msg)

      item.textContent = msg
      messages.appendChild(item)
      window.scrollTo(0, document.body.scrollHeight)
    })

    socket.on('global message', (msg: string) => {
      const item = document.createElement('li')
      console.log('msg', msg)

      item.textContent = msg
      messages.appendChild(item)
      window.scrollTo(0, document.body.scrollHeight)
    })
  }, [])
  return (
    <div className={styles.detail}>
      <header className={styles.back}>
        <div
          className={styles.back_icon}
          onClick={() => {
            navigate(`/message`)
          }}
        >
          《
        </div>
      </header>
      <ul className={styles.messages} id='messages' />
      <form className={styles.form} id='form'>
        <input
          className={styles.input}
          id='input'
          type='text'
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <input type='submit' value='send' className={styles.submit} id='submit' />
      </form>
    </div>
  )
}

export default MessageDetail