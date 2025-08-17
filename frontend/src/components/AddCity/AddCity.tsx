import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { Plus } from "lucide-react";

import useCreateCity from "@/hooks/useCreateCity";

import StarRating from "./StarRating";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const citySchema = z.object({
  name: z.string().min(2, "City name must be at least 2 characters."),
  state: z.string().min(2, "State must be at least 2 characters."),
  country: z.string().min(2, "Country must be at least 2 characters."),
  touristRating: z
    .number()
    .min(1, "Minimum rating is 1")
    .max(5, "Maximum rating is 5"),
  dateEstablished: z.string().regex(/^\d+\s?(AD|BC)$/, {
    message: "Enter a year like '1820 AD' or '230 BC'",
  }),
  estimatedPopulation: z.number().positive("Population must be greater than 0"),
});

export type CityFormValues = z.infer<typeof citySchema>;

export function AddCity() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const form = useForm<CityFormValues>({
    resolver: zodResolver(citySchema),
    defaultValues: {
      name: "",
      state: "",
      country: "",
      touristRating: 5,
      dateEstablished: "",
      estimatedPopulation: 0,
    },
  });

  const createCityMutation = useCreateCity();

  function onSubmit(values: CityFormValues) {
    console.log(values);
    createCityMutation.mutate(values, {
      onSuccess: () => {
        form.reset();
        queryClient.invalidateQueries({ queryKey: ["cities"] });
        setOpen(false);

        alert("City created successfully!");
      },
      onError: (err: unknown) => {
        console.error(err);
        alert(err instanceof Error ? err.message : "Error creating city.");
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          <Plus className="h-4 w-4" />
          Add City
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add City</DialogTitle>
          <DialogDescription>Add a new city to the list</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Paris" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State / Region</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Ile-de-France" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. France" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
                disabled={createCityMutation.isPending}
              >
                {createCityMutation.isPending ? "Adding..." : "Add City"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
