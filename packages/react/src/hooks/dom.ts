import { useEffect, useRef, useState } from 'react'

import { useEvent } from './core'

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

export default function useOutsideClick<T extends Element = Element>(callback: (...args: any[]) => void) {
  const ref = useRef<T>(null)
  const callbackEvent = useEvent(callback)

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      const triggerElement = ref.current
      if (!triggerElement?.contains(event.target as Node)) callbackEvent()
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [callbackEvent])

  return ref
}
