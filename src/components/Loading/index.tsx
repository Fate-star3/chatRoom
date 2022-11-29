import './index.scss'

/** 通用loading方案 */
export default {
  root: document.getElementById('loading'),
  on: () => {
    const container = document.getElementById('loading')
    container && container.setAttribute('style', 'display: block')
  },
  off: () => {
    const container = document.getElementById('loading')
    container?.setAttribute('style', 'display: none')
  },
  init: () => {
    return (
      <div className='loading-container' id='loading'>
        <div className='loading-anima' />
        <img
          className='loading-img'
          src='https://business.xiongmaoboshi.com/dpsite/d950ab9db0b42c97af511d2cc216adb6.png'
        />
        {/* <p>加载中...</p> */}
      </div>
    )
  }
}
