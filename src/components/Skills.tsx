import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"

interface SkillsProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Skills = (props: SkillsProps) => {
  return (
    <div className="flex flex-col w-1/2">
              <Label htmlFor="attributes" className="text-lg">
                Tecnologias/Habilidades
              </Label>
              <Input
                placeholder="Tecnologias/Habilidades"
                name="attributes"
                className="w-full placeholder:text-neutral-300"
                onChange={props.onChange}
              />
            </div>
  )
}