import { Button, Input } from '@kite-ui/react'
import { Button as AntButton, Input as AntInput, Menu } from 'antd'
import { useState } from 'react'

const items = [
  { key: 'button', label: 'Button' },
  { key: 'input', label: 'Input' },
]

const jsxConvert: Record<string, JSX.Element> = {
  button: (
    <div className="flex flex-col gap-8">
      <div>
        <h2>默认</h2>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <AntButton>Button</AntButton>
            <AntButton type="primary">Button</AntButton>
            <AntButton type="text">Button</AntButton>
          </div>
          <div className="flex gap-4">
            <Button variant="contained">Button</Button>
            <Button variant="outlined">Button</Button>
            <Button variant="text">Button</Button>
          </div>
        </div>
      </div>
      <div>
        <h2>禁用</h2>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <AntButton disabled>Button</AntButton>
            <AntButton disabled type="primary">
              AntButton
            </AntButton>
            <AntButton disabled type="text">
              AntButton
            </AntButton>
          </div>
          <div className="flex gap-4">
            <Button disabled variant="contained">
              Button
            </Button>
            <Button disabled variant="outlined">
              Button
            </Button>
            <Button disabled variant="text">
              Button
            </Button>
          </div>
        </div>
      </div>
      <div>
        <h2>尺寸</h2>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <AntButton size="small">SMALL</AntButton>
            <AntButton size="middle">MEDIUM</AntButton>
            <AntButton size="large">LARGE</AntButton>
            <AntButton size="small" type="primary">
              SMALL
            </AntButton>
            <AntButton size="middle" type="primary">
              MEDIUM
            </AntButton>
            <AntButton size="large" type="primary">
              LARGE
            </AntButton>
            <AntButton size="small" type="text">
              SMALL
            </AntButton>
            <AntButton size="middle" type="text">
              MEDIUM
            </AntButton>
            <AntButton size="large" type="text">
              LARGE
            </AntButton>
          </div>
          <div className="flex gap-4 items-start">
            <Button size="small">SMALL</Button>
            <Button size="medium">MEDIUM</Button>
            <Button size="large">LARGE</Button>
            <Button size="small" variant="contained">
              SMALL
            </Button>
            <Button size="medium" variant="contained">
              MEDIUM
            </Button>
            <Button size="large" variant="contained">
              LARGE
            </Button>
            <Button size="small" variant="text">
              SMALL
            </Button>
            <Button size="medium" variant="text">
              MEDIUM
            </Button>
            <Button size="large" variant="text">
              LARGE
            </Button>
          </div>
        </div>
      </div>
    </div>
  ),
  input: (
    <div className="flex items-center gap-4">
      <Input />
      <AntInput />
    </div>
  ),
}

export default function App() {
  const [selectedKey, setSelectedKey] = useState<string>(items[0].key)

  return (
    <div className="w-screen h-screen flex">
      <div className="basis-[200px] h-full">
        <Menu
          className="h-full"
          selectedKeys={[selectedKey]}
          items={items}
          theme="dark"
          mode="inline"
          onSelect={({ selectedKeys }) => setSelectedKey(selectedKeys[0])}
        />
      </div>
      <div className="flex-auto p-6">{jsxConvert[selectedKey]}</div>
    </div>
  )
}
