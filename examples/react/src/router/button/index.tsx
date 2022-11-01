import { Button } from '@kite-ui/react'

import { componentDefine } from '~/common/helpers'
import Section from '~/components/section'

const define = componentDefine['button']

export default function ButtonRoute() {
  return (
    <div className="flex flex-col gap-8">
      <Section title="默认" className="flex gap-4">
        {define.variants.map((v) => (
          <Button key={v} variant={v}>
            默认按钮
          </Button>
        ))}
      </Section>
      <Section title="尺寸" className="flex gap-4">
        {define.sizes.map((s) => (
          <Button key={s} variant="contained" size={s}>
            尺寸按钮
          </Button>
        ))}
      </Section>
      <Section title="尺寸" className="flex gap-4">
        {define.variants.map((v) => (
          <Button key={v} disabled variant={v}>
            尺寸按钮
          </Button>
        ))}
      </Section>
    </div>
  )
}
