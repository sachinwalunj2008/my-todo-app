import { Check, Trash2, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TodoCardProps {
  title?: string;
  description?: string;
  completed?: boolean;
  onComplete?: () => void;
  onDelete?: () => void;
  onClick?: () => void;
}

export default function TodoCard({
  title = "Sample Todo",
  description = "This is a sample todo description",
  completed = false,
  onComplete = () => {},
  onDelete = () => {},
  onClick = () => {},
}: TodoCardProps) {
  return (
    <Card className="relative w-full max-w-[800px] h-20 bg-background hover:shadow-md transition-all duration-200 group cursor-pointer overflow-hidden">
      {/* Swipe action indicators */}
      <div className="absolute inset-y-0 left-0 w-16 bg-destructive opacity-0 group-hover:opacity-10 transition-opacity" />
      <div className="absolute inset-y-0 right-0 w-16 bg-primary opacity-0 group-hover:opacity-10 transition-opacity" />

      {/* Main content */}
      <div
        className="flex items-center justify-between h-full px-6"
        onClick={onClick}
      >
        <div className="flex items-center space-x-4 flex-1">
          <div
            className={cn(
              "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
              completed
                ? "bg-primary border-primary"
                : "border-muted-foreground",
            )}
            onClick={(e) => {
              e.stopPropagation();
              onComplete();
            }}
          >
            {completed && <Check className="w-4 h-4 text-primary-foreground" />}
          </div>

          <div className="flex-1 min-w-0">
            <h3
              className={cn(
                "text-lg font-medium truncate",
                completed && "line-through text-muted-foreground",
              )}
            >
              {title}
            </h3>
            <p className="text-sm text-muted-foreground truncate">
              {description}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            className="p-2 hover:bg-muted rounded-full transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <Trash2 className="w-5 h-5 text-muted-foreground" />
          </button>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>
    </Card>
  );
}
