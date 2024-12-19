import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import TodoForm from "./TodoForm";

interface AddTodoDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (data: { title: string; description?: string }) => void;
}

export default function AddTodoDialog({
  open = true,
  onOpenChange = () => {},
  onSubmit = () => {},
}: AddTodoDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-background">
        <DialogHeader>
          <DialogTitle>Add New Todo</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <TodoForm onSubmit={onSubmit} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
