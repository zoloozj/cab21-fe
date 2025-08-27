import { Label } from "@/components/ui/label";

interface Props {
  label: string;
  value?: string | number;
}

export function UserInfo({ label, value }: Props) {
  return (
    <div className="flex gap-3 items-center">
      <Label className="text-md font-medium text-primary">{label}:</Label>
      <p className="text-sm text-muted-foreground">{value}</p>
    </div>
  );
}
