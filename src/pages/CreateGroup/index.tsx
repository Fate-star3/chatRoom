import { Toast } from 'antd-mobile'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import checkImg from '@/assets/images/Group 2@2x.png'
import groupImg from '@/assets/images/group.png'

import styles from './index.module.scss'

import { createGroup } from '@/server/group'
import { IUserInfo } from '@/server/type/user'
import { useModel } from '@/store'
import { asyncFetch } from '@/utils/tools'

const CreateGroup = () => {
  const navigate = useNavigate()
  const { listData, memberData, setMemberData, setListData } = useModel('userList')
  const [groupName, setGroupName] = useState<string>('')
  useEffect(() => {
    console.log('清除缓存')
    listData.forEach(item => {
      item.isCheck = false
      setListData(listData.slice())
    })
  }, [])
  // 创建 群聊
  const create = () => {
    if (!groupName) {
      return Toast.show('请输入群聊名称')
    }
    asyncFetch(
      createGroup({
        name: groupName || '',
        member: listData.filter(item => item.isCheck) || []
      }),
      {
        onSuccess(result?) {
          setMemberData(pre => pre.concat(result as IUserInfo))
          console.log(result)
        },
        onFinish() {
          navigate(`/messageDetail/${groupName}`)
        }
      }
    )
  }
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
          <ul>
            {listData.map((item, index) => {
              return (
                <li key={index} className={styles.item}>
                  <div
                    onClick={() => {
                      item.isCheck = !item.isCheck
                      console.log('listData', listData)
                      setListData([...listData])
                    }}
                  >
                    {item.isCheck ? (
                      <div className={styles.circle}>
                        <img src={checkImg} className={styles.check} />
                      </div>
                    ) : (
                      <div className={styles.circle} />
                    )}
                  </div>
                  <img
                    src={item?.avatar}
                    onClick={() => {
                      navigate(`/friendDetail`, {
                        state: { name: item.name, avatar: item.avatar, signature: item.signature }
                      })
                    }}
                    className={styles.avatar}
                  />
                  <span>{item?.name}</span>
                </li>
              )
            })}
          </ul>
        </div>
        <div className={styles.create} onClick={() => create()}>
          {`创建${listData.filter(item => item.isCheck).length || ''}`}
        </div>
      </div>
    </div>
  )
}

export default CreateGroup
