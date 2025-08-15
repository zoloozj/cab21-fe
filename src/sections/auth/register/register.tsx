import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Register() {
  return (
    <div className="flex flex-col px-12 justify-start w-full sm:max-w-96 text-center">
      <p>Та бүртгүүлэх төрлөө сонгоно уу.</p>
      <div className="flex w-full gap-3 mt-5">
        <Button variant="outline" className="w-1/2" size="lg" asChild>
          <Link href="/driver">Жолооч</Link>
        </Button>
        <Button className="w-1/2 text-white" size="lg" asChild>
          <Link href="/passenger">Зорчигч</Link>
        </Button>
      </div>
    </div>
  );
}
