import { ButtonProps, InputProps, SelectProps } from '@kite-ui/react'

type ComponentDefine = {
  button: {
    variants: ButtonProps['variant'][]
    sizes: ButtonProps['size'][]
  }
  input: {
    sizes: InputProps['size'][]
  }
  select: {
    sizes: SelectProps<any>['size'][]
  }
}

export const componentDefine: ComponentDefine = {
  button: {
    variants: ['contained', 'outlined', 'text'],
    sizes: ['sm', 'md', 'lg'],
  },
  input: {
    sizes: ['sm', 'md', 'lg'],
  },
  select: {
    sizes: ['sm', 'md', 'lg'],
  },
}
