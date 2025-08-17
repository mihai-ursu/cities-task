import { useState } from "react";
import useDeleteCityById from "@/hooks/useDeleteCityById";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import type { CityType } from "@/types/city.interface";
import { Trash } from "lucide-react";

export default function DeleteCity({ city }: { city: CityType }) {
  const [open, setOpen] = useState(false);
  const { mutateAsync: deleteCityById, isPending } = useDeleteCityById();

  const handleDelete = async () => {
    try {
      await deleteCityById(city.id);
      setOpen(false);
    } catch (error) {
      console.error("Failed to delete city:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" className="cursor-pointer">
          <Trash className="h-4 w-4" /> Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete City</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <strong>{city.name}</strong>? This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="cursor-pointer"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
