import { Input } from '@kite-ui/react'

import ReactIcon from '../components/react-icon'
import Section from '../components/section'
import { componentDefine } from '../helpers'

const define = componentDefine['input']

export default function InputRoute() {
  return (
    <div className="flex flex-col gap-8">
      <Section title="默认">
        <Input placeholder="请输入" />
      </Section>
      <Section title="尺寸" className="flex gap-4">
        {define.sizes.map((s) => (
          <Input key={s} size={s} placeholder="请输入" />
        ))}
      </Section>
      <Section title="禁用">
        <Input disabled placeholder="请输入" />
      </Section>
      <Section title="带图标">
        <Input prefix={<ReactIcon />} placeholder="请输入" />
        <Input suffix={<ReactIcon />} placeholder="请输入" />
        <Input prefix={<ReactIcon />} suffix={<ReactIcon />} placeholder="请输入" />
      </Section>
    </div>
  )
}
