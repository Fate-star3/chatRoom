import { message } from 'antd'
import { Picker, CascadePicker, TextArea, Popup } from 'antd-mobile'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import next from '@/assets/images/next.png'

import { birthdayColumnsData } from './constants'
import styles from './index.module.scss'

import OwnModal from '@/components/Modal'
import { getModel } from '@/store'
import { client as oss } from '@/utils/oss'

const UserDetail = () => {
  const { userInfo, setUserInfo } = getModel('user')
  const navigate = useNavigate()

  const [modalVisible, setModalVisible] = useState<boolean>(false)
  // 名称
  const [nameVisible, setNameVisible] = useState<boolean>(false)
  const [nameValue, setNameValue] = useState<string>(userInfo?.name)
  // 签名
  const [signatureVisible, setSignatureVisible] = useState<boolean>(false)
  const [signatureValue, setSignatureValue] = useState<string>(userInfo?.signature)
  // 性别
  const [sexVisible, setSexVisible] = useState<boolean>(false)
  const [sexValue, setSexValue] = useState<(string | null)[]>(['男'])
  // 生日
  const [birthdayVisible, setBirthdayVisible] = useState<boolean>(false)
  const [birthdayValue, setBirthdayValue] = useState<(string | null)[]>([])

  const [avatar, setAvatar] = useState<string>('')

  // 将图片上传到oss
  async function putObject(data: File | Buffer | Blob) {
    try {
      // 填写Object完整路径。Object完整路径中不能包含Bucket名称。
      // 您可以通过自定义文件名（例如exampleobject.txt）或文件完整路径（例如exampledir/exampleobject.txt）的形式实现将数据上传到当前Bucket或Bucket中的指定目录。
      // data对象可以自定义为file对象、Blob数据或者OSS Buffer。

      const result = await oss.put('images/avatar.png', data, {
        headers: {
          'Content-Type': 'image/jpg'
        }
      })
      console.log(result, result.url)
      setAvatar(result.url)
      setUserInfo({ ...userInfo, avatar: result.url })

      message.success('更换头像成功！', 1)
    } catch (e) {
      console.warn(e)
    }
  }

  // 更换头像
  const updateAvatar = () => {
    const inputFile = document.createElement('input')
    inputFile.setAttribute('type', 'file')
    inputFile.setAttribute('display', 'none')
    inputFile.click()
    inputFile.addEventListener('change', () => {
      const file = inputFile.files[0]
      putObject(file)
    })
  }

  return (
    <>
      <div className={styles.container}>
        <header className={styles.back}>
          <div className={styles.wrap}>
            <div
              className={styles.back_icon}
              onClick={() => {
                navigate(`/message`)
              }}
            />
            <div className={styles.username}>个人信息</div>
            <div className={styles.more} />
          </div>
        </header>
        <div className={styles.content}>
          <div className={styles.avatar}>
            <span className={styles.left}>头像</span>
            <div className={styles.right}>
              <img
                src={avatar || userInfo?.avatar}
                className={styles.img}
                onClick={() => setModalVisible(true)}
              />
              <img src={next} className={styles.next} onClick={() => updateAvatar()} />
              <OwnModal visible={modalVisible} onSetVisible={setModalVisible}>
                <img src={userInfo?.avatar} className={styles.preview} />
              </OwnModal>
            </div>
          </div>
          <div className={styles.name}>
            <span className={styles.left}>名字</span>
            <div className={styles.right}>
              <span>{userInfo?.name}</span>
              <img src={next} className={styles.next} onClick={() => setNameVisible(true)} />
            </div>
          </div>
          <div className={styles.signature}>
            <span className={styles.left}>签名</span>
            <div className={styles.right}>
              <span>{userInfo?.signature}</span>
              <img src={next} className={styles.next} onClick={() => setSignatureVisible(true)} />
            </div>
          </div>
          <div className={styles.sex}>
            <span className={styles.left}>性别</span>
            <div className={styles.right}>
              <span>{userInfo?.sex}</span>
              <img src={next} className={styles.next} onClick={() => setSexVisible(true)} />
            </div>
          </div>
          <div className={styles.birthday}>
            <span className={styles.left}>生日</span>
            <div className={styles.right}>
              <span>{userInfo?.birthday.slice(0, 10)}</span>
              <img src={next} className={styles.next} onClick={() => setBirthdayVisible(true)} />
            </div>
          </div>
        </div>

        <Popup
          visible={nameVisible}
          onMaskClick={() => {
            setUserInfo({ ...userInfo, name: nameValue })
            setNameVisible(false)
            if (userInfo.name !== nameValue) {
              message.success('更换昵称成功！', 1)
            }
          }}
          bodyStyle={{
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
            minHeight: '30vh'
          }}
        >
          <TextArea
            showCount
            maxLength={10}
            className={styles.textArea}
            placeholder='点击任意屏幕保存'
            value={nameValue}
            autoSize={{ minRows: 6, maxRows: 10 }}
            style={{ padding: '5px', fontSize: '14px' }}
            onChange={value => {
              setNameValue(value)
            }}
          />
        </Popup>
        <Popup
          visible={signatureVisible}
          onMaskClick={() => {
            setUserInfo({ ...userInfo, signature: signatureValue })
            setSignatureVisible(false)
            if (userInfo.signature !== signatureValue) {
              message.success('更新签名成功！', 1)
            }
          }}
          bodyStyle={{
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
            minHeight: '30vh'
          }}
        >
          <TextArea
            showCount
            maxLength={30}
            className={styles.textArea}
            placeholder='点击任意屏幕保存'
            autoSize={{ minRows: 6, maxRows: 10 }}
            style={{ padding: '5px', fontSize: '14px' }}
            value={signatureValue}
            onChange={value => {
              setSignatureValue(value)
            }}
          />
        </Popup>

        <Picker
          columns={[
            [
              { label: '男', value: '男' },
              { label: '女', value: '女' }
            ]
          ]}
          visible={sexVisible}
          onClose={() => {
            setSexVisible(false)
          }}
          value={sexValue}
          onConfirm={v => {
            setSexValue(v)
            setUserInfo({ ...userInfo, sex: v[0] })
          }}
        />
        <CascadePicker
          options={birthdayColumnsData}
          visible={birthdayVisible}
          onClose={() => {
            setBirthdayVisible(false)
          }}
          value={birthdayValue}
          onConfirm={v => {
            setBirthdayValue(v)
            setUserInfo({ ...userInfo, birthday: v.join('-') })
          }}
        />
      </div>
    </>
  )
}

export default UserDetail
