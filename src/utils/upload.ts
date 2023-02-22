import OSS from 'ali-oss'

import { getStsToken } from '@/server/common'

type typePathType = {
  img?: string
  video?: string
}

interface configType {
  host: string
  region: string
  bucket: string
}

class UploadOss {
  OSSClient

  host: string

  constructor(config: configType) {
    this.host = config.host
    this.initOSS(config)
  }

  async initOSS(config: configType) {
    // 初始化oss
    // 临时token
    const { data: token } = await getStsToken()
    this.OSSClient = new OSS({
      accessKeyId: token.AccessKeyId,
      accessKeySecret: token.AccessKeySecret,
      stsToken: token.SecurityToken,
      region: config.region,
      bucket: config.bucket,
      refreshSTSToken: async () => {
        const { data: token } = await getStsToken()
        return {
          accessKeyId: token.AccessKeyId,
          accessKeySecret: token.AccessKeySecret,
          stsToken: token.SecurityToken
        }
      }
    })
  }

  /**
   * 资源上传到OSS
   * @param {File} file 文件
   * @param {string} type 文件类型 'IMAGE' | 'VIDEO'
   * @param {} typeP 文件路径
   * @param {Function} onProgress 上传进度
   */
  execute(file: File, type, typeP: typePathType, onProgress?: (n) => void): Promise<string> {
    return new Promise((resolve, reject) => {
      let typePath

      switch (type) {
        case 'IMAGE':
          typePath = typeP?.img || '/customer/image/'
          break
        case 'VIDEO':
          typePath = typeP?.video || '/customer/video/'
          break
        default:
          typePath = typeP?.img || '/customer/image/'
          break
      }
      const curTime = new Date().getTime()
      const fileName = `${curTime}_${file.name}`

      this.OSSClient.multipartUpload(typePath + fileName, file, {
        progress: (progress: any) => {
          if (onProgress) {
            onProgress(progress)
          }
        }
      })
        .then(() => {
          resolve(`${this.host}${typePath}${fileName}`)
        })
        .catch((error: any) => {
          reject(error)
        })
    })
  }
}
export default UploadOss
