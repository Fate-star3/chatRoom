import React, { useEffect, useState, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './index.module.scss'

import useDebounce from '@/hooks/useDebounce'
import { IUserInfo } from '@/server/type/user'
import { getAllUserInfo } from '@/server/user'
import { asyncFetch } from '@/utils/tools'

const Search = () => {
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState<string>('')
  const [listData, setListData] = useState<IUserInfo[]>([])
  useEffect(() => {
    if (searchValue) {
      asyncFetch(getAllUserInfo(searchValue), {
        onSuccess(result) {
          console.log(result)
          setListData(result)
        }
      })
    }
  }, [searchValue])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)
  }
  return (
    <div className={styles.search}>
      <div className={styles.search_top}>
        <input
          type='text'
          placeholder='请输入'
          value={searchValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            handleChange(e)
          }}
        />
        <i className={styles.search_icon} />
        <span onClick={() => navigate(-1)}>取消</span>
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
                          <span
                            // eslint-disable-next-line react/no-danger
                            dangerouslySetInnerHTML={{ __html: item?.name }}
                            className={styles.span}
                          />
                          <span
                            // eslint-disable-next-line react/no-danger
                            dangerouslySetInnerHTML={{ __html: item?.account }}
                            className={styles.span}
                          />
                        </div>
                        {item.status ? (
                          <button type='button' className={styles.btn_send_f}>
                            加好友
                          </button>
                        ) : (
                          <button type='button' className={styles.btn_send}>
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
