import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AddTodoButtonProps {
  onClick?: () => void;
  className?: string;
}

export default function AddTodoButton({
  onClick = () => {},
  className = "",
}: AddTodoButtonProps) {
  return (
    <Button
      variant="default"
      size="icon"
      className={cn(
        "fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 bg-primary",
        className,
      )}
      onClick={onClick}
    >
      <Plus className="h-6 w-6" />
      <span className="sr-only">Add new todo</span>
    </Button>
  );
}
