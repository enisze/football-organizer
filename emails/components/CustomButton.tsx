import type { ButtonProps } from '@react-email/button'
import { Button } from '@react-email/button'

export const CustomButton = (props: ButtonProps) => {
  const { className, ...propsWithoutClassName } = props

  return (
    <Button
      className={`bg-blue-400 text-white p-3 rounded ${className}`}
      {...propsWithoutClassName}
    />
  )
}
