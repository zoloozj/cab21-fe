import Image from "next/image";

import FilterCard from "@/components/main/filter-card";
import IconCard from "@/components/main/icon-card";
import { Button } from "@/components/ui/button";
import HomeCarousel from "@/components/main/home-carouel";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="relative">
        <Image
          src="/assets/images/cover.jpg"
          width={1500}
          height={300}
          alt="Дайгаад явъя"
          className="w-full h-72 object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-[#FFB30000]/90 flex justify-center items-center">
          <span
            className="text-xl md:text-3xl lg:text-5xl text-white dark:text-gray-800 font-bold px-4 py-2 rounded"
            style={{
              fontFamily: "Montserrat, Arial, sans-serif",
            }}
          >
            Хамтдаа явъя хямдхан, ухаалаг, ээлтэй!
          </span>
        </div>
        <FilterCard />
      </div>
      <div className="max-w-max mx-4 xl:max-w-7xl xl:mx-auto mt-20">
        <div className="flex flex-wrap gap-3 justify-between">
          <IconCard
            icon="iconoir:coins"
            title="Хамгийн хямд үнээр өөрийн аяллаа өөрөө сонго"
            content="Та олон чиглэлийн дундаас өөрт хамгийн тохирсон аяллаа олж, хамгийн бага зардлаар хүрэх боломжтой."
          />
          <IconCard
            icon="hugeicons:student-card"
            title="Хэнтэй хамт явж байгаагаа мэдэж, сэтгэл амар аялаарай"
            content="Бид таны хамт аялах хүмүүс болон жолооч тээвэрлэгчдийн үнэн бодит мэдээллээр хангана."
          />
          <IconCard
            icon="hugeicons:flash"
            title="Хэдхэн товшилтоор захиалаад шууд хөдөл!"
            content="Аяллаа захиалах нь таны төсөөлж байснаас ч амархан. та хэдхэн товч дараад л хормын дотор танд ойрхон байгаа жолоочийг олно."
          />
        </div>
        <div className="mx-auto max-w-max mt-10">
          <div className="flex flex-col lg:flex-row ">
            <Image
              src="/assets/images/home-pic.svg"
              width={366}
              height={237}
              alt="Аваад явъя"
            />
            <div className="p-8 flex flex-col justify-center items-center max-w-[500px] gap-5">
              <p className="text-xl font-semibold">
                Жолооны ард байхдаа ч мөнгөө хэмнэ
              </p>
              <span className="text-justify">
                "Жолоочийн профайл үүсгээд анхны аяллаа нийтэл - хамт явах
                зорчигчоо олоод, бензинд зарцуулах зардлаа хуваалц! Одоо замд
                гарахад бэлэн үү?"
              </span>
              <Button asChild type="button" variant="default" size="lg">
                <Link href="/driver-travel">Аялал нэмэх</Link>
              </Button>
            </div>
          </div>
        </div>
        <HomeCarousel />
      </div>
    </div>
  );
}
