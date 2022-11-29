// import { useState } from 'react'

// import { useMemoizedFn } from '@/hooks'
// import { Double11RecordType, IDouble11Status, UrlParams } from '@/services/types/double11'

// export default () => {
//   const [activityInfo, _setActivityInfo] = useState<IDouble11Status>({})
//   const [urlParams, _setUrlParams] = useState<UrlParams>({})
//   const [testMode, _setTestMode] = useState<number>(0)
//   // 双11活动的记录列表
//   const [awardRecord, _setAwardRecord] = useState<Double11RecordType[]>([])
//   const [serverTime, _setServerTime] = useState<string>('')
//   // 双11活动当天的记录
//   const [currentRecord, _setCurrentRecord] = useState<Partial<Double11RecordType>>({})

//   const setActivityInfo: React.Dispatch<React.SetStateAction<IDouble11Status>> = useMemoizedFn(
//     value => {
//       _setActivityInfo(value)
//     },
//   )

//   const setUrlParams: React.Dispatch<React.SetStateAction<UrlParams>> = useMemoizedFn(value => {
//     _setUrlParams({
//       ...urlParams,
//       ...value,
//     })
//   })

//   const setTestMode: React.Dispatch<React.SetStateAction<number>> = useMemoizedFn(value => {
//     _setTestMode(value)
//   })

//   const setAwardRecord: React.Dispatch<React.SetStateAction<Double11RecordType[]>> = useMemoizedFn(
//     value => {
//       _setAwardRecord(value)
//     },
//   )

//   const setServerTime: React.Dispatch<React.SetStateAction<string>> = useMemoizedFn(value => {
//     _setServerTime(value)
//   })

//   const setCurrentRecord: React.Dispatch<React.SetStateAction<Partial<Double11RecordType>>> =
//     useMemoizedFn(value => {
//       if (!value) {
//         /** 设置初始数据 */
//         _setCurrentRecord({
//           date: serverTime,
//           shareCount: 0,
//           count: 1,
//           awardList: [],
//         })
//       } else {
//         _setCurrentRecord(value)
//       }
//     })

//   return {
//     activityInfo,
//     setActivityInfo,
//     urlParams,
//     setUrlParams,
//     setTestMode,
//     testMode,
//     awardRecord,
//     setAwardRecord,
//     serverTime,
//     setServerTime,
//     currentRecord,
//     setCurrentRecord,
//   }
// }
export default {}
