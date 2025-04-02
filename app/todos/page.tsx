import Delete from "./_components/Delete";
import Form from "./_components/Form";
import View from "./_components/View";
import { unstable_cacheLife as cacheLife } from "next/cache";
const getTodoList = async () => {
  const response = await fetch(`http://localhost:3001/todos`, {
    cache: "force-cache",
  });
  const data = await response.json();
  return data;
};
const getPosts = async () => {
  const response = await fetch(`http://localhost:3001/posts`, {
    cache: "force-cache",
  });
  return response.json();
};
export default async function TodoPage() {
  "use cache";
  cacheLife("minutes");
  const todoList = await getTodoList();
  const postList = await getPosts();
  return (
    <div className="w-3/4 mx-auto py-3">
      <h2 className="text-4xl">TODO LIST</h2>
      <ul className="list-disc list-inside mt-3">
        {todoList.map((todo: { id: string; title: string }) => (
          <li key={todo.id}>
            {todo.title} <View id={todo.id} /> <Delete id={todo.id} />
          </li>
        ))}
      </ul>
      <h2 className="text-4xl">POST LIST</h2>
      <ul className="list-disc list-inside mt-3">
        {postList.map((post: { id: string; title: string }) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      <Form />
    </div>
  );
}
