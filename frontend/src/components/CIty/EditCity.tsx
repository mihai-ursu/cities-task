import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Edit } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { CityType } from "@/types/city.interface";
import useUpdateCityById from "@/hooks/useUpdateCityById";
import StarRating from "@/components/AddCity/StarRating";

const editCitySchema = z.object({
  touristRating: z
    .number()
    .min(1, "Minimum rating is 1")
    .max(5, "Maximum rating is 5"),
  dateEstablished: z.string().regex(/^\d+\s?(AD|BC)$/, {
    message: "Enter a year like '1820 AD' or '230 BC'",
  }),
  estimatedPopulation: z.number().positive("Population must be greater than 0"),
});

export type EditCityFormValues = z.infer<typeof editCitySchema>;

interface EditCityProps {
  city: CityType;
}

export default function EditCity({ city }: EditCityProps) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const updateCityMutation = useUpdateCityById();

  const form = useForm<EditCityFormValues>({
    resolver: zodResolver(editCitySchema),
    defaultValues: {
      touristRating: city.touristRating,
      dateEstablished: city.dateEstablished,
      estimatedPopulation: city.estimatedPopulation,
    },
  });

  function onSubmit(values: EditCityFormValues) {
    const updatedCity: CityType = {
      ...city,
      ...values,
    };

    updateCityMutation.mutate(updatedCity, {
      onSuccess: () => {
        toast.success("City updated successfully!");
        queryClient.invalidateQueries({ queryKey: ["cities"] });
        setOpen(false);
      },
      onError: (err: unknown) => {
        console.error(err);
        toast.error(
          err instanceof Error ? err.message : "Error updating city."
        );
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          <Edit className="h-4 w-4" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit City</DialogTitle>
          <DialogDescription>
            Edit details for <strong>{city.name}</strong>
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="touristRating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tourist Rating</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value?.toString()}
                          onValueChange={(value) =>
                            field.onChange(parseInt(value))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select rating">
                              {field.value && (
                                <StarRating rating={field.value} />
                              )}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <SelectItem
                                key={rating}
                                value={rating.toString()}
                              >
                                <StarRating rating={rating} />
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="dateEstablished"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date Established</FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Year"
                            min={1}
                            {...field}
                            value={field.value ? field.value.split(" ")[0] : ""}
                            onChange={(e) => {
                              const currentEra =
                                field.value?.split(" ")[1] || "AD";
                              field.onChange(`${e.target.value} ${currentEra}`);
                            }}
                          />
                        </FormControl>
                        <FormControl>
                          <select
                            className="border rounded px-2 py-1"
                            value={field.value?.split(" ")[1] || "AD"}
                            onChange={(e) => {
                              const currentYear =
                                field.value?.split(" ")[0] || "";
                              field.onChange(
                                `${currentYear} ${e.target.value}`
                              );
                            }}
                          >
                            <option value="AD">AD</option>
                            <option value="BC">BC</option>
                          </select>
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="estimatedPopulation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estimated Population</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="e.g. 2161000"
                          {...field}
                          value={field.value || ""}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" className="cursor-pointer">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="cursor-pointer"
                disabled={updateCityMutation.isPending}
              >
                {updateCityMutation.isPending ? "Updating..." : "Update City"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
