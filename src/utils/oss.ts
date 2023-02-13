// @ts-ignore
import OSS from 'ali-oss'

export const client = new OSS({
  // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
  region: 'oss-cn-hongkong',
  // 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）。
  accessKeyId: 'LTAI5tNmcBTXzZa1JWxewwwo',
  accessKeySecret: 'aGgrYRc0G113tqviTnlA0YMquASURl',
  // 填写Bucket名称。
  bucket: 'chat-room-assets'
})
