import styled, { css } from 'styled-components'

import { themeVars } from '../../helpers/theme'

export type ButtonProps = {
  variant: 'outlined' | 'contained' | 'text'
  disabled?: boolean
  size?: 'small' | 'medium' | 'large'
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const StyledButton = styled.button<ButtonProps>`
  padding: 7px 15px;
  border: none;
  background-color: transparent;
  border-radius: ${themeVars.round};
  cursor: pointer;
  transition: color, background-color, border-color cubic-bezier(0.4, 0, 0.2, 1) 150ms;

  ${({ variant }) =>
    variant === 'outlined' &&
    css`
      padding: 6px 14px;
      background-color: ${themeVars.white};
      border: 1px solid ${themeVars.border};
      &:hover,
      &:focus {
        color: ${themeVars.primaryLighter};
        border-color: ${themeVars.primaryLighter};
      }
      &:active {
        color: ${themeVars.primaryDark};
        border-color: ${themeVars.primaryDark};
      }
    `};
  ${({ variant }) =>
    variant === 'contained' &&
    css`
      color: ${themeVars.white};
      background-color: ${themeVars.primary};
      &:hover,
      &:focus {
        background-color: ${themeVars.primaryDark};
        border-color: ${themeVars.primaryDark};
      }
      &:active {
        background-color: ${themeVars.primaryDarkest};
        border-color: ${themeVars.primaryDarkest};
      }
    `}
  ${({ variant }) =>
    variant === 'text' &&
    css`
      color: ${themeVars.primary};
      &:hover,
      &:focus {
        color: ${themeVars.primaryDark};
      }
      &:active {
        color: ${themeVars.primaryDarkest};
      }
    `}
`

export default function Button({
  variant = 'outlined',
  // size,
  // disabled,
  // onClick,
  children,
}: // ...props
React.PropsWithChildren<ButtonProps>) {
  return <StyledButton variant={variant}>{children}</StyledButton>
}
