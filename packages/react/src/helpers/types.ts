export type Size = 'sm' | 'md' | 'lg'

export type PrimaryColors = {
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

export type CssProps = Partial<{
  className: string
  style: React.CSSProperties
}>
