"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";

export const sleep = async (seconds: number = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
};

export const toggleTodo = async (id: string, complete: boolean): Promise<Todo> => {
  // await sleep(3);

  const todo = await prisma.todo.findFirst({ where: { id } });

  if (!todo) {
    throw `TO-DO with id ${id} does not exist`;
  }

  const updateTodo = await prisma.todo.update({
    where: { id },
    data: { complete },
  });

  revalidatePath("/dashboard/server-todos");

  return updateTodo;
};

export const addTodo = async (description: string): Promise<Todo> => {
  try {
    const todo = await prisma.todo.create({ data: { description } });

    revalidatePath("/dashboard/server-todos");

    return todo;
  } catch (error) {
    console.log(error);
    throw "There was an error trying to cread a new TO-DO";
  }
};

export const deleteCompleted = async (): Promise<void> => {
  await prisma.todo.deleteMany({ where: { complete: true } });
  revalidatePath("/dashboard/server-todos");
};
