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

export default async function Category({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const resolvedParams = await params;
  const category = await getCategory(resolvedParams.categoryId);
  console.log("Fetched category:", category);
  const memories = await getMemories(resolvedParams.categoryId);

  if (!category) {
    return <div>Category not found</div>;
  }
  return (
    <div className="bg-[url('/kollage-mama.jpg')]  animate-float flex flex-col justify-center items-center w-full min-h-screen">
      <h1 className="text-4xl m-4 font-bold text-center bg-black text-white rounded-2xl p-3 opacity-80 whitespace-normal break-words max-w-full">
        {category.name}
      </h1>

      <AddMemory categoryId={resolvedParams.categoryId} />

      <Carousel className="w-[80vw]bg-black text-white  opacity-95 m-5">
        <CarouselContent>
          {memories
            .slice()
            .reverse()
            .map((memory, index) => (
              <CarouselItem key={index} className="w-[90vw]">
                <div className="p-1">
                  <Card className="h-[70vh]">
                    <CardContent className="flex flex-col  items-center justify-center p-6 h-full bg-black text-white ">
                      <h1 className="text-3xl font-bold mb-3">
                        {memory.title}
                      </h1>

                      <textarea
                        name="Text"
                        id="index"
                        placeholder={memory.text}
                        className="text-2xl italic flex-1 w-full bg-zinc-800 placeholder-white placeholder:italic p-2"
                      ></textarea>
                      <h2 className="text-3xl font-bold mb-3">
                        {memory.author}
                      </h2>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious className="bg-zinc-50" />
        <CarouselNext className="bg-zinc-50 " />
      </Carousel>
    </div>
  );
}
