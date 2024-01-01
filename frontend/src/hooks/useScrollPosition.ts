import { useState, useEffect } from 'react'

const useScrollPosition = () => {
  // 定义滚动位置的状态
  const [scrollPosition, setScrollPosition] = useState(0)
  useEffect(() => {
    // 定义处理滚动事件的函数
    const handleScroll = () => setScrollPosition(window.scrollY)
    // 在组件挂载时添加滚动事件监听器
    window.addEventListener('scroll', handleScroll)
    // 在组件卸载时移除滚动事件监听器
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return scrollPosition
}

export default useScrollPosition
