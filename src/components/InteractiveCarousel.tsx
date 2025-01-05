"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";

export default function InteractiveCarousel({ memories }: { memories: any[] }) {
  function handleCardClick(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    const containerWidth = event.currentTarget.offsetWidth;
    const clickX =
      event.clientX - event.currentTarget.getBoundingClientRect().left;

    if (clickX < containerWidth / 2) {
      (document.querySelector(".carousel-prev") as HTMLElement)?.click();
    } else {
      (document.querySelector(".carousel-next") as HTMLElement)?.click();
    }
  }

  return (
    <Carousel className="w-[80vw] bg-zinc-100 opacity-95 m-5">
      <CarouselContent>
        {memories
          .slice()
          .reverse()
          .map((memory, index) => (
            <CarouselItem
              key={index}
              className="w-[90vw]"
              onClick={handleCardClick}
            >
              <div className="p-1">
                <Card className="h-[70vh]">
                  <CardContent className="flex flex-col  items-center justify-center p-6 h-full">
                    <h1 className="text-3xl font-bold mb-3">{memory.title}</h1>
                    <textarea
                      name="Text"
                      id="index"
                      placeholder={memory.text}
                      className="text-2xl italic flex-1 w-full placeholder-black placeholder:italic p-2"
                    ></textarea>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
      </CarouselContent>
      <CarouselPrevious className="carousel-prev bg-zinc-50" />
      <CarouselNext className="carousel-next bg-zinc-50" />
    </Carousel>
  );
}
