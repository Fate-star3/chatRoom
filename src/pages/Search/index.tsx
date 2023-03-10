import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './index.module.scss'

import { searchGroupInfo } from '@/server/group'
import { IGroupInfo } from '@/server/type/group'
import { IUserInfo } from '@/server/type/user'
import { getAllUserInfo } from '@/server/user'
import { useModel } from '@/store'
import { asyncFetch } from '@/utils/tools'

const Search = () => {
  const navigate = useNavigate()
  const { userInfo } = useModel('user')
  const [searchValue, setSearchValue] = useState<string>('')
  const [listData, setListData] = useState<IUserInfo[]>([])
  const [groupData, setGroupData] = useState<IGroupInfo[]>([])
  useEffect(() => {
    if (!searchValue) {
      setListData([])
    } else {
      localStorage.setItem('search', searchValue)
    }
  }, [searchValue])

  useEffect(() => {
    // 本地存储搜索内容
    if (localStorage.getItem('search') && !searchValue) {
      setSearchValue(localStorage.getItem('search'))
    }
  }, [])
  const search = () => {
    if (searchValue) {
      asyncFetch(getAllUserInfo(searchValue), {
        onSuccess(result) {
          console.log(result, 'user')
          setListData(result.filter(item => item.account !== userInfo.account))
        }
      })
    }
    if (searchValue) {
      asyncFetch(searchGroupInfo(searchValue), {
        onSuccess(result) {
          console.log(result, 'group')
          setGroupData(result as any)
        }
      })
    }
  }

  const sendMessage = (account: string, item: any) => {
    navigate(`/message/detail/${account}`, { state: item })
  }
  return (
    <div className={styles.search}>
      <div className={styles.search_top}>
        <input
          type='text'
          placeholder='请输入'
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />
        <i className={styles.search_icon} onClick={() => search()} />
        <span
          onClick={() => {
            setSearchValue('')
            localStorage.removeItem('search')
            navigate(-1)
          }}
        >
          取消
        </span>
      </div>
      <div className={styles.search_container}>
        {listData.length > 0 && (
          <div className={styles.user}>
            <h2>用户</h2>
            <ul className={styles.wrap}>
              {listData.map((item, index) => {
                return (
                  <li key={index} className={styles.item}>
                    <div className={styles.list_item}>
                      <img
                        src={item?.avatar}
                        alt=''
                        onClick={() =>
                          navigate('/friendDetail', {
                            state: item
                          })
                        }
                      />
                      <div className={styles.right}>
                        <div className={styles.msg}>
                          <span className={styles.span}>{item?.name}</span>
                          <span className={styles.span_gray}>{item?.account}</span>
                        </div>
                        {userInfo.friend.filter(ele => ele.account === item.account).length ? (
                          <button
                            type='button'
                            className={styles.btn_send}
                            onClick={() => sendMessage(item.account, item)}
                          >
                            发消息
                          </button>
                        ) : (
                          <button
                            type='button'
                            className={styles.btn_send_f}
                            onClick={() => {
                              navigate('/friendDetail', {
                                state: item
                              })
                            }}
                          >
                            加好友
                          </button>
                        )}
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
        {groupData.length > 0 && (
          <div className={styles.group}>
            <h2>群组</h2>
            <ul className={styles.wrap}>
              {groupData.map((item, index) => {
                return (
                  <li key={index} className={styles.item}>
                    <div className={styles.list_item}>
                      <img
                        src={item?.avatar}
                        alt=''
                        onClick={() =>
                          navigate('/groupDetail', {
                            state: item
                          })
                        }
                      />
                      <div className={styles.right}>
                        <div className={styles.msg}>
                          <span className={styles.span}>{item?.name}</span>
                          <span className={styles.span_gray}>{item?.account}</span>
                        </div>
                        {userInfo.group.filter(ele => ele.account === item.account).length ? (
                          <button
                            type='button'
                            className={styles.btn_send}
                            onClick={() => sendMessage(item.account, item)}
                          >
                            进群聊
                          </button>
                        ) : (
                          <button
                            type='button'
                            className={styles.btn_send_f}
                            onClick={() => {
                              navigate('/addGroup', {
                                state: item
                              })
                            }}
                          >
                            加群聊
                          </button>
                        )}
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Search
