import './index.scss'

let timer: NodeJS.Timeout | null = null

export default {
  show: (content?: string, duration: number | 'always' = 2000) => {
    const container = document.getElementById('toast')
    if (!container) {
      return
    }
    if (timer) {
      clearTimeout(timer)
      container.setAttribute('style', 'display: none')
    }
    if (!content) {
      return false
    }
    const toastEl = document.getElementById('toast-content')
    toastEl!.innerHTML = content
    container.setAttribute('style', 'display: block')
    if (duration === 'always') {
      return
    }
    timer = setTimeout(() => {
      container.setAttribute('style', 'display: none')
    }, duration)
  },
  hide: () => {
    const container = document.getElementById('toast')
    if (!container) {
      return
    }
    container.setAttribute('style', 'display: none')
  },
  init: () => {
    return (
      <div id='toast' className='toast'>
        <p id='toast-content' className='toast-content' />
      </div>
    )
  }
}
