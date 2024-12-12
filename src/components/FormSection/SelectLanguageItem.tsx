import {
  SelectItem
} from "@/components/ui/select";

type SelectionLanguageProps = {
  value: string;
  content: string;
};

export const SelectionLanguageItem = (props: SelectionLanguageProps) => {
  return <SelectItem value={props.value}>{props.content}</SelectItem>;
};
