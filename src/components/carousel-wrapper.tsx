"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import type { CarouselApi } from "@/components/ui/carousel";

interface Memory {
  title: string;
  text: string;
}

export default function CarouselWrapper({ memories }: { memories: Memory[] }) {
  const [api, setApi] = useState<CarouselApi>();

  return (
    <Carousel
      className="w-[80vw] bg-zinc-100 opacity-95 m-5"
      setApi={setApi}
      opts={{
        dragFree: true,
        containScroll: "trimSnaps",
      }}
    >
      <CarouselContent>
        {memories.map((memory, index) => (
          <CarouselItem key={index} className="w-[90vw]">
            <div className="p-1">
              <Card className="h-[70vh]">
                <CardContent className="flex flex-col items-center justify-center p-6 h-full">
                  <h1 className="text-3xl font-bold mb-3">{memory.title}</h1>
                  <textarea
                    name="Text"
                    id="index"
                    placeholder={memory.text}
                    className="text-2xl italic flex-1 w-full placeholder-black placeholder:italic p-2"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="bg-zinc-50" />
      <CarouselNext className="bg-zinc-50" />
    </Carousel>
  );
}
