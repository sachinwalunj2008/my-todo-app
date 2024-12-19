import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const todoFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
});

type TodoFormValues = z.infer<typeof todoFormSchema>;

interface TodoFormProps {
  onSubmit?: (data: TodoFormValues) => void;
  defaultValues?: TodoFormValues;
  isEditing?: boolean;
}

export default function TodoForm({
  onSubmit = () => {},
  defaultValues = {
    title: "",
    description: "",
  },
  isEditing = false,
}: TodoFormProps) {
  const form = useForm<TodoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues,
  });

  return (
    <div className="w-full max-w-[360px] bg-background p-4 rounded-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter todo title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter todo description (optional)"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            {isEditing ? "Update Todo" : "Add Todo"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
