import AMapLoader from '@amap/amap-jsapi-loader'
import { message } from 'antd'
import React, { useEffect } from 'react'

import styles from './index.module.scss'

interface IMap {
  complete: (data: unknown) => void
}
let map

const Map: React.FC<IMap> = props => {
  const { complete } = props
  useEffect(() => {
    AMapLoader.load({
      key: 'bb1252aba2ce48af6ad76c969b6e9b46', // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ['AMap.Geolocation', 'AMap.Scale'] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then(AMap => {
        map = new AMap.Map('container', {
          // 设置地图容器id
          viewMode: '3D', // 是否为3D地图模式
          zoom: 10 // 初始化地图级别
          // center: [105.602725, 37.076636] // 初始化地图中心点位置
        })
        map.addControl(new AMap.Scale())

        map.plugin('AMap.Geolocation', () => {
          const geolocation = new AMap.Geolocation({
            // 是否使用高精度定位，默认：true
            enableHighAccuracy: true,
            // 设置定位超时时间，默认：无穷大
            timeout: 10000,
            // 定位按钮的停靠位置的偏移量
            offset: [10, 20],
            //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            zoomToAccuracy: true,
            //  定位按钮的排放位置,  RB表示右下
            position: 'RB'
          })
          map.addControl(new AMap.Geolocation())

          geolocation.getCurrentPosition((status, result) => {
            if (status === 'complete') {
              complete(result)
            } else {
              onError(result)
            }
          })

          function onError(data) {
            // 定位出错
            message.error(data)
          }
        })
      })
      .catch(e => {
        console.log(e)
      })
    return () => {
      map.destroy()
    }
  }, [])
  return <div id='container' className={styles.container} />
}

export default Map
