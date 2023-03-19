import type { ButtonProps } from '@react-email/button'
import { Button } from '@react-email/button'

export const CustomButton = (props: ButtonProps) => {
  const { className, ...propsWithoutClassName } = props

  return (
    <Button
      className={`bg-blue-200 text-black p-3 rounded ${className}`}
      {...propsWithoutClassName}
    />
  )
}
