import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"

interface PositionProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Position = (props: PositionProps) => {
  return (
    <div className="flex flex-col flex-grow">
      <Label htmlFor="position" className="text-lg">
        Cargo desejado
      </Label>
      <Input
        placeholder="Cargo desejado"
        name="position"
        className="w-full placeholder:text-neutral-300"
        onChange={props.onChange}
      />
    </div>
  );
};
