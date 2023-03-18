import { Label } from '@radix-ui/react-label'
import React from 'react'
import type { InputProps } from './Input'
import { Input } from './Input'

type TextFieldProps = InputProps & { text: string; label: string }

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, text, ...props }, ref) => {
    return (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label>{label}</Label>
        <Input ref={ref} {...props} />
        <p className="text-sm text-red-500/90">{text}</p>
      </div>
    )
  },
)

TextField.displayName = 'Input'

export { TextField }
