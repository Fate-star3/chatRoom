import React from 'react'

import styles from './index.module.scss'

interface IMessageProps {
  avatar: string
  content?: any
  singleImage?: string
  className?: string
}
const Message: React.FC<IMessageProps> = props => {
  const { avatar, content, singleImage, className } = props
  console.log(content)

  return (
    <div className={styles[className]}>
      {className === 'message_friend' && <img src={avatar} alt='' className={styles.avatar} />}
      {content && (
        <div className={styles.content}>
          {content.map((item: { name: string; text: any; src: string }, index: React.Key) => {
            return (
              <span key={index}>
                {item.name === 'text' && item.text}
                {item.name === 'img' && <img src={item.src} />}
              </span>
            )
          })}
          {singleImage && <img src={singleImage} className={styles.singleImage} />}
        </div>
      )}
      {className === 'message' && <img src={avatar} alt='' className={styles.avatar} />}
    </div>
  )
}

export default Message
