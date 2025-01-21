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
import { useRouter } from "next/navigation";
import { updateMemoryAction } from "@/lib/utils/update-memory-action";
import { Memory } from "@/lib/types";

type UpdateMemoryProps = {
  memory: Memory;
};
export default function UpdateMemory({ memory }: UpdateMemoryProps) {
  const { register, handleSubmit, reset } = useForm<Memory>({
    defaultValues: {
      id: memory.id,
      title: memory.title || "",
      text: memory.text,
      author: memory.author || "",
      categoryId: memory.categoryId || "",
    },
  });
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const onSubmit = async (data: Memory) => {
    try {
      const memoryData = {
        ...data,
        title: data.title || null,
        author: data.author || null,
        categoryId: data.categoryId || null,
      };
      await updateMemoryAction(memoryData);
      reset();
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      setError("Error updating memory");
      console.error("Error updating memory", error);
    }
  };
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="secondary"
            className="bg-amber-500 text-black  text-xl"
          >
            <p>bearbeiten</p>
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-white w-[90vw]">
          <DialogTitle>Die Erinnerung bearbeiten</DialogTitle>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid w-full gap-1.5 p-2"
          >
            <input type="hidden" {...register("id")} />
            <input type="hidden" {...register("categoryId")} />
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
            <p className="font-bold text-red-400">
              Ganz sicher dass du es so ändern willst? Die vorherige Version
              wird unwiederbringlich gelöscht, wennn du hier klickst:
            </p>
            <Button type="submit" className="bg-red-700">
              Änderung sichern
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
