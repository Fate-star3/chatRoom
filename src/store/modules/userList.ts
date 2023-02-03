import { useState } from 'react'

import { useMemoizedFn } from '@/hooks'
import { IGroupInfo } from '@/server/type/group'
import { IUserInfo } from '@/server/type/user'

export default () => {
  const [listData, _setListData] = useState<IUserInfo[]>(
    JSON.parse(localStorage.getItem('list')) || []
  )
  const [groupData, _setGroupData] = useState<Partial<IGroupInfo>[]>(
    JSON.parse(localStorage.getItem('group')) || []
  )

  const setListData: React.Dispatch<React.SetStateAction<IUserInfo[]>> = useMemoizedFn(value => {
    _setListData(value)
  })
  const setGroupData: React.Dispatch<React.SetStateAction<Partial<IGroupInfo>[]>> = useMemoizedFn(
    value => {
      _setGroupData(value)
    }
  )

  return { listData, setListData, groupData, setGroupData }
}
