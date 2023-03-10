import { Input, Modal } from 'antd'
import { Button } from 'antd-mobile'
import { UserAddOutline } from 'antd-mobile-icons'
import { ChangeEvent, memo, SetStateAction, useEffect, useMemo, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import face from '@/assets/images/表情@2x.png'

import Message from './components/Message'
import styles from './index.module.scss'

import Map from '@/components/Map'
import { socket } from '@/server/common'
import { useModel } from '@/store'
import { decodeText } from '@/utils/decodeText'
import { faceUrl, bigEmojiList, emojiMap, emojiName, emojiUrl } from '@/utils/emojiMap'
import { getDisplayTime } from '@/utils/tools'

interface IChatList {
  avatar: string
  text?: string
  singleImage?: string
  className?: string
}
const MessageDetail = () => {
  const { userInfo, setUserInfo } = useModel('user')
  const navigate = useNavigate()
  const { state } = useLocation()
  const { type } = state
  // 输入框的值
  const [value, setValue] = useState<string>('')
  // 图片功能是否可见
  const [faceVisible, setFaceVisible] = useState<boolean>(false)
  // 更多功能是否可见
  const [moreVisible, setMoreVisible] = useState<boolean>(false)
  // 图片tab切换
  const [tabsVisible, setTabsVisible] = useState<number>(0)
  // 发单张图片
  const [singleImage, setSingleImage] = useState<string>('')
  // 存储消息的队列
  const [chatList, setChatList] = useState<IChatList[]>(
    JSON.parse(localStorage.getItem(`${state.account}chatList`)) || []
  )
  const [mapVisible, setMapVisible] = useState<boolean>(false)
  const [address, setAdddress] = useState<string>('')
  console.log(state)

  const sendMessage = (image?: SetStateAction<string>, address?: string) => {
    if (type === 'user') {
      const msg = {
        val: value,
        myId: userInfo.account,
        friendId: state.account
      }
      socket.timeout(3000).emit('chat message', msg)
    } else {
      const msg = {
        val: value,
        myId: userInfo.account,
        groupId: state.account
      }
      socket.timeout(3000).emit('group message', msg)
    }
    if (image) {
      setSingleImage(image)
    } else {
      setChatList(pre =>
        pre.concat({
          avatar: userInfo.avatar,
          text: address || value,
          singleImage,
          className: 'message'
        })
      )
      setValue('')
    }

    // console.log(value, singleImage)
  }
  useEffect(() => {
    if (singleImage) {
      // 存在输入框有文字，又想发送表情的时候
      if (value) {
        setChatList(pre =>
          pre.concat({
            avatar: userInfo.avatar,
            text: '',
            singleImage,
            className: 'message'
          })
        )
      } else {
        setChatList(pre =>
          pre.concat({
            avatar: userInfo.avatar,
            text: '',
            singleImage,
            className: 'message'
          })
        )
      }
      // 发送成功后清除
      setSingleImage('')
    }
  }, [singleImage, value])

  useEffect(() => {
    socket.on('group message', data => {
      console.log(data, 'global')
      if (value && singleImage) {
        setChatList(pre =>
          pre.concat({
            avatar: state.avatar,
            text: '',
            singleImage,
            className: 'message_friend'
          })
        )
      } else {
        setChatList(pre =>
          pre.concat({
            avatar: state.avatar,
            text: data,
            singleImage,
            className: 'message_friend'
          })
        )
      }
    })
  }, [])

  useEffect(() => {
    socket.on('chat message', (data, callback) => {
      console.log('接受的消息', data)
      if (value && singleImage) {
        setChatList(pre =>
          pre.concat({
            avatar: state.avatar,
            text: '',
            singleImage,
            className: 'message_friend'
          })
        )
      } else {
        setChatList(pre =>
          pre.concat({
            avatar: state.avatar,
            text: data,
            singleImage,
            className: 'message_friend'
          })
        )
      }
    })
  }, [])

  useEffect(() => {
    chatList.length > 0 &&
      localStorage.setItem(`${state.account}chatList`, JSON.stringify(chatList))
  }, [chatList])

  // 用户刚进入聊天界面或点击表情按钮，聊天信息会自动定位到底部
  useEffect(() => {
    document.getElementById('messages').scrollIntoView(false)
  }, [faceVisible, moreVisible, chatList])

  // 发送图片
  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0]

    const reader = new FileReader()

    reader.addEventListener('load', e => {
      console.log('img')

      sendMessage(e.target.result as string)
    })
    if (file) {
      reader.readAsDataURL(file)
    }
    console.log(file)
  }

  const handleOk = () => {
    setMapVisible(false)
    sendMessage('', `我的地址：${address}`)
  }
  // 地址定位后的回调
  const complete = data => {
    console.log(data)
    setAdddress(data)
  }
  return (
    <div className={styles.detail}>
      <header className={styles.back}>
        <div className={styles.wrap}>
          <div
            className={styles.back_icon}
            onClick={() => {
              navigate(-1)
            }}
          />
          <div className={styles.username}>{state.name}</div>
          <div
            className={styles.more}
            onClick={() => {
              if (state.type === 'group') {
                navigate('/groupDetail', {
                  state
                })
              } else {
                navigate('/friendDetail', {
                  state
                })
              }
            }}
          />
        </div>
      </header>
      {state.type === 'user' &&
        userInfo.friend.filter(item => item.account === state.account).length === 0 && (
          <div className={styles.warning}>
            <div className={styles.left}>
              <UserAddOutline />
              <span>加入黑名单</span>
            </div>

            <div className={styles.right} onClick={() => navigate('/addFriend', { state })}>
              <UserAddOutline />
              <span>加为好友</span>
            </div>
          </div>
        )}
      <ul
        className={styles.messages}
        id='messages'
        style={{
          marginTop: `${
            userInfo.friend.filter(item => item.account === state.account).length === 0
              ? '66px'
              : ''
          }`,
          paddingBottom: `${faceVisible || moreVisible ? '330px' : '49px'}`
        }}
        onClick={() => {
          setFaceVisible(false)
          setMoreVisible(false)
        }}
      >
        {chatList.map((item, index) => {
          return (
            <Message
              className={item.className}
              key={index}
              content={decodeText({ text: item.text })}
              avatar={item.avatar}
              singleImage={item.singleImage}
            />
          )
        })}
      </ul>
      <div className={styles.form}>
        <div className={styles.container}>
          <div className={styles.voice} />
          <Input.TextArea
            className={styles.input}
            id='input'
            value={value}
            onChange={e => setValue(e.target.value)}
            autoSize={{ minRows: 1, maxRows: 3 }}
          />

          <div
            className={styles.expression}
            onClick={() => {
              setMoreVisible(false)
              setFaceVisible(!faceVisible)
            }}
          />

          {value ? (
            <Button
              type='submit'
              className={styles.submit}
              onClick={() => {
                sendMessage()
                const messageData = userInfo.message
                messageData.splice(
                  userInfo.message.findIndex(item => item.account === state.account),
                  1,
                  {
                    ...state,
                    date: getDisplayTime(+new Date())
                  }
                )

                setUserInfo({
                  ...userInfo,
                  message: messageData
                })
              }}
            >
              发送
            </Button>
          ) : (
            <div
              className={styles.func}
              onClick={() => {
                setMoreVisible(!moreVisible)
                setFaceVisible(false)
              }}
            />
          )}
        </div>
        {faceVisible && (
          <main className={styles.face_main}>
            {tabsVisible === 0 && (
              <ul className={styles.face_list}>
                {emojiName.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className={styles.item}
                      onClick={() => {
                        setValue(pre => pre + item)
                      }}
                    >
                      <img
                        src={`${emojiUrl + emojiMap[item]}`}
                        alt=''
                        className={styles.face_img}
                      />
                    </li>
                  )
                })}
              </ul>
            )}
            {tabsVisible === 1 && (
              <ul className={styles.face_list}>
                {bigEmojiList[tabsVisible - 1].list.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className={styles.item}
                      onClick={() => {
                        sendMessage(`${faceUrl + item}@2x.png`)
                      }}
                    >
                      <img src={`${faceUrl + item}@2x.png`} alt='' />
                    </li>
                  )
                })}
              </ul>
            )}
            {tabsVisible === 2 && (
              <ul className={styles.face_list}>
                {bigEmojiList[tabsVisible - 1].list.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className={styles.item}
                      onClick={() => {
                        sendMessage(`${faceUrl + item}@2x.png`)
                      }}
                    >
                      <img src={`${faceUrl + item}@2x.png`} alt='' />
                    </li>
                  )
                })}
              </ul>
            )}
            {tabsVisible === 3 && (
              <ul className={styles.face_list}>
                {bigEmojiList[tabsVisible - 1].list.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className={styles.item}
                      onClick={() => {
                        sendMessage(`${faceUrl + item}@2x.png`)
                      }}
                    >
                      <img src={`${faceUrl + item}@2x.png`} alt='' />
                    </li>
                  )
                })}
              </ul>
            )}

            <ul className={styles.face_tab}>
              {[
                face,
                'https://web.sdk.qcloud.com/im/assets/face-elem/yz00@2x.png',
                'https://web.sdk.qcloud.com/im/assets/face-elem/ys00@2x.png',
                'https://web.sdk.qcloud.com/im/assets/face-elem/gcs00@2x.png'
              ].map((item, index) => {
                return (
                  <li key={index} className={styles.item} onClick={() => setTabsVisible(index)}>
                    <img src={item} alt='' />
                  </li>
                )
              })}
            </ul>
          </main>
        )}
        {moreVisible && (
          <main className={styles.more_main}>
            <span className={styles.icon_img}>
              <input
                title='图片'
                type='file'
                data-type='image'
                accept='image/*'
                className={styles.input}
                onChange={e => handleImage(e)}
              />
              <span>图片</span>
            </span>

            <span className={styles.icon_video}>
              <input
                title='视频'
                type='file'
                data-type='video'
                accept='video/*'
                className={styles.input}
              />
              <span>视频</span>
            </span>
            <span className={styles.icon_file}>
              <input
                title='文件'
                type='file'
                data-type='file'
                accept='*'
                className={styles.input}
              />
              <span>文件</span>
            </span>
            <div className={styles.icon_msg} onClick={() => setMapVisible(true)}>
              <span className={styles.input} />
              <span>定位</span>
            </div>
          </main>
        )}
      </div>
      <Modal
        open={mapVisible}
        destroyOnClose
        onCancel={() => setMapVisible(false)}
        title='定位'
        onOk={handleOk}
        okText='发送'
        cancelText='取消'
      >
        <Map complete={complete} />
      </Modal>
    </div>
  )
}

export default memo(MessageDetail)
