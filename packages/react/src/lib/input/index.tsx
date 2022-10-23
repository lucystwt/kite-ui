import { forwardRef } from 'react'
import styled, { css } from 'styled-components'

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

type StyledInputProps = Required<Pick<InputProps, 'disabled'>> & { sz: Size; hasFix: boolean }

const inputCss = css<Pick<StyledInputProps, 'sz' | 'disabled'>>`
  font-size: ${({ sz }) => getFontSize(sz)};
  padding: ${({ sz }) => `${getPaddingY(sz)} 8px`};
  border: 1px solid ${themeVars.borderColor};
  border-radius: ${themeVars.rounded};
  transition: ${getTransition()};

  ${({ disabled }) =>
    disabled
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

const Container = styled.div<Pick<StyledInputProps, 'sz' | 'disabled' | 'hasFix'>>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.25rem;
  ${({ hasFix }) => hasFix && inputCss}
`

const StyledInput = styled.input<StyledInputProps>`
  ${({ hasFix }) =>
    !hasFix
      ? inputCss
      : css`
          outline: none;
          border: none;
          cursor: inherit;
        `};
`

const IconContainer = styled.span`
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
  const styledProps = {
    type: 'text',
    value,
    placeholder,
    disabled,
    sz: size,
    hasFix,
    onChange,
  }

  if (!hasFix) return <StyledInput ref={ref} {...styledProps} className={className} style={style} onClick={onClick} />
  return (
    <Container
      ref={ref}
      hasFix={hasFix}
      disabled={disabled}
      sz={size}
      className={className}
      style={style}
      onClick={onClick}
    >
      {prefix && <IconContainer>{prefix}</IconContainer>}
      <StyledInput {...styledProps} />
      {suffix && <IconContainer>{suffix}</IconContainer>}
    </Container>
  )
})
