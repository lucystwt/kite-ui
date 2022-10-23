import { useEffect, useState } from 'react'

export function useDocSize() {
  const [docSize, setDocSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  })

  useEffect(() => {
    const resizeHandler = () => {
      setDocSize({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
      })
    }
    document.addEventListener('resize', resizeHandler)
    return () => document.removeEventListener('resize', resizeHandler)
  }, [])

  return docSize
}
