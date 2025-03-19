"use server";

import { revalidateTag } from "next/cache";

export const create = async (formData: FormData) => {
  const title = formData.get("title");
  const response = await fetch("http://localhost:3001/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });
  if (response.ok) {
    //revalidatePath("/todos");
    revalidateTag("todos-list");
  }
};

export const deleteTodo = async (id: string) => {
  const response = await fetch(`http://localhost:3001/todos/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    //revalidatePath("/todos");
    revalidateTag("todos-list");
  }
};
