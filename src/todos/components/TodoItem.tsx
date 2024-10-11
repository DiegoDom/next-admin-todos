"use client";

import { startTransition, useOptimistic } from "react";
import { Todo } from "@prisma/client";
import styles from "./TodoItem.module.css";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";

interface Props {
  todo: Todo;
  // TODO: acciones que quiero llamar
  toggleTodo: (id: string, complete: boolean) => Promise<Todo | void>;
}
export const TodoItem = ({ todo, toggleTodo }: Props) => {
  const [todoOptimistic, toggleTodoOptimistic] = useOptimistic(todo, (state, newCompleteValue: boolean) => ({ ...state, complete: newCompleteValue }));
  const { complete, description, id } = todoOptimistic;

  const onToggleTodo = async () => {
    try {
      startTransition(() => {
        toggleTodoOptimistic(!todoOptimistic.complete);
      });

      await toggleTodo(id, !todoOptimistic.complete);
    } catch (error) {
      startTransition(() => {
        toggleTodoOptimistic(!todoOptimistic.complete);
      });
    }
  };

  return (
    <div className={complete ? styles.todoDone : styles.todoPending}>
      <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
        <div
          // onClick={() => toggleTodo(id, !complete)}
          onClick={onToggleTodo}
          className={`flex p-2 rounded-md cursor-pointer hover:bg-opacity-60 ${complete ? "bg-blue-100" : "bg-red-100"}`}
        >
          {complete ? <IoCheckboxOutline size={30} /> : <IoSquareOutline size={30} />}
        </div>
        <div className="text-center sm:text-left">{description}</div>
      </div>
    </div>
  );
};
