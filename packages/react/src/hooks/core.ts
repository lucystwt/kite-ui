import { useCallback, useLayoutEffect, useRef } from 'react'

export function useSyncRef<T>(value: T) {
  const ref = useRef<T>(value)

  useLayoutEffect(() => {
    ref.current = value
  }, [value])

  return ref
}

export function useEvent(handler: (...args: any[]) => void) {
  const $handler = useRef<(...args: any[]) => void>(handler)

  // DOM更新之后，视图渲染完成后之前更新`handlerRef.current`指向
  useLayoutEffect(() => {
    $handler.current = handler
  }, [handler])

  // 用useCallback包裹，使得render时返回的函数引用一致
  return useCallback((...args: any[]) => $handler.current(...args), [])
}
