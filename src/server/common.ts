import request from '@/utils/request'

type stsTokenRes = Record<
  'AccessKeyId' | 'AccessKeySecret' | 'SecurityToken' | 'Expiration',
  string
>
/**
 * 获取临时的秘钥
 * @returns
 */
export const getStsToken = () => {
  return request.get<stsTokenRes>(
    process.env.NODE_ENV === 'development' ? '/api/sts' : 'http://47.97.80.211:8000/sts'
  )
}
