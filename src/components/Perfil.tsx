import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"

interface PerfilProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Perfil = (props: PerfilProps) => {
  return (
    <div className="flex flex-col w-1/2">
              <Label htmlFor="perfil" className="text-lg">
                Perfil Profissional
              </Label>
              <Input
                placeholder="Perfil Profissional"
                name="perfil"
                className="w-full placeholder:text-neutral-300"
                onChange={props.onChange}
              />
            </div>
  )
}