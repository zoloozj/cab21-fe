import { forwardRef } from "react";
import { Icon } from "@iconify/react";

interface Props {
  icon: string;
  width?: number;
  color?: string;
}

const Iconify = forwardRef<any, Props>(
  ({ icon, width = 30, color = "#FFB300" }, ref) => (
    <Icon icon={icon} width={width} height={width} color={color} ref={ref} />
  )
);

export default Iconify;
