import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import groupImg from '@/assets/images/group.png'

import styles from './index.module.scss'

const CreateGroup = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  const [groupName, setGroupName] = useState<string>('')
  console.log(state)

  return (
    <div className={styles.container}>
      <header className={styles.back}>
        <div className={styles.wrap}>
          <div
            className={styles.back_icon}
            onClick={() => {
              navigate(`/message`)
            }}
          >
            取消
          </div>
          <div className={styles.groupname}>创建群聊</div>
        </div>
      </header>
      <div className={styles.content}>
        <div className={styles.group_img}>
          <img src={groupImg} alt='' />
        </div>
        <input
          type='text'
          placeholder='请输入群名称'
          className={styles.group_input}
          value={groupName}
          onChange={e => setGroupName(e.target.value)}
        />
        <div className={styles.user}>
          <h4>用户</h4>
          {/* <ul>
            {JSON.parse(listData).map((item, index) => {
              return (
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
                    <span>{item?.name}</span>
                  </div>
                </li>
              )
            })}
          </ul> */}
        </div>
        <div
          className={styles.create}
          onClick={() => {
            navigate('/message')
          }}
        >{`创建${1}`}</div>
      </div>
    </div>
  )
}

export default CreateGroup
