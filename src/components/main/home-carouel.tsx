import Image from "next/image";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Iconify from "@/components/ui/iconify";
import { Button } from "@/components/ui/button";

export default function HomeCarousel() {
  return (
    <div className="p-4 mt-10 text-center">
      <h1 className="text-2xl font-bold">
        Манай хамгийн их эрэлттэй чиглэлүүд
      </h1>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full mt-5"
      >
        <CarouselContent>
          {Array.from({ length: 10 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="max-w-[90%] md:basis-1/2 md:max-w-[47%] lg:basis-1/3 lg:max-w-[32%] xl:basis-1/4 flex-shrink-0 xl:max-w-[24%]"
            >
              <div className="p-1">
                <Card className="pt-0">
                  <div className="w-full h-40 relative">
                    <Image
                      src="/assets/images/image.png"
                      fill
                      alt="Аваад явая"
                      className="object-cover rounded-t-md"
                      style={{ margin: 0, padding: 0 }}
                    />
                  </div>
                  <CardContent className="flex flex-col aspect-auto gap-5">
                    <span className="font-semibold">
                      Улаанбаатар - Төв аймаг
                    </span>
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col items-start">
                        <p className="font-light text-sm text-gray-600">Үнэ</p>
                        <p className="font-semibold">20,000₮</p>
                      </div>
                      <Button
                        type="button"
                        size="icon"
                        className="rounded-full cursor-pointer"
                      >
                        <Iconify
                          icon="solar:arrow-right-outline"
                          color="#FFFFFF"
                        />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden xl:flex" />
        <CarouselNext className="hidden xl:flex" />
      </Carousel>
    </div>
  );
}
