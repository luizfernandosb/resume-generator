import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"

interface EmailProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Email = (props: EmailProps) => {
  return (
    <div className="flex flex-col w-1/2">
              <Label htmlFor="email" className="text-lg">
                E-mail
              </Label>
              <Input
                placeholder="exemplo@exemplo.com"
                name="email"
                className="w-full placeholder:text-neutral-300"
                onChange={props.onChange}
              />
            </div>
  )
}