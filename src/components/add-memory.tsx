"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { createMemory } from "@/lib/utils/create-memory";
import { useRouter } from "next/navigation";
import { Memory } from "@/lib/types";
import { sendNotification } from "@/lib/utils/notifications";

type AddMemoryProps = {
  categoryId: string;
};
export default function AddMemory({ categoryId }: AddMemoryProps) {
  const { register, handleSubmit, reset } = useForm<Memory>({
    defaultValues: {
      id: "",
      title: "",
      text: "",
      author: "",
      categoryId: categoryId,
    },
  });
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const onSubmit = async (data: Memory) => {
    try {
      const memoryData = {
        ...data,
        categoryId: categoryId,
      };
      const newMemory = await createMemory(memoryData);

      if (newMemory) {
        await sendNotification(
          "Neue Erinnerung wurde geschrieben",
          `Someone added a new memory about ${newMemory.title}`
        );
      }
      reset();
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      setError("Error creating memory");
      console.error("Error creating memory", error);
    }
  };
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="secondary"
            className="bg-emerald-500 text-black  text-xl flex-col h-full p-2"
          >
            <p>Erinnerung hinzufügen</p>
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-white w-[90vw]">
          <DialogTitle>Die Erinnerung</DialogTitle>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid w-full gap-1.5 p-2"
          >
            <Textarea placeholder="Titel" id="message" {...register("title")} />
            <Textarea
              placeholder="Schreibe deine Erinnerung hier"
              id="message"
              className="min-h-[40vh]"
              {...register("text", { required: true })}
            />
            <Textarea
              placeholder="Autor*in"
              id="message"
              {...register("author")}
            />
            <Button type="submit">hinzufügen</Button>
          </form>
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
    </div>
  );
}
