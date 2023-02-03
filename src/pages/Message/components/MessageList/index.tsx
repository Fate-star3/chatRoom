import { SwipeAction } from 'antd-mobile'
import { Action } from 'antd-mobile/es/components/swipe-action'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './index.module.scss'

import { IUserInfo } from '@/server/type/user'
import { getDate } from '@/utils/date-format'

interface IMessageList {
  userInfo: IUserInfo
  listData: IUserInfo[]
  setListData: (value: any) => void
}
const MessageList: React.FC<IMessageList> = props => {
  const { userInfo, listData, setListData } = props
  const navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem('list')) {
      setListData(JSON.parse(localStorage.getItem('list')))
    } else {
      setListData(listData.filter(item => item.account !== userInfo.account))
    }
  }, [])
  useEffect(() => {
    if (listData.length) {
      localStorage.setItem('list', JSON.stringify(listData))
      console.log('消息列表并保存到localStorage!')
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
