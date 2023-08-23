import { ITask } from "./types/tasks";

const baseUrl = "http://localhost:3001";

export const getAllTodos = async (): Promise<ITask[]> => {
  const res = await fetch(`${baseUrl}/tasks`, { cache: "no-store" });
  const data = await res.json();
  return data;
};

export const createNewTodos = async (todo: ITask): Promise<ITask> => {
  const res = await fetch(`${baseUrl}/tasks`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  const newTodo = await res.json();
  return newTodo;
};

export const updateTodos = async (todo: ITask): Promise<ITask> => {
  const res = await fetch(`${baseUrl}/tasks/${todo.id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  const updatedTodo = await res.json();
  return updatedTodo;
};

export const deleteTodos = async (id: string): Promise<void> => {
  await fetch(`${baseUrl}/tasks/${id}`, {
    method: "DELETE",
  });
};
