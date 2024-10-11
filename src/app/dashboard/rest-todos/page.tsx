import { Metadata } from "next";
import { NewTodo, TodosGrid } from "@/todos";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "To-do's (rest)",
  description: "App To-do's using next rest API",
};

export default async function RestTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <>
      <div className="w-full px-5 mx-5 mb-5">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </>
  );
}
