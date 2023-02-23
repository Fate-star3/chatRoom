import { message } from 'antd'
import { Button } from 'antd-mobile'
import { UserAddOutline } from 'antd-mobile-icons'
import { ChangeEvent, memo, useEffect, useMemo, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { io } from 'socket.io-client'

import face from '@/assets/images/表情@2x.png'

import Message from './components/Message'
import styles from './index.module.scss'

import { useModel } from '@/store'
import { decodeText } from '@/utils/decodeText'
import { faceUrl, bigEmojiList, emojiMap, emojiName, emojiUrl } from '@/utils/emojiMap'

interface IChatList {
  avatar: string
  text: string
  singleImage?: string
  className?: string
}
const MessageDetail = () => {
  const { userInfo } = useModel('user')
  const navigate = useNavigate()
  const { state } = useLocation()
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

  // console.log(state)

  const socket = useMemo(
    () =>
      io(
        process.env.NODE_ENV === 'development'
          ? 'http://127.0.0.1:8000'
          : 'http://47.97.80.211:8000'
      ),
    []
  )

  const sendMessage = () => {
    if (value || singleImage) {
      socket.timeout(3000).emit('chat message', value, (err, args) => {
        if (err) {
          message.error(err)
        }
        console.log(args)
      })
      console.log(value, singleImage)

      if (value && singleImage) {
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
            text: value,
            singleImage,
            className: 'message'
          })
        )
        setValue('')
      }
    }
  }
  useEffect(() => {
    socket.on('global message', (data, callback) => {
      console.log(data, 'global')
      callback && callback()
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
    document.addEventListener('scroll', () => {
      setFaceVisible(false)
      setMoreVisible(false)
    })
    return () => {
      document.addEventListener('scroll', () => {
        setFaceVisible(false)
        setMoreVisible(false)
      })
    }
  }, [])

  useEffect(() => {
    if (value.length >= 75) {
      message.warning('消息字数已达上限')
      setValue(pre => pre.slice(0, 75))
    }
    document.addEventListener('keydown', e => {
      if (e.keyCode === 13) {
        sendMessage()
      }
    })

    return () => {
      document.removeEventListener('keydown', e => {
        if (e.keyCode === 13) {
          sendMessage()
        }
      })
    }
  }, [value])

  useEffect(() => {
    chatList.length > 0 &&
      localStorage.setItem(`${state.account}chatList`, JSON.stringify(chatList))
  }, [chatList])

  // 发送图片
  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0]

    const reader = new FileReader()

    reader.addEventListener('load', e => {
      console.log('img')

      setSingleImage(e.target.result as string)
      sendMessage()
    })
    if (file) {
      reader.readAsDataURL(file)
    }
    console.log(file)
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
      {userInfo.group.filter(item => item.account === state.account).length !== 0 ||
        (userInfo.friend.filter(item => item.account === state.account).length === 0 && (
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
        ))}
      <ul
        className={styles.messages}
        id='messages'
        style={{
          marginTop: `${
            userInfo.friend.filter(item => item.account === state.account).length === 0
              ? '66px'
              : ''
          }`
        }}
        onClick={() => {
          setFaceVisible(false)
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
          <textarea
            className={styles.input}
            id='input'
            value={value}
            onChange={e => setValue(e.target.value)}
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
              onClick={e => {
                e.preventDefault()
                sendMessage()
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
                        setSingleImage(`${faceUrl + item}@2x.png`)
                        sendMessage()
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
                        setSingleImage(`${faceUrl + item}@2x.png`)
                        sendMessage()
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
                        setSingleImage(`${faceUrl + item}@2x.png`)
                        sendMessage()
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
            <div className={styles.icon_msg}>
              <span className={styles.input} />
              <span>消息</span>
            </div>
          </main>
        )}
      </div>
    </div>
  )
}

export default memo(MessageDetail)
