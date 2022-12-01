import React from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './index.module.scss'

const MessageList = () => {
  const listData = new Array(10).fill(1)
  const navigate = useNavigate()

  return (
    <div className={styles.list}>
      <ul className={styles.wrap}>
        {listData.map((item, index) => {
          return (
            <li
              key={index}
              className={styles.item}
              onClick={() => {
                navigate(`/message/detail/${index}`)
              }}
            >
              {item}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default MessageList
