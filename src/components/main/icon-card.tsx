import { Card } from "@/components/ui/card";
import Iconify from "@/components/ui/iconify";

interface Props {
  icon: string;
  title: string;
  content: string;
}

export default function IconCard({ icon, title, content }: Props) {
  return (
    <Card className="flex-1 min-w-[250px]">
      <div className="flex flex-col gap-3 p-4 items-start">
        <Iconify icon={icon} width={60} color="#00ACC1" />
        <p className="font-bold text-xl">{title}</p>
        <p className="text-justify">{content}</p>
      </div>
    </Card>
  );
}
