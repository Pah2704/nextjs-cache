import { cookies } from "next/headers";

export default async function HomePage() {
  const cookiesStore = await cookies();
  return (
    <div>
      <h1>HOME PAGE</h1>
      {cookiesStore.get("session")?.value}
    </div>
  );
}
