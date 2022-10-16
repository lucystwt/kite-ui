import { Button } from '@kite-ui/react'
import { Button as MButton } from '@mui/material'
import { Button as AButton } from 'antd'

export default function App() {
  return (
    <>
      <div className="flex gap-4 items-center">
        <Button>Button</Button>
        <MButton variant="contained">MButton</MButton>
        <AButton type="primary">AButton</AButton>
        <ul></ul>
      </div>
    </>
  )
}
