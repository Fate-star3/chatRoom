import React, { useEffect, useState, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './index.module.scss'

import useDebounce from '@/hooks/useDebounce'

const Search = () => {
  const navigate = useNavigate()
  const mockData = [
    {
      imgSrc:
        'https://yach-static.zhiyinlou.com/online/jsapi/1665281276537/jde9gmmno8/3d040adc-e2b0-4629-9c0f-b7487334af5e.png',
      name: '琪琪宝宝',
      description: '一般用在表单页进行信息的收集',
      email: '1847749125',
      isFriend: 0
    },
    {
      imgSrc:
        'https://yach-static.zhiyinlou.com/online/jsapi/1665281276537/jde9gmmno8/3d040adc-e2b0-4629-9c0f-b7487334af5e.png',
      name: '轩轩宝宝',
      description: '一般用在表单页进行信息的收集',
      email: '1947749125',
      isFriend: 1
    },
    {
      imgSrc:
        'https://yach-static.zhiyinlou.com/online/jsapi/1665281276537/jde9gmmno8/3d040adc-e2b0-4629-9c0f-b7487334af5e.png',
      name: '叶子宝宝',
      description: '一般用在表单页进行信息的收集',
      email: '1547749125',
      isFriend: 0
    },
    {
      imgSrc:
        'https://yach-static.zhiyinlou.com/online/jsapi/1665281276537/jde9gmmno8/3d040adc-e2b0-4629-9c0f-b7487334af5e.png',
      name: '大海宝宝',
      description: '一般用在表单页进行信息的收集',
      email: '1647749125',
      isFriend: 1
    },
    {
      imgSrc:
        'https://yach-static.zhiyinlou.com/online/jsapi/1665281276537/jde9gmmno8/3d040adc-e2b0-4629-9c0f-b7487334af5e.png',
      name: '大哥大',
      description: '一般用在表单页进行信息的收集',
      email: '1647749125',
      isFriend: 0
    }
  ]
  const [listData, setListData] = useState([])

  const _handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const newListData = []

    for (let i = 0; i < mockData.length; i++) {
      if (mockData[i].name.search(value) !== -1 || mockData[i].email.search(value) !== -1) {
        mockData[i].name = mockData[i].name.replace(
          value,
          `<span
            style='color:#54AFFF'
          >
        ${value}
          </span > `
        )
        mockData[i].email = mockData[i].email.replace(
          value,
          `<span
            style='color:#54AFFF'
          >
        ${value}
          </span > `
        )
        newListData.push(mockData[i])
      }
    }
    console.warn('newListData', newListData)

    setListData(newListData)
  }
  const handleChange = useDebounce(_handleChange, 1000)
  return (
    <div className={styles.search}>
      <div className={styles.search_top}>
        <input
          type='text'
          placeholder='请输入'
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
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
                      <img src={item?.imgSrc} alt='' />
                      <div className={styles.right}>
                        <div className={styles.msg}>
                          <span
                            // eslint-disable-next-line react/no-danger
                            dangerouslySetInnerHTML={{ __html: item?.name }}
                            className={styles.span}
                          />
                          <span
                            // eslint-disable-next-line react/no-danger
                            dangerouslySetInnerHTML={{ __html: item?.email }}
                            className={styles.span}
                          />
                        </div>
                        {item.isFriend ? (
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
