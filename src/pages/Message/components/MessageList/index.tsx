import React from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './index.module.scss'

import { IUserInfo } from '@/server/type/user'
import dateFormat, { getDate } from '@/utils/date-format'

interface IMessageList {
  userInfo: IUserInfo
}
const MessageList: React.FC<IMessageList> = props => {
  const { userInfo } = props
  const listData = new Array(10).fill({
    imgSrc:
      'https://yach-static.zhiyinlou.com/online/jsapi/1665281276537/jde9gmmno8/3d040adc-e2b0-4629-9c0f-b7487334af5e.png',
    name: '琪琪宝宝',
    description: '一般用在表单页进行信息的收集'
  })
  const navigate = useNavigate()
  // console.warn(userInfo?.date)

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
              <div className={styles.list_item}>
                <img src={item?.imgSrc} alt='' />
                <div className={styles.circle}>1</div>
                <div className={styles.right}>
                  <span>{item?.name}</span>
                  <p>{item.description}</p>
                </div>
                <div className={styles.time}>{getDate(dateFormat(userInfo?.date))}</div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default MessageList
