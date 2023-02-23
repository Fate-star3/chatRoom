import { useState } from 'react'

import { useMemoizedFn } from '@/hooks'
import { IUserInfo } from '@/server/type/user'
import { getCookie } from '@/utils/storage'

export default () => {
  const [userInfo, _setUserInfo] = useState<IUserInfo>(JSON.parse(localStorage.getItem('userinfo')))
  const [loginStatus, _setLoginStatus] = useState<boolean>(!!getCookie('usertoken'))

  const setUserInfo: React.Dispatch<React.SetStateAction<IUserInfo>> = useMemoizedFn(value => {
    _setUserInfo(value)
    localStorage.setItem('userinfo', JSON.stringify(value))
    // setCookie('userinfo', JSON.stringify(value))
  })

  const setLoginStatus: React.Dispatch<React.SetStateAction<boolean>> = useMemoizedFn(value => {
    _setLoginStatus(value)
  })
  return { userInfo, setUserInfo, loginStatus, setLoginStatus }
}
