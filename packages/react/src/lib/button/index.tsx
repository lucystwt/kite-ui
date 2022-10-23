import styled, { css } from 'styled-components'

import { getFontSize, getPadding, getTransition, themeVars } from '../../helpers/theme'
import { Size } from '../../helpers/types'

export type ButtonProps = {
  variant?: 'outlined' | 'contained' | 'text'
  size?: Size
  color?: string
  disabled?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

type StyledButtonProps = Required<Pick<ButtonProps, 'variant' | 'size'>>

const StyledButton = styled.button<StyledButtonProps>`
  box-sizing: border-box;
  line-height: 1.75;
  background-color: transparent;
  border: none;
  border-radius: ${themeVars.rounded};
  cursor: pointer;
  transition: ${getTransition()};
  font-size: ${({ size }) => getFontSize(size)};
  padding: ${({ size }) => getPadding(size)};

  ${({ variant, size, disabled }) => {
    if (variant === 'outlined')
      return css`
        background-color: ${themeVars.white};
        border: 1px solid ${themeVars.borderColor};
        padding: ${getPadding(size, { offset: -1 })};

        ${!disabled &&
        css`
          &:hover,
          &:focus {
            color: ${themeVars.primary};
            border-color: ${themeVars.primary};
          }
          &:active {
            color: ${themeVars.primary_700};
            border-color: ${themeVars.primary_700};
          }
        `}
      `
    else if (variant === 'contained')
      return css`
        color: ${themeVars.white};
        background-color: ${themeVars.primary};

        ${!disabled &&
        css`
          &:hover,
          &:focus {
            background-color: ${themeVars.primary_600};
            border-color: ${themeVars.primary_600};
          }
          &:active {
            background-color: ${themeVars.primary_700};
            border-color: ${themeVars.primary_700};
          }
        `}
      `
    else if (variant === 'text')
      return css`
        color: ${themeVars.primary};

        ${!disabled &&
        css`
          &:hover,
          &:focus {
            background-color: ${themeVars.primary_50};
          }
          &:active {
            background-color: ${themeVars.primary_100};
          }
        `}
      `
  }};

  ${({ disabled, variant }) =>
    disabled &&
    css`
      color: ${themeVars.text_disabled};
      cursor: not-allowed;

      ${() => {
        if (variant === 'outlined')
          return css`
            border: 1px solid ${themeVars.disabledBg};
          `
        else if (variant === 'contained')
          return css`
            background-color: ${themeVars.disabledBg};
          `
      }}
    `}
`

export default function Button({
  variant = 'outlined',
  size = 'md',
  disabled,
  onClick,
  children,
}: React.PropsWithChildren<ButtonProps>) {
  return (
    <StyledButton variant={variant} size={size} disabled={disabled} onClick={onClick}>
      {children}
    </StyledButton>
  )
}
