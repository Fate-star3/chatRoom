import classnames from 'classnames'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import styles from './index.module.scss'

const Footer = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const { pathname } = useLocation()
  // console.warn('pathname', pathname)

  useEffect(() => {
    if (['/message', '/mine', '/contacts', '/'].includes(pathname)) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }, [visible, pathname])

  return visible ? (
    <div className={styles.footer}>
      <Link
        to='/message'
        className={classnames({
          active: pathname === '/message' || pathname === '/'
        })}
      >
        <div className={styles.icon_home} />
        <div className={styles.footer_home}>消息</div>
      </Link>
      <Link to='/contacts' className={classnames({ active: pathname === '/contacts' })}>
        <div className={styles.icon_order} />
        <div className={styles.footer_order}>联系人</div>
      </Link>
      <Link to='/mine' className={classnames({ active: pathname === '/mine' })}>
        <div className={styles.icon_mine} />
        <div className={styles.footer_mine}>我的</div>
      </Link>
    </div>
  ) : (
    <></>
  )
}
export default Footer
