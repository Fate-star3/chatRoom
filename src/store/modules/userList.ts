import { useState } from 'react'

import { useMemoizedFn } from '@/hooks'
import { IUserInfo } from '@/server/type/user'

export default () => {
  const [listData, _setListData] = useState<IUserInfo[]>(
    JSON.parse(localStorage.getItem('list')) || []
  )

  const setListData: React.Dispatch<React.SetStateAction<IUserInfo[]>> = useMemoizedFn(value => {
    _setListData(value)
  })

  return { listData, setListData }
}
