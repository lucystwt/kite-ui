import classNames from 'classnames'

import { CssProps } from '../types'

type Props = CssProps & {
  title: string
}

export default function Section({ title, className, style, children }: React.PropsWithChildren<Props>) {
  return (
    <div>
      <h2>{title}</h2>
      <div className={classNames('flex items-end gap-4', className)} style={style}>
        {children}
      </div>
    </div>
  )
}
