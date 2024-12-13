import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"

interface ContactProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Contact = (props: ContactProps) => {
  return (
    <div className="flex flex-col w-1/2">
    <Label htmlFor="phonenumber" className="text-lg">
      Telefone para contato
    </Label>
    <Input
      placeholder="+55(00)99999-9999"
      name="phonenumber"
      className="w-full placeholder:text-neutral-300"
      onChange={props.onChange}
    />
  </div>
  )
}