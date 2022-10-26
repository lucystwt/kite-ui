import { css } from '@emotion/react'
import { forwardRef } from 'react'

import { getFontSize, getPaddingY, getTransition, themeVars } from '../../helpers/theme'
import { CssProps, Size } from '../../helpers/types'

export type InputProps = {
  value?: string
  size?: Size
  placeholder?: string
  disabled?: boolean
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onClick?: React.MouseEventHandler<HTMLInputElement>
} & CssProps

const getInputCss = (size: Size, disabled: boolean) => css`
  font-size: ${getFontSize(size)};
  padding: ${`${getPaddingY(size)} 8px`};
  border: 1px solid ${themeVars.borderColor};
  border-radius: ${themeVars.rounded};
  transition: ${getTransition()};

  ${disabled
    ? css`
        cursor: not-allowed;
        background-color: ${themeVars.disabledBg};
      `
    : css`
        &:hover,
        &:focus {
          outline: none;
        }
        &:hover {
          border-color: ${themeVars.primary_400};
        }
        &:focus {
          border-color: ${themeVars.primary_600};
        }
      `}
`

const iconContainer = css`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(0, 0, 0, 0.54);
`

export default forwardRef<HTMLInputElement, InputProps>(function Input(
  { value, size = 'md', placeholder, disabled = false, prefix, suffix, className, style, onChange, onClick },
  ref
) {
  const hasFix = !!prefix || !!suffix
  const inputProps = {
    type: 'text',
    value,
    placeholder,
    disabled,
    onChange,
  }

  if (!hasFix)
    return (
      <input
        ref={ref}
        css={getInputCss(size, disabled)}
        {...inputProps}
        className={className}
        style={style}
        onClick={onClick}
      />
    )
  return (
    <div
      ref={ref}
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.25rem;
        ${getInputCss(size, disabled)};
      `}
      className={className}
      style={style}
      onClick={onClick}
    >
      {prefix && <span css={iconContainer}>{prefix}</span>}
      <input
        css={css`
          outline: none;
          border: none;
          cursor: inherit;
        `}
        {...inputProps}
      />
      {suffix && <span css={iconContainer}>{suffix}</span>}
    </div>
  )
})
