import { currentUser } from "@clerk/nextjs/server";

export default async function Dashboard() {
  const user = await currentUser();

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <h1 className="text-3xl font-bold">
        Welcome {user?.firstName || "User"} 👋
      </h1>
    </div>
  );
}