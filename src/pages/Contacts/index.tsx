import { Tabs, Swiper, SwiperRef } from 'antd-mobile'
import { UserAddOutline } from 'antd-mobile-icons'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import next from '@/assets/images/next.png'

import styles from './index.module.scss'

import { useModel } from '@/store'

const Contacts = () => {
  const navigate = useNavigate()
  const { memberData, groupData } = useModel('userList')
  const { userInfo } = useModel('user')

  const swiperRef = useRef<SwiperRef>(null)
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const tabItems = [
    { key: 'friend', title: '好友' },
    { key: 'group', title: '群聊' }
  ]
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
          <div className={styles.circle}>{memberData.length - userInfo.message.length}</div>
          <div className={styles.right}>
            <img
              src={next}
              className={styles.next}
              onClick={() => {
                navigate('/friendVerification')
              }}
            />
          </div>
        </div>

        <div className={styles.group}>
          <span className={styles.left}>群通知</span>
          <div className={styles.circle}>1</div>
          <div className={styles.right}>
            <img
              src={next}
              className={styles.next}
              onClick={() => {
                navigate('/friendVerification')
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
              {memberData.map((item, index) => {
                return (
                  <li
                    key={index}
                    className={styles.item}
                    onClick={() => {
                      navigate(`/message/detail/${item.account}`, {
                        state: { name: item.name, type: item.type }
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
              {groupData.map((item, index) => {
                return (
                  <li
                    key={index}
                    className={styles.item}
                    onClick={() => {
                      navigate(`/message/detail/${item.account}`, {
                        state: { name: item.name, type: item.type }
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
