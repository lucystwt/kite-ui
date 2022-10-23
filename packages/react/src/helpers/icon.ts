import { CssProps, Size } from './types'

export type IconProps = {
  size?: Size | number
} & CssProps

export function getSize(size: IconProps['size']) {
  if (typeof size === 'number') return size
  else if (size === 'sm') return 14
  else if (size === 'md') return 16
  else if (size == 'lg') return 18
}
