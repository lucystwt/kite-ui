// import { generate } from '@ant-design/colors'

import { PrimaryColors, Size } from './types'

function generatePrimaryColors(): PrimaryColors {
  // const colors = generate('#764abc')
  const result: PrimaryColors = {
    primary: '#8b5cf6',
    primary_50: '#f5f3ff',
    primary_100: '#ede9fe',
    primary_200: '#ddd6fe',
    primary_300: '#c4b5fd',
    primary_400: '#a78bfa',
    primary_500: '#8b5cf6',
    primary_600: '#7c3aed',
    primary_700: '#6d28d9',
    primary_800: '#5b21b6',
    primary_900: '#4c1d95',
  }
  // colors.forEach((color, index) => {
  //   const key = ('primary_' + (index === 0 ? 50 : index * 100)) as keyof PrimaryColors
  //   result[key] = color
  //   if (index === 5) result['primary'] = color
  // })
  return result
}

export const themeVars = {
  ...generatePrimaryColors(),
  white: '#fff',
  black: '#000',
  borderColor: 'rgba(0, 0, 0, 0.23)',
  rounded: '0.25rem',
  disabledText: '#00000040',
  disabledBg: '#f5f5f5',
  text_disabled: 'rgba(0, 0, 0, 0.26)',
}

export function getFontSize(size: Size) {
  let remValue = 0
  if (size === 'sm') remValue = 0.875
  else if (size === 'md') remValue = 1
  else if (size === 'lg') remValue = 1.125
  return `${remValue}rem`
}

export function getPaddingX(size: Size, { offset = 0 }: Partial<{ offset: number }> = {}) {
  let x = 0
  if (size === 'sm') x = 10
  else if (size === 'md') x = 16
  else if (size === 'lg') x = 22
  return `${x + offset}px`
}

export function getPaddingY(size: Size, { offset = 0 }: Partial<{ offset: number }> = {}) {
  let y = 0
  if (size === 'sm') y = 4
  else if (size === 'md') y = 6
  else if (size === 'lg') y = 8
  return `${y + offset}px`
}

export function getPadding(size: Size, { offset = 0 }: Partial<{ offset: number }> = {}) {
  return `${getPaddingY(size, { offset })} ${getPaddingX(size, { offset })}`
}

export function getTransition() {
  return 'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter cubic-bezier(0.4, 0, 0.2, 1) 150ms'
}

export function getShadow() {
  return '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
}
