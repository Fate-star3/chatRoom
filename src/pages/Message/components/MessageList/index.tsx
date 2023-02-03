import { SwipeAction } from 'antd-mobile'
import { Action } from 'antd-mobile/es/components/swipe-action'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './index.module.scss'

import { useModel } from '@/store'
import { getDate } from '@/utils/date-format'

const MessageList = () => {
  const { listData, setListData, groupData, setGroupData } = useModel('userList')
  const navigate = useNavigate()
  useEffect(() => {
    localStorage.removeItem('list')
    if (localStorage.getItem('group')) {
      console.log(listData, '----------------')

      setListData(listData.slice(0, listData.length).concat(groupData as any))
    }
  }, [])

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
                  navigate(`/message/detail/${item.account}`, {
                    state: { name: item.name, type: item.type }
                  })
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
        {/* {groupData.map((item, index) => {
          return (
            <SwipeAction
              key={index}
              closeOnTouchOutside
              rightActions={item?.isTop ? rightActionsTop : rightActions}
              onAction={(action: Action) => {
                const { key } = action
                if (key === 'delete') {
                  setGroupData(pre => pre.filter(element => element.group_name !== item.group_name))
                }
                if (key === 'top') {
                  const tempData = groupData.slice()
                  const deleteData = tempData.splice(index, 1)
                  item.isTop = true
                  setGroupData([...deleteData, ...tempData])
                }
                if (key === 'failtop') {
                  item.isTop = false
                  const tempData = groupData.slice().filter(item => item.isTop)
                  const topData = groupData.slice().filter(item => !item.isTop)

                  setGroupData([...tempData, ...topData])
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
                  navigate(`/message/detail/${item.group_name}`, {
                    state: { name: item.group_name }
                  })
                }}
              >
                <div className={styles.list_item}>
                  <img src={item?.group_avatar} alt='' />
                  <div className={styles.circle}>1</div>
                  <div className={styles.right}>
                    <span>{item?.group_name}</span>
                  </div>
                  <div className={styles.time}>{getDate(item?.date)}</div>
                </div>
              </li>
            </SwipeAction>
          )
        })} */}
      </ul>
    </div>
  )
}

export default MessageList
