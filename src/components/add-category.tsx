"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createCategory } from "@/lib/utils/create-category";
import getCategories from "@/lib/utils/get-categories";
import { DialogClose } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";

type Category = {
  name: string;
};

export default function AddCategory() {
  const { register, handleSubmit, reset } = useForm<Category>({
    defaultValues: {
      name: "",
    },
  });
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const onSubmit = async (data: Category) => {
    try {
      await createCategory(data);

      reset();
      router.refresh();
      setIsOpen(false);
    } catch (error) {
      setError("Error creating Category");
      console.error("Error creating Category", error);
    }
  };

  return (
    <div className="p-3 bg-black text-white rounded-xl text-2xl opacity-80 flex justify-center font-bold">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger>Hinzufügen</DialogTrigger>
        <DialogContent className="bg-zinc-100 w-[90vw] p-5">
          <DialogHeader>
            <DialogTitle hidden>Kategorie hinzufügen</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center items-center"
          >
            <Input
              type="text"
              placeholder="Kategorie"
              {...register("name", { required: true })}
              className="my-5"
            />
            <Button type="submit">hinzufügen</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
