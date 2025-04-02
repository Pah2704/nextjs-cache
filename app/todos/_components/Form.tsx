"use client";

import { revalidateTag } from "@/app/utils/cache";
import { useRouter } from "next/navigation";

export default function Form() {
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title");
    console.log(title);
    const response = await fetch(`http://localhost:3001/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: title as string }),
    });
    if (response.ok) {
      //revalidate cache
      revalidateTag("todos-list");
      router.refresh();
      (e.target as HTMLFormElement).reset();
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="title"
        className="border-2"
      />
      <button type="submit" className="border-2">
        Add Todo
      </button>
    </form>
  );
}
