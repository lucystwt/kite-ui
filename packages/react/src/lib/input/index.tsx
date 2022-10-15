import * as styles from './index.css'

export type InputProps = Omit<
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'type'
>

export default function Input({ ...props }: InputProps) {
  return <input className={styles.input} type="text" {...props} />
}
