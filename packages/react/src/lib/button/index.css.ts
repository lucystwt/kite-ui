import { style } from '@vanilla-extract/css'

export const button = style({
  border: 'none',
  borderRadius: '0.5rem',
  backgroundColor: '#186faf',
  color: 'hsl(0deg, 0%, 98%)',
  padding: '0.75rem',
  cursor: 'pointer',
  ':hover': {
    backgroundColor: '#0a558c',
  },
  ':focus': {
    outline: 'none',
    boxShadow: '0 0 0 2px #62b0e8',
    backgroundColor: '#0a558c',
  },
})
