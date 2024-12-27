import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { prisma } from "@/lib/db";
import getCategory from "@/lib/utils/get-category";
import { DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import HTMLFlipBook from "react-pageflip";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const memories = ["lorem ipsum", "fantastisch grün", "blau blau blau blüht"];

export default async function Category({ params }: { params: { id: string } }) {
  console.log("ID:");
  console.log(params.id);
  const paramsID = params.id;
  const category = await getCategory(params.id);

  if (!category) {
    return <div>Category not found</div>;
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="p-5 text-3xl font-bold">{category?.name}</h1>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Erinnerung schreiben</Button>
        </DialogTrigger>
        <DialogContent className="bg-white w-[90vw]">
          <DialogTitle>Die Erinnerung</DialogTitle>
          <div className="grid w-full gap-1.5 p-2">
            <Textarea
              placeholder="Schreibe deine Erinnerung hier"
              id="message"
              className="min-h-[40vh]"
            />
          </div>
        </DialogContent>
      </Dialog>
      {/* <HTMLFlipBook
        width={300}
        height={500}
        autoSize={true}
        maxShadowOpacity={0.5}
        showCover={true}
        mobileScrollSupport={true}
        minWidth={300}
        maxWidth={600}
        minHeight={500}
        maxHeight={800}
        className="flipbook"
        style={{ margin: "auto" }}
        startPage={0}
        size="stretch"
        drawShadow={false}
        flippingTime={1000}
        usePortrait={false}
        startZIndex={0}
        clickEventForward={true}
        useMouseEvents={true}
        swipeDistance={50}
        showPageCorners={true}
        disableFlipByClick={false}
      >
        <div className="demoPage">Page 1</div>
        <div className="demoPage">Page 2</div>
        <div className="demoPage">Page 3</div>
        <div className="demoPage">Page 4</div>
      </HTMLFlipBook> */}

      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          {memories.map((memory, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{memory}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
