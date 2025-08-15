import { ComponentPropsWithoutRef, ElementType, forwardRef } from "react";
import { Icon } from "@iconify/react";

type Props = ComponentPropsWithoutRef<typeof Icon> & {
  icon: string;
  width?: number;
  color?: string;
};

const Iconify = forwardRef<any, Props>(
  ({ icon, width = 30, color = "#FFB300", ...other }, ref) => (
    <Icon
      icon={icon}
      width={width}
      height={width}
      color={color}
      ref={ref}
      {...other}
    />
  )
);

export default Iconify;
