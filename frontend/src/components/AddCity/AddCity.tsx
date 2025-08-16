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

const citySchema = z.object({
  name: z.string().min(2, "City name must be at least 2 characters."),
  state: z.string().min(2, "State must be at least 2 characters."),
  country: z.string().min(2, "Country must be at least 2 characters."),
  touristRating: z
    .number()
    .min(1, "Minimum rating is 1")
    .max(5, "Maximum rating is 5"),
  dateEstablished: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date",
  }),
  estimatedPopulation: z.number().positive("Population must be greater than 0"),
});

export type CityFormValues = z.infer<typeof citySchema>;

export function AddCity() {
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
    createCityMutation.mutate(values, {
      onSuccess: () => {
        form.reset();
        alert("City created successfully!");
      },
      onError: (err: unknown) => {
        console.error(err);
        alert(err instanceof Error ? err.message : "Error creating city.");
      },
    });
  }

  return (
    <Dialog>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 max-w-md"
        >
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
                      <FormLabel>State</FormLabel>
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
                  name="dateEstablished"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date Established</FormLabel>
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
                  name="estimatedPopulation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estimated Population</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Paris" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Add City</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  );
}
