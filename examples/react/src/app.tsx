import { Button, Input } from '@kite-ui/react'
import { Button as AntButton, Input as AntInput, Menu } from 'antd'
import { useState } from 'react'

const items = [
  { key: 'button', label: 'Button' },
  { key: 'input', label: 'Input' },
]

const jsxConvert: Record<string, JSX.Element> = {
  button: (
    <div className="flex items-center gap-4">
      <Button variant="contained">Button</Button>
      <AntButton type="primary">AntButton</AntButton>
      <Button variant="outlined">Button</Button>
      <AntButton>AntButton</AntButton>
      <Button variant="text">Button</Button>
      <AntButton type="text">AntButton</AntButton>
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
