import { notFound } from "next/navigation";

const getTodo = async (id: string) => {
  const response = await fetch(`http://localhost:3001/todos/${id}`, {
    cache: "force-cache",
    next: {
      tags: [`todo-${id}`],
    },
  });
  if (!response.ok) {
    return false;
  }
  const data = await response.json();
  return data;
};
export default async function TodoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const todo = await getTodo(id);
  if (!todo) return notFound();
  return (
    <div className="w-3/4 mx-auto py-3">
      <h1>{todo.title}</h1>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis,
        rerum qui. Voluptas, autem rem et impedit accusamus tenetur,
        necessitatibus qui libero enim reiciendis eveniet animi? Soluta maxime
        unde reprehenderit voluptates molestiae, praesentium, voluptatem dicta
        tempora eum enim ex vero adipisci inventore assumenda consequatur.
        Itaque, quos minus quas fuga temporibus consectetur aut aliquid nisi
      </p>
    </div>
  );
}
