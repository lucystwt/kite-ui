import clsx from 'clsx'

import { getSize, IconProps } from '../../helpers/icon'

export default function ChevronDown({ size = 'md', className, style }: IconProps) {
  const _size = getSize(size)
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={_size}
      height={_size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={clsx('feather feather-chevron-down', className)}
      style={style}
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  )
}
