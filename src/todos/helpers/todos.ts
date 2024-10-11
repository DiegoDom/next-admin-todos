import { Todo } from "@prisma/client";

export interface todoApiResp {
  status: "success" | "failed";
  todo: Todo;
}

export const updateTodo = async (id: string, complete: boolean): Promise<Todo> => {
  const body = { complete };

  const resp = await fetch(`/api/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { todo }: todoApiResp = await resp.json();

  return todo;
};

export const createTodo = async (description: string): Promise<Todo> => {
  const body = { description };

  const resp = await fetch("/api/todos", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { todo }: todoApiResp = await resp.json();

  return todo;
};

export const deleteCompletedTodos = async (): Promise<void> => {
  const resp = await fetch("/api/todos", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  await resp.json();
};
