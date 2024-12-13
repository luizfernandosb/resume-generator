import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"

interface AdressProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Adress = (props: AdressProps) => {
  return (
    <div className="flex flex-col w-full">
      <Label htmlFor="adress" className="text-lg">
        Endereço
      </Label>
      <Input
        placeholder="R. Exemplo, 1 - Bairro, Cidade/Estado"
        name="adress"
        className="w-full placeholder:text-neutral-300"
        onChange={props.onChange}
      />
    </div>
  );
};
