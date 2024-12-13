import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"

interface LinksProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Links = (props: LinksProps) => {
  return (
    <div className="flex flex-col">
      <Label htmlFor="links" className="text-lg">
        Links
      </Label>
      <div className="flex w-full gap-2">
        <Input
          placeholder="LinkedIn"
          name="linkedin"
          className="w-1/3 placeholder:text-neutral-300"
          onChange={props.onChange}
        />
        <Input
          placeholder="GitHub"
          name="github"
          className="w-1/3 placeholder:text-neutral-300"
          onChange={props.onChange}
        />
        <Input
          placeholder="Portfólio"
          name="portfolio"
          className="w-1/3 placeholder:text-neutral-300"
          onChange={props.onChange}
        />
      </div>
    </div>
  );
};
