import Delete from "./_components/Delete";
import { create } from "./action";

const getTodoList = async () => {
  const response = await fetch(`http://localhost:3001/todos`, {
    cache: "force-cache",
    next: {
      //revalidate: 10,
      tags: ["todos-list"],
    },
  });
  const data = await response.json();
  return data;
};
export default async function TodoPage() {
  const todoList = await getTodoList();
  return (
    <div className="w-3/4 mx-auto py-3">
      <h1 className="text-4xl">TODO LIST</h1>
      <ul className="list-disc list-inside mt-3">
        {todoList.map((todo: { id: string; title: string }) => (
          <li key={todo.id}>
            {todo.title} <Delete id={todo.id} />
          </li>
        ))}
      </ul>
      <form action={create}>
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
    </div>
  );
}
