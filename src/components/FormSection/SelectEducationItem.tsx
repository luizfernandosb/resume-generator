import {
  SelectItem
} from "@/components/ui/select";

type SelectionEducationProps = {
  value: string;
  content: string;
};

export const SelectEducationItem = (props: SelectionEducationProps) => {
  return <SelectItem value={props.value}>{props.content}</SelectItem>;
};
