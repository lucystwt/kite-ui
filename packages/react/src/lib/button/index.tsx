import styled, { css } from 'styled-components'

import { themeVars } from '../../helpers/theme'

export type ButtonProps = {
  variant?: 'outlined' | 'contained' | 'text'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const StyledButton = styled.button<ButtonProps>`
  box-sizing: border-box;
  line-height: 1.75;
  background-color: transparent;
  border: none;
  border-radius: ${themeVars.round};
  cursor: pointer;
  transition: color, background-color, border-color cubic-bezier(0.4, 0, 0.2, 1) 150ms;

  ${({ size }) => {
    if (size === 'small')
      return css`
        font-size: ${themeVars.text_small};
        padding: 4px 10px;
      `
    else if (size === 'medium')
      return css`
        font-size: ${themeVars.text_medium};
        padding: 6px 16px;
      `
    else if (size === 'large')
      return css`
        font-size: ${themeVars.text_large};
        padding: 8px 22px;
      `
  }}

  ${({ variant, size, disabled }) => {
    if (variant === 'outlined')
      return css`
        background-color: ${themeVars.white};
        border: 1px solid ${themeVars.border};
        ${() => {
          if (size === 'small')
            return css`
              padding: 3px 9px;
            `
          else if (size === 'medium')
            return css`
              padding: 5px 15px;
            `
          else if (size === 'large')
            return css`
              padding: 7px 21px;
            `
        }}
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
            border: 1px solid ${themeVars.disabled};
          `
        else if (variant === 'contained')
          return css`
            background-color: ${themeVars.disabled};
          `
      }}
    `}
`

export default function Button({
  variant = 'outlined',
  size = 'medium',
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
