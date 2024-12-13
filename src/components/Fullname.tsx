import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"

interface FullnameProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Fullname = (props: FullnameProps) => {
  return (
    <div className="flex flex-col w-1/3">
    <Label htmlFor="fullname" className="text-lg">
      Nome Completo
    </Label>
    <Input
      placeholder="Nome Completo"
      name="fullname"
      className="w-full placeholder:text-neutral-300"
      onChange={props.onChange}
    />
  </div>
  )
}