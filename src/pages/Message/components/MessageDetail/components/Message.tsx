import React from 'react'

import styles from './index.module.scss'

interface IMessageProps {
  avatar: string
  content?: any
  singleImage?: string
}
const Message: React.FC<IMessageProps> = props => {
  const { avatar, content, singleImage } = props

  return (
    <div className={styles.message}>
      <div className={styles.content}>
        {content &&
          content.map((item: { name: string; text: any; src: string }, index: React.Key) => {
            return (
              <span key={index}>
                {item.name === 'text' && item.text}
                {item.name === 'img' && <img src={item.src} />}
              </span>
            )
          })}
        {singleImage && <img src={singleImage} className={styles.singleImage} />}
      </div>
      <img src={avatar} alt='' className={styles.avatar} />
    </div>
  )
}

export default Message
