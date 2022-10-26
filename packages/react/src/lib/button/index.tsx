import { css } from '@emotion/react'

import { getFontSize, getPadding, getTransition, themeVars } from '../../helpers/theme'
import { Size } from '../../helpers/types'

type Variant = 'outlined' | 'contained' | 'text'

export type ButtonProps = {
  variant?: Variant
  size?: Size
  color?: string
  disabled?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const getVariantCss = (variant: Variant, size: Size, disabled: boolean) => {
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
}

const getDisabledCss = (variant: Variant) => css`
  color: ${themeVars.text_disabled};
  cursor: not-allowed;
  ${variant === 'outlined' &&
  css`
    border: 1px solid ${themeVars.disabledBg};
  `}
  ${variant === 'contained' &&
  css`
    background-color: ${themeVars.disabledBg};
  `}
`

export default function Button({
  variant = 'outlined',
  size = 'md',
  disabled = false,
  onClick,
  children,
}: React.PropsWithChildren<ButtonProps>) {
  return (
    <button
      css={css`
        box-sizing: border-box;
        line-height: 1.75;
        background-color: transparent;
        border: none;
        border-radius: ${themeVars.rounded};
        cursor: pointer;
        transition: ${getTransition()};
        font-size: ${getFontSize(size)};
        padding: ${getPadding(size)};
        ${getVariantCss(variant, size, disabled)};
        ${disabled && getDisabledCss(variant)}
      `}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
