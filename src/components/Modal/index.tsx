import styles from './index.module.scss'

// todo 请把函数的命名认真对待 能通过函数名知道这个方法是干嘛用的 也不要写any
const Modal = (props: {
  children?: any
  visible?: any
  onSetVisible?: (visible: boolean) => void
  onSetShow?: (visible: boolean) => void
  /** 自定义content的class */
  customContentClass?: string
  /** 允许点击modal则关闭弹窗 */
  allowcCloseOnClick?: boolean
}) => {
  const { children, visible, onSetVisible, onSetShow, customContentClass, allowcCloseOnClick } =
    props

  const handleModalClick = () => {
    if (allowcCloseOnClick) {
      onSetVisible && onSetVisible(false)
    }
  }

  return (
    <>
      {visible && (
        <div className={styles.modal} onClick={handleModalClick}>
          <div
            className={customContentClass || styles.modal_content}
            onClick={() => {
              onSetShow && onSetShow(visible)
            }}
          >
            {children}
          </div>
          <div
            className={styles.modal_mask}
            onClick={() => {
              onSetVisible && onSetVisible(!visible)
              document.body.style.overflow = ''
            }}
          />
        </div>
      )}
    </>
  )
}

export default Modal
