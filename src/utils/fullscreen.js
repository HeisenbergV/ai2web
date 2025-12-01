// 全屏功能
export const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      console.error('进入全屏失败:', err)
    })
  } else {
    document.exitFullscreen().catch(err => {
      console.error('退出全屏失败:', err)
    })
  }
}

export const isFullscreen = () => {
  return !!document.fullscreenElement
}

