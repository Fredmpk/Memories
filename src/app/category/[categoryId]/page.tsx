import { prisma } from "@/lib/db";
import getCategory from "@/lib/utils/get-category";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import getMemories from "@/lib/utils/get-memories";
import AddMemory from "@/components/add-memory";
import DeleteMemory from "@/components/delete-memory";
import dynamic from "next/dynamic";
import SimpleSwiper from "@/components/swiper";
import MemoriesSwiper from "@/components/swiper";
import FloatingBackground from "@/components/floating-bg";

export default async function Category({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const resolvedParams = await params;
  const category = await getCategory(resolvedParams.categoryId);
  console.log("Fetched category:", category);
  const memories = await getMemories(resolvedParams.categoryId);
  const reversedMemories = [...memories].reverse();
  if (!category) {
    return <div>Category not found</div>;
  }
  return (
    <FloatingBackground>
      <div className=" flex flex-col justify-center items-center ">
        <h1 className="text-2xl mx-3 mt-3 mb-2 font-bold text-center bg-black text-white rounded-2xl p-2 opacity-80 whitespace-normal break-words max-w-full">
          {category.name}
        </h1>
        <AddMemory categoryId={category.id} />
        <MemoriesSwiper memories={reversedMemories} />
      </div>
    </FloatingBackground>
  );
}
