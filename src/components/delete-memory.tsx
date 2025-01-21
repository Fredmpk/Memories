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

import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { useForm } from "react-hook-form";
import { deleteMemoryAction } from "@/lib/utils/delete-memory-action";

export default function DeleteMemory({ memoryId }: { memoryId: string }) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    try {
      setIsDeleting(true);
      const result = await deleteMemoryAction(memoryId);
      if (result.success) {
        setOpen(false);
      } else {
        console.error("failed to delete memory:", result.error);
      }
    } catch (error) {
      console.error("Error deleting memory:", error);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="destructive" className=" text-xl bg-red-600">
            löschen
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-zinc-900 rounded-md text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold mb-4">
              Erinnerung löschen
            </DialogTitle>
          </DialogHeader>
          <Card className="bg-zinc-600">
            <CardHeader className="text-white">
              Bist du dir sicher, dass du diese Erinnerunglöschen willst? Hast
              du sie geschrieben? Wenn du jetzt auf löschen klickst, ist sie
              unwiederbringlich verloren.
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <CardFooter className="text-white">
                <Button
                  variant="outline"
                  className="text-black bg-red-300"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Löschen..." : "Final und endgültig löschen"}
                </Button>
              </CardFooter>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </div>
  );
}
