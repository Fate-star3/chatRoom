// import { useState } from 'react'

// import { useMemoizedFn } from '@/hooks'
// import { UserInfoType } from '@/services/types/user'
// import { getCookie, setCookie } from '@/utils/storage'

// export default () => {
//   const [userInfo, _setUserInfo] = useState<UserInfoType>(JSON.parse(getCookie('dpuserinfo')))
//   const [loginStatus, _setLoginStatus] = useState<boolean>(!!getCookie('dptoken'))

//   const setUserInfo: React.Dispatch<React.SetStateAction<UserInfoType>> = useMemoizedFn(value => {
//     _setUserInfo(value)
//     setCookie('dpuserinfo', JSON.stringify(value))
//   })

//   const setLoginStatus: React.Dispatch<React.SetStateAction<boolean>> = useMemoizedFn(value => {
//     _setLoginStatus(value)
//   })
//   return { userInfo, setUserInfo, loginStatus, setLoginStatus }
// }
export default {}
