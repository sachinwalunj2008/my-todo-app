import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import TodoForm from "./TodoForm";

interface TodoDetailsDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (data: { title: string; description?: string }) => void;
  onDelete?: () => void;
  todo?: {
    title: string;
    description?: string;
    completed: boolean;
  };
}

export default function TodoDetailsDialog({
  open = true,
  onOpenChange = () => {},
  onSubmit = () => {},
  onDelete = () => {},
  todo = {
    title: "Sample Todo",
    description: "This is a sample todo description",
    completed: false,
  },
}: TodoDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-background">
        <DialogHeader>
          <DialogTitle>Todo Details</DialogTitle>
          <DialogDescription className="flex items-center space-x-2">
            <span
              className={`inline-block w-3 h-3 rounded-full ${
                todo.completed ? "bg-primary" : "bg-muted"
              }`}
            />
            <span>{todo.completed ? "Completed" : "In Progress"}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <TodoForm
            onSubmit={onSubmit}
            defaultValues={{
              title: todo.title,
              description: todo.description,
            }}
            isEditing={true}
          />
        </div>

        <DialogFooter>
          <Button
            variant="destructive"
            onClick={onDelete}
            className="w-full sm:w-auto"
          >
            Delete Todo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
