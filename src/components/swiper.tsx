"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Card, CardContent } from "@/components/ui/card";
import DeleteMemory from "./delete-memory";
import UpdateMemory from "./update-memory";
import { Memory } from "@/lib/types";

export default function MemoriesSwiper({ memories }: { memories: Memory[] }) {
  return (
    <div className="w-[95vw]">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        style={
          {
            "--swiper-navigation-color": "#ffffff",
            "--swiper-pagination-color": "#32CD32" as any,
            "--swiper-pagination-bullet-inactive-color": "#999999" as any,
            "--swiper-pagination-bullet-inactive-opacity": "1" as any,
            "--swiper-pagination-bullet-size": "12px",
            "--swiper-pagination-bullet-horizontal-gap": "6px",
            "--swiper-pagination-bullet-ver-gap": "6px",
          } as React.CSSProperties
        }
      >
        {memories.map((memory, index) => (
          <SwiperSlide key={memory.id} className="">
            <div className="p-1">
              <Card className="h-[72vh]">
                <CardContent className="flex flex-col  items-center justify-center px-3 pt-3 h-full bg-black text-white ">
                  <h1 className="text-2xl font-bold mb-5">{memory.title}</h1>

                  <textarea
                    name="Text"
                    id="index"
                    value={memory.text}
                    className="text-xl italic flex-1 w-full bg-zinc-800 placeholder-white placeholder:italic p-3"
                    disabled
                  ></textarea>
                  <h2 className="text-3xl font-bold my-3">{memory.author}</h2>
                  <div className="flex gap-2 items-center justify-center">
                    <UpdateMemory memory={memory}></UpdateMemory>
                    <DeleteMemory memoryId={memory.id} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
