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
    <div className="bg-[url('/kollage-mama.jpeg')]  animate-float flex flex-col justify-center items-center w-full min-h-screen">
      <h1 className="text-4xl m-4 font-bold text-center bg-black text-white rounded-2xl p-3 opacity-80 whitespace-normal break-words max-w-full">
        {category.name}
      </h1>
      <AddMemory categoryId={category.id} />
      <MemoriesSwiper memories={reversedMemories} />
    </div>
  );
}
