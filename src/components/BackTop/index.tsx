import { useState, useEffect } from 'react'

import styles from './index.module.scss'

interface IBackProps {
  duration?: number
  target?: () => HTMLElement
  visibilityHeight?: number
  onClick?: () => void
}
let scrollTop: number
const BackTop: React.FC<IBackProps> = props => {
  const {
    duration = 2000,
    visibilityHeight = 400,
    target = () => window,
    onClick = () => window.scrollTo(0, 0)
  } = props
  const [visible, setVisible] = useState<boolean>(false)
  const dom = target()
  console.log(dom)

  useEffect(() => {
    function fn() {
      if (dom === window) {
        scrollTop =
          document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
      } else {
        // scrollTop = dom.scrollTop
      }

      if (scrollTop > visibilityHeight) {
        !visible && setVisible(true)
      } else {
        visible && setVisible(false)
      }
      console.log(scrollTop, 'scrollTop1')
    }
    console.log(dom)
    dom && dom.addEventListener('scroll', fn)
    return () => {
      dom && dom.removeEventListener('scroll', fn)
    }
  }, [dom, visible])

  const backTop = () => {
    onClick && onClick()
    if (scrollTop > 0) {
      window.requestAnimationFrame(backTop)
      window.scrollTo(0, scrollTop - scrollTop / 8)
    }

    /**
      // 每0.01秒向上运动一次
    let interval_time = 1000;
    // 计算每次间隔向上滑动多少像素
    let top_pixel = scrollTop / duration * interval_time;
    // 通过定时器进行间隔向上滑动
    let timer = setInterval(() => {
      scrollTop -= top_pixel;
      // 为负数，浏览器会不处理得
      window.scrollTo(0, scrollTop);
      if (scrollTop <= 0) {
        clearInterval(timer)
      }
    }, interval_time)
     */

    setVisible(!visible)
  }

  return (
    <div className={styles.back} onClick={backTop}>
      {visible && (
        <div
          className={styles.back_top}
          style={{ transition: `all  ${duration / 1000}s ease-in-out` }}
        >
          UP
        </div>
      )}
    </div>
  )
}

export default BackTop
