import { SwipeAction } from 'antd-mobile'
import { Action } from 'antd-mobile/es/components/swipe-action'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './index.module.scss'

import { IUserInfo } from '@/server/type/user'
import { getAllUserInfo } from '@/server/user'
import { getDate } from '@/utils/date-format'
import { asyncFetch } from '@/utils/tools'

interface IMessageList {
  userInfo: IUserInfo
}
const MessageList: React.FC<IMessageList> = props => {
  const { userInfo } = props
  const navigate = useNavigate()
  const [listData, setListData] = useState<IUserInfo[]>([])
  useEffect(() => {
    asyncFetch(getAllUserInfo(''), {
      onSuccess(result) {
        console.log(result)
        result.forEach(item => {
          item.isTop = false
        })

        if (!localStorage.getItem('list')) {
          console.log('resultgetItem')
          setListData(JSON.parse(localStorage.getItem('list')))
        } else {
          console.log('result')
          setListData(result.filter(item => item.account !== userInfo.account))
        }
      }
    })
  }, [])
  useEffect(() => {
    if (listData.length) {
      localStorage.setItem('list', JSON.stringify(listData))
      console.log('localStorage')
    }
  }, [listData])

  const rightActions: Action[] = [
    {
      key: 'top',
      text: '置顶',
      color: 'primary'
    },
    {
      key: 'delete',
      text: '删除',
      color: 'danger'
    }
  ]

  const rightActionsTop: Action[] = [
    {
      key: 'failtop',
      text: '取消置顶',
      color: 'primary'
    },
    {
      key: 'delete',
      text: '删除',
      color: 'danger'
    }
  ]

  return (
    <div className={styles.list}>
      <ul className={styles.wrap}>
        {listData.map((item, index) => {
          return (
            <SwipeAction
              key={index}
              closeOnTouchOutside
              rightActions={item?.isTop ? rightActionsTop : rightActions}
              onAction={(action: Action) => {
                const { key } = action
                if (key === 'delete') {
                  setListData(pre => pre.filter(element => element.account !== item.account))
                }
                if (key === 'top') {
                  const tempData = listData.slice()
                  const deleteData = tempData.splice(index, 1)
                  item.isTop = true
                  setListData([...deleteData, ...tempData])
                }
                if (key === 'failtop') {
                  item.isTop = false
                  const tempData = listData.slice().filter(item => item.isTop)
                  const topData = listData.slice().filter(item => !item.isTop)

                  setListData([...tempData, ...topData])
                }
                // console.log(action, listData)
              }}
            >
              <li
                key={index}
                style={{
                  backgroundColor: `${item?.isTop ? '#eee' : '#fff'}`
                }}
                className={styles.item}
                onClick={() => {
                  navigate(`/message/detail/${item.account}`, { state: { name: item.name } })
                }}
              >
                <div className={styles.list_item}>
                  <img src={item?.avatar} alt='' />
                  <div className={styles.circle}>1</div>
                  <div className={styles.right}>
                    <span>{item?.name}</span>
                    <p>{item?.identity}</p>
                  </div>
                  <div className={styles.time}>{getDate(item?.date)}</div>
                </div>
              </li>
            </SwipeAction>
          )
        })}
      </ul>
    </div>
  )
}

export default MessageList
