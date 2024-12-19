import { useState, useMemo, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import ThemeToggle from "./todo/ThemeToggle";
import TodoCard from "./todo/TodoCard";
import AddTodoButton from "./todo/AddTodoButton";
import AddTodoDialog from "./todo/AddTodoDialog";
import TodoDetailsDialog from "./todo/TodoDetailsDialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodoComplete,
  Todo,
} from "@/lib/api/todos";

type SortOption = "newest" | "oldest" | "title";
type FilterOption = "all" | "active" | "completed";

function Home() {
  const { toast } = useToast();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [filterBy, setFilterBy] = useState<FilterOption>("all");

  useEffect(() => {
    loadTodos();
  }, []);

  async function loadTodos() {
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error loading todos",
        description: "Please try again later",
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleAddTodo(data: { title: string; description?: string }) {
    try {
      await createTodo(data);
      await loadTodos();
      setShowAddDialog(false);
      toast({
        title: "Todo created",
        description: "Your new todo has been created successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error creating todo",
        description: "Please try again later",
      });
    }
  }

  async function handleUpdateTodo(data: {
    title: string;
    description?: string;
  }) {
    if (!selectedTodo) return;
    try {
      await updateTodo(selectedTodo.id, data);
      await loadTodos();
      setSelectedTodo(null);
      toast({
        title: "Todo updated",
        description: "Your todo has been updated successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error updating todo",
        description: "Please try again later",
      });
    }
  }

  async function handleDeleteTodo(id: string) {
    try {
      await deleteTodo(id);
      await loadTodos();
      setSelectedTodo(null);
      toast({
        title: "Todo deleted",
        description: "Your todo has been deleted successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error deleting todo",
        description: "Please try again later",
      });
    }
  }

  async function handleToggleComplete(id: string, completed: boolean) {
    try {
      await toggleTodoComplete(id, completed);
      await loadTodos();
      toast({
        title: completed ? "Todo completed" : "Todo uncompleted",
        description: `Todo has been marked as ${completed ? "completed" : "active"}`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error updating todo",
        description: "Please try again later",
      });
    }
  }

  const filteredAndSortedTodos = useMemo(() => {
    let result = [...todos];

    // Apply filter
    if (filterBy !== "all") {
      result = result.filter((todo) =>
        filterBy === "completed" ? todo.completed : !todo.completed,
      );
    }

    // Apply sort
    result.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        case "oldest":
          return (
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return result;
  }, [todos, sortBy, filterBy]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-background p-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Todos</h1>
        <ThemeToggle />
      </div>

      {/* Filters */}
      <div className="max-w-4xl mx-auto flex gap-4 mb-6">
        <Select
          value={sortBy}
          onValueChange={(value: SortOption) => setSortBy(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="title">Title</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filterBy}
          onValueChange={(value: FilterOption) => setFilterBy(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>

        {filterBy !== "all" && (
          <Button
            variant="ghost"
            onClick={() => setFilterBy("all")}
            className="text-sm"
          >
            Clear Filter
          </Button>
        )}
      </div>

      {/* Todo List */}
      <div className="max-w-4xl mx-auto space-y-4">
        {filteredAndSortedTodos.map((todo) => (
          <TodoCard
            key={todo.id}
            title={todo.title}
            description={todo.description}
            completed={todo.completed}
            onClick={() => setSelectedTodo(todo)}
            onComplete={() => handleToggleComplete(todo.id, !todo.completed)}
            onDelete={() => handleDeleteTodo(todo.id)}
          />
        ))}

        {filteredAndSortedTodos.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            {filterBy === "all"
              ? "No todos yet. Click the + button to add one."
              : `No ${filterBy} todos found.`}
          </div>
        )}
      </div>

      {/* Add Todo Button */}
      <AddTodoButton onClick={() => setShowAddDialog(true)} />

      {/* Add Todo Dialog */}
      <AddTodoDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSubmit={handleAddTodo}
      />

      {/* Todo Details Dialog */}
      <TodoDetailsDialog
        open={selectedTodo !== null}
        onOpenChange={(open) => !open && setSelectedTodo(null)}
        todo={selectedTodo ?? undefined}
        onSubmit={handleUpdateTodo}
        onDelete={() => selectedTodo && handleDeleteTodo(selectedTodo.id)}
      />
    </div>
  );
}

export default Home;
