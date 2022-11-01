import { createBrowserRouter } from 'react-router-dom'

import App from '../app'
import ButtonRoute from './button'
import InputRoute from './input'
import SelectRoute from './select'
import Select2Route from './select-2'

export const components = [
  {
    key: 'button',
    path: '/button',
    component: <ButtonRoute />,
    name: 'Button',
  },
  {
    key: 'input',
    path: '/input',
    component: <InputRoute />,
    name: 'Input',
  },
  {
    key: 'select',
    path: '/select',
    component: <SelectRoute />,
    name: 'Select',
  },
  {
    key: 'select2',
    path: '/select2',
    component: <Select2Route />,
    name: 'Select2',
  },
]

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: components.map((c) => ({
      path: c.path,
      element: c.component,
    })),
  },
  {
    path: '/input',
    element: <div>Input</div>,
  },
])
