// import { generate } from '@ant-design/colors'

type PrimaryColors = {
  primary: string
  primary_50: string
  primary_100: string
  primary_200: string
  primary_300: string
  primary_400: string
  primary_500: string
  primary_600: string
  primary_700: string
  primary_800: string
  primary_900: string
}

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
  border: '#d9d9d9',
  round: '4px',
  disabled: 'rgba(0, 0, 0, 0.12)',
  text_small: '0.75rem',
  text_medium: '0.875rem',
  text_large: '1rem',
  text_disabled: 'rgba(0, 0, 0, 0.26)',
}
