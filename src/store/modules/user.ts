import { useState } from 'react'

import { useMemoizedFn } from '@/hooks'
import { IUserInfo } from '@/server/type/user'

export default () => {
  const [userInfo, _setUserInfo] = useState<IUserInfo>({
    status: false,
    account: 1647749125,
    password: 1314520
  })
  const [loginStatus, _setLoginStatus] = useState<boolean>(false)

  const setUserInfo: React.Dispatch<React.SetStateAction<IUserInfo>> = useMemoizedFn(value => {
    _setUserInfo(value)
  })

  const setLoginStatus: React.Dispatch<React.SetStateAction<boolean>> = useMemoizedFn(value => {
    _setLoginStatus(value)
  })
  return { userInfo, setUserInfo, loginStatus, setLoginStatus }
}
