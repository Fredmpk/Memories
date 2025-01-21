"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import getEmptyCategories from "@/lib/utils/get-empty-categories";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { useForm } from "react-hook-form";
import deleteCategoryAction from "@/lib/utils/delete-category-action";

type FormData = {
  categoryId: string;
};

type DeleteCategoryProps = {
  emptyCategories: Array<{ id: string; name: string }>;
};
export default function DeleteCategory({
  emptyCategories,
}: DeleteCategoryProps) {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { handleSubmit, reset } = useForm<FormData>();

  const onSubmit = async () => {
    if (!selectedCategory) return;

    const result = await deleteCategoryAction(selectedCategory);

    if (result.success) {
      setOpen(false);
      reset();
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="destructive"
            className="fixed bottom-5 left-0 right-0 mx-auto max-w-[calc(100%-3.5rem)] text-xl bg-red-700"
          >
            Kategorie löschen
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-zinc-900 rounded-md text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold mb-4">
              Kategorie löschen
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card className="bg-zinc-600">
              <CardHeader className="text-white">
                Nur Kategorien ohne Inhalt können gelöscht werden, werden dann
                aber unwiederbringlich für alle gelöscht. Falls du eine
                Kategorie mit Inhalt löschen möchtest, musst du erst alle
                dazugehörigen Erinnerungen einzeln löschen.
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <Select
                  onValueChange={setSelectedCategory}
                  value={selectedCategory}
                >
                  <SelectTrigger className="bg-zinc-700">
                    <SelectValue
                      placeholder="
                    Kategorie auswählen
                  "
                    ></SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {emptyCategories.map((category) => (
                      <SelectItem
                        value={category.id}
                        key={category.id}
                        className="p-3 border rounded text-white bg-zinc-700"
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <CardFooter className="text-white">
                  <Button
                    variant="outline"
                    className="text-black bg-red-200"
                    type="submit"
                  >
                    Final Löschen
                  </Button>
                </CardFooter>
              </CardContent>
            </Card>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
