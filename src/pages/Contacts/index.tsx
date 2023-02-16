import { Tabs, Swiper, SwiperRef } from 'antd-mobile'
import { UserAddOutline } from 'antd-mobile-icons'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import next from '@/assets/images/next.png'

import styles from './index.module.scss'

import { getUserInfo } from '@/server/user'
import { useModel } from '@/store'
import { asyncFetch } from '@/utils/tools'

const Contacts = () => {
  const navigate = useNavigate()
  const { userInfo, setUserInfo } = useModel('user')

  const swiperRef = useRef<SwiperRef>(null)
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const tabItems = [
    { key: 'friend', title: '好友' },
    { key: 'group', title: '群聊' }
  ]

  useEffect(() => {
    asyncFetch(getUserInfo(userInfo?.account), {
      onSuccess(result) {
        console.log(result, '获取最新用户数据')
        // 如果有新好友的话
        if (result.newFriend.length) {
          setUserInfo(result)
        }
      }
    })
  }, [])
  return (
    <div className={styles.container}>
      <header className={styles.back}>
        <div className={styles.wrap}>
          <div className={styles.username}>联系人</div>
          <UserAddOutline
            className={styles.more}
            onClick={() => {
              navigate('/search')
            }}
          />
        </div>
      </header>
      <div className={styles.content}>
        <input
          type='text'
          className={styles.search}
          placeholder='搜索'
          onClick={() => navigate('/search')}
        />
        <div className={styles.search_icon} />
        <div className={styles.friend}>
          <span className={styles.left}> 新朋友</span>
          {userInfo?.newFriend.length > 0 && (
            <div className={styles.circle}>{userInfo?.newFriend.length}</div>
          )}
          <div className={styles.right}>
            <img
              src={next}
              className={styles.next}
              onClick={() => {
                navigate('/friendVerification', { state: { type: '新朋友' } })
              }}
            />
          </div>
        </div>

        <div className={styles.group}>
          <span className={styles.left}>群通知</span>
          {userInfo?.newGroup.length > 0 && (
            <div className={styles.circle}>{userInfo?.newGroup.length}</div>
          )}
          <div className={styles.right}>
            <img
              src={next}
              className={styles.next}
              onClick={() => {
                navigate('/friendVerification', { state: { type: '群通知' } })
              }}
            />
          </div>
        </div>
      </div>
      <footer className={styles.footer}>
        <Tabs
          activeKey={tabItems[activeIndex].key}
          onChange={key => {
            const index = tabItems.findIndex(item => item.key === key)
            setActiveIndex(index)
            swiperRef.current?.swipeTo(index)
          }}
        >
          {tabItems.map(item => (
            <Tabs.Tab title={item.title} key={item.key} />
          ))}
        </Tabs>
        <Swiper
          direction='horizontal'
          loop
          indicator={() => null}
          ref={swiperRef}
          defaultIndex={activeIndex}
          onIndexChange={index => {
            setActiveIndex(index)
          }}
        >
          <Swiper.Item>
            <div className={styles.content}>
              {userInfo?.friend.map((item, index) => {
                return (
                  <li
                    key={index}
                    className={styles.item}
                    onClick={() => {
                      userInfo.message.filter(ele => ele?.account === item?.account).length === 0 &&
                        setUserInfo({ ...userInfo, message: userInfo.message.concat(item) })
                      navigate(`/message/detail/${item?.account}`, {
                        state: item
                      })
                    }}
                  >
                    <div className={styles.list_item}>
                      <img src={item?.avatar} alt='' />
                      <div className={styles.right}>
                        <span>{item?.name}</span>
                        <p>{item?.identity}</p>
                      </div>
                    </div>
                  </li>
                )
              })}
            </div>
          </Swiper.Item>
          <Swiper.Item>
            <div className={styles.content}>
              {userInfo?.group.map((item, index) => {
                return (
                  <li
                    key={index}
                    className={styles.item}
                    onClick={() => {
                      userInfo.message.filter(ele => ele?.account === item?.account).length === 0 &&
                        setUserInfo({ ...userInfo, message: userInfo.message.concat(item as any) })
                      navigate(`/message/detail/${item?.account}`, {
                        state: item
                      })
                    }}
                  >
                    <div className={styles.list_item}>
                      <img src={item?.avatar} alt='' />
                      <div className={styles.right}>
                        <span>{item?.name}</span>
                        <p>{item?.account}</p>
                      </div>
                    </div>
                  </li>
                )
              })}
            </div>
          </Swiper.Item>
        </Swiper>
      </footer>
    </div>
  )
}

export default Contacts
