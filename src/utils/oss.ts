// @ts-ignore
import OSS from 'ali-oss'

import { getStsToken } from '@/server/common'

// 在客户端使用临时访问凭证初始化OSS客户端，用于临时授权访问OSS资源。
// eslint-disable-next-line import/no-mutable-exports
let client: any
const result = getStsToken()
// 设置客户端请求访问凭证的地址。
console.log(result, 'token')

result.then(result => {
  client = new OSS({
    // yourRegion填写Bucket所在地域。以华东1（杭州）为例，yourRegion填写为oss-cn-hangzhou。
    region: 'oss-cn-hongkong',
    // 填写Bucket名称。
    bucket: 'chat-room-assets',
    accessKeyId: result.data.AccessKeyId,
    accessKeySecret: result.data.AccessKeySecret,
    stsToken: result.data.SecurityToken,
    // 刷新临时访问凭证。
    refreshSTSToken: async () => {
      const { data: token } = await getStsToken()
      return {
        accessKeyId: token.AccessKeyId,
        accessKeySecret: token.AccessKeySecret,
        stsToken: token.SecurityToken
      }
    },
    refreshSTSTokenInterval: result.data.Expiration
  })
})

export { client }
