import { Label } from "@radix-ui/react-label";
import type { InputProps } from "./Input";
import { Input } from "./Input";

export function TextField({
  text,
  placeholder,
  label,
  type,
  name,
  onChange,
}: InputProps & { text: string; label: string }) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email-2">{label}</Label>
      <Input
        type={type}
        id="email-2"
        placeholder={placeholder}
        name={name}
        onChange={onChange}
      />
      <p className="text-sm text-slate-500">{text}</p>
    </div>
  );
}
