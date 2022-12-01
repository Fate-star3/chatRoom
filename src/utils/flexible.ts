import Toast from '@/components/Toast'
// eslint-disable-next-line func-names
export default function () {
  const doc = window.document
  const docEl = doc.documentElement
  let timerId: string | number | NodeJS.Timeout | undefined
  let toastTimerId: string | number | NodeJS.Timeout | undefined

  function refreshRem() {
    const { width } = docEl.getBoundingClientRect()
    // width = width > 750 ? 750 : width
    const rem = width / 10
    docEl.style.setProperty('font-size', `${rem}px`, 'important')
  }

  /** 横屏状态显示提示 */
  function handleHintOnLandscape() {
    const { width, height } = docEl.getBoundingClientRect()
    // if (width > height) {
    //   clearTimeout(toastTimerId)
    //   toastTimerId = setTimeout(() => {
    //     Toast.show('暂不支持横屏浏览，请竖屏后继续使用', 'always')
    //   }, 600)
    // } else {
    //   clearTimeout(toastTimerId)
    //   Toast.hide()
    // }
  }

  window.addEventListener(
    'resize',
    () => {
      clearTimeout(timerId)
      timerId = setTimeout(() => {
        refreshRem()
        handleHintOnLandscape()
      }, 300)
    },
    false
  )
  window.addEventListener(
    'pageshow',
    e => {
      /** 页面是否从缓存中加载 */
      if (!e.persisted) {
        clearTimeout(timerId)
        timerId = setTimeout(() => {
          refreshRem()
          handleHintOnLandscape()
        }, 300)
      }
    },
    false
  )

  refreshRem()
}
