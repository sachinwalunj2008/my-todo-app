import { supabase } from "../supabase";

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  created_at: Date;
  user_id: string;
}

export async function getTodos() {
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function createTodo({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  const { data, error } = await supabase
    .from("todos")
    .insert([{ title, description, completed: false }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateTodo(
  id: string,
  updates: Partial<Omit<Todo, "id" | "created_at" | "user_id">>,
) {
  const { data, error } = await supabase
    .from("todos")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteTodo(id: string) {
  const { error } = await supabase.from("todos").delete().eq("id", id);

  if (error) throw error;
}

export async function toggleTodoComplete(id: string, completed: boolean) {
  return updateTodo(id, { completed });
}
