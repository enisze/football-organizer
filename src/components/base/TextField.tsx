import { Label } from "@radix-ui/react-label";
import { Input } from "./Input";

export function TextField({ text }: { text: string }) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email-2">Email</Label>
      <Input type="email" id="email-2" placeholder="Email" />
      <p className="text-sm text-slate-500">{text}</p>
    </div>
  );
}
