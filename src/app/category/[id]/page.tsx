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

export default async function Category({ params }: { params: { id: string } }) {
  const category = await getCategory(params.id);

  const memories = await getMemories(params.id);

  if (!category) {
    return <div>Category not found</div>;
  }
  return (
    <div className="bg-[url('/kollage-mama.jpg')]  animate-float flex flex-col justify-center items-center w-full min-h-screen">
      <h1 className="text-6xl flex justify-center p-4 font-bold">
        <p className="bg-zinc-50 rounded-2xl p-3 opacity-80">{category.name}</p>
      </h1>
      <AddMemory categoryId={params.id} />

      <Carousel className="w-[80vw] bg-zinc-100 opacity-95 m-5">
        <CarouselContent>
          {memories.map((memory, index) => (
            <CarouselItem key={index} className="w-[90vw]">
              <div className="p-1">
                <Card className="h-[70vh]">
                  <CardContent className="flex flex-col  items-center justify-center p-6 h-full">
                    <h1 className="text-3xl font-bold mb-3">{memory.title}</h1>

                    <textarea
                      name="Text"
                      id="index"
                      placeholder={memory.text}
                      className="text-2xl italic flex-1 w-full"
                    ></textarea>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-zinc-50" />
        <CarouselNext className="bg-zinc-50" />
      </Carousel>
    </div>
  );
}
