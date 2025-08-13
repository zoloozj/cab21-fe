import { cn } from "@/lib/utils";
import { Button } from "./button";
import Iconify from "./iconify";

interface Props {
  color?: string;
  icon: string;
  title: string;
  right?: boolean;
  size?: "icon" | "lg" | "sm" | "default";
}

export default function IconButton({
  icon,
  title,
  color,
  right = false,
  size = "lg",
}: Props) {
  return (
    <Button
      variant="ghost"
      className={cn("flex gap-2 items-top", right && "flex-row-reverse")}
      size={size}
    >
      <Iconify icon={icon} color={color} />
      {title}
    </Button>
  );
}
