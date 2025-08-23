import { cn } from "@/lib/utils";
import { Button } from "./button";
import Iconify from "./iconify";
import { ComponentProps } from "react";

type Props = ComponentProps<"button"> & {
  color?: string;
  icon: string;
  title: string;
  right?: boolean;
  size?: "icon" | "lg" | "sm" | "default";
};

export default function IconButton({
  icon,
  title,
  color,
  right = false,
  size = "lg",
  ...other
}: Props) {
  return (
    <Button
      variant="ghost"
      className={cn("flex gap-1 items-top", right && "flex-row-reverse")}
      size={size}
      {...other}
    >
      <Iconify icon={icon} color={color} />
      <span className="hidden md:block">{title}</span>
    </Button>
  );
}
