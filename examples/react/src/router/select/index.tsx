import { Select } from '@kite-ui/react'
import { useState } from 'react'

import { componentDefine } from '~/common/helpers'
import Section from '~/components/section'

const define = componentDefine['select']

const options = Array.from({ length: 33 }).map((v, i) => ({ label: `苹果香蕉西红柿-${i + 1}ABCDEFG`, value: i + 1 }))

export default function SelectRoute() {
  const [selectedValue, setSelectedValue] = useState<number>()

  return (
    <div className="flex flex-col gap-8">
      <Section title="默认">
        <Select options={options.slice(0, 7)} placeholder="请输入" />
      </Section>
      <Section title="尺寸" className="flex gap-4">
        {define.sizes.map((s) => (
          <Select options={options} key={s} size={s} placeholder="请输入" />
        ))}
      </Section>
      <Section title="受控">
        <Select
          options={options.slice(0, 7)}
          placeholder="请输入"
          value={undefined}
          // onChange={(val) => setSelectedValue(val)}
        />
        <Select
          options={options.slice(0, 7)}
          placeholder="请输入"
          value={selectedValue}
          onChange={(val) => setSelectedValue(val)}
        />
      </Section>
      <Section title="禁用">
        <Select options={options.slice(0, 7)} disabled placeholder="请输入" />
      </Section>
    </div>
  )
}
