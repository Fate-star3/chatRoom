import React, { useEffect, useState, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './index.module.scss'

import { IUserInfo } from '@/server/type/user'
import { getAllUserInfo } from '@/server/user'
import { asyncFetch } from '@/utils/tools'

const Search = () => {
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState<string>('')
  const [listData, setListData] = useState<IUserInfo[]>([])
  useEffect(() => {
    // 本地存储搜索内容

    if (localStorage.getItem('search') && !searchValue) {
      setSearchValue(localStorage.getItem('search'))
    }
    if (!searchValue) {
      setListData([])
    } else {
      localStorage.setItem('search', searchValue)
    }
  }, [searchValue])
  const search = () => {
    if (searchValue) {
      asyncFetch(getAllUserInfo(searchValue), {
        onSuccess(result) {
          console.log(result)
          setListData(result)
        }
      })
    } else {
    }
  }

  const sendMessage = (account, name) => {
    navigate(`/message/detail/${account}`, { state: { name } })
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
      {listData.length && (
        <div className={styles.search_container}>
          <div className={styles.user}>
            <h2>用户</h2>
            <ul className={styles.wrap}>
              {listData.map((item, index) => {
                return (
                  <li key={index} className={styles.item}>
                    <div className={styles.list_item}>
                      <img src={item?.avatar} alt='' />
                      <div className={styles.right}>
                        <div className={styles.msg}>
                          <span className={styles.span}>{item?.name}</span>
                          <span className={styles.span}>{item?.account}</span>
                        </div>
                        {!item.status ? (
                          <button
                            type='button'
                            className={styles.btn_send_f}
                            onClick={() => {
                              navigate('/friendDetail', {
                                state: {
                                  name: item?.name,
                                  avatar: item?.avatar,
                                  signature: item?.signature
                                }
                              })
                            }}
                          >
                            加好友
                          </button>
                        ) : (
                          <button
                            type='button'
                            className={styles.btn_send}
                            onClick={() => sendMessage(item.account, item.name)}
                          >
                            发消息
                          </button>
                        )}
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
          {/* <div className={styles.group}>
          <h2>群组</h2>
          <ul className={styles.wrap}>
            {listData.map((item, index) => {
              return (
                <li key={index} className={styles.item}>
                  <div className={styles.list_item}>
                    <img src={item?.imgSrc} alt='' />
                    <div className={styles.right}>
                      <div className={styles.msg}>
                        <span>{item?.name}</span>
                        <span>{item?.email}</span>
                      </div>
                      <button type='button' className={styles.btn_send}>
                        发消息
                      </button>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div> */}
        </div>
      )}
    </div>
  )
}

export default Search
