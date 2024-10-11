export const dynamic = "force-dynamic";
export const revalidate = 0;

import { Metadata } from "next";
import { NewTodo, TodosGrid } from "@/todos";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "To-do's (server actions)",
  description: "App To-do's using next server actions",
};

export default async function ServerTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <>
      <span className="text-3xl mb-10">Server Actions</span>
      <div className="w-full px-5 mx-5 mb-5">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </>
  );
}
