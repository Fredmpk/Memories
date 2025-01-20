"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Card, CardContent } from "@/components/ui/card";
import DeleteMemory from "./delete-memory";

type Memory = {
  id: string;
  title: string | null;
  text: string;
  author: string | null;
  categoryId: string | null;
};

export default function MemoriesSwiper({ memories }: { memories: Memory[] }) {
  return (
    <div className="w-[80vw]">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
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
            "--swiper-pagination-bullet-vertical-gap": "6px",
          } as React.CSSProperties
        }
      >
        {memories.map((memory, index) => (
          <SwiperSlide key={memory.id} className="w-[90vw]">
            <div className="p-1">
              <Card className="h-[72vh]">
                <CardContent className="flex flex-col  items-center justify-center px-6 pt-3 h-full bg-black text-white ">
                  <h1 className="text-3xl font-bold mb-10">{memory.title}</h1>

                  <textarea
                    name="Text"
                    id="index"
                    placeholder={memory.text}
                    readOnly
                    className="text-2xl italic flex-1 w-full bg-zinc-800 placeholder-white placeholder:italic p-3"
                  ></textarea>
                  <h2 className="text-3xl font-bold my-3">{memory.author}</h2>

                  <DeleteMemory memoryId={memory.id} />
                </CardContent>
              </Card>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
