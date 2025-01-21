"use client";

import { useSession } from "next-auth/react";


export default function Home() {

  const { data: session } = useSession();

  return (
    <div>
      {session ? `Logged in as ${session.user?.name}` : "Not logged in"}
    </div>
  );
}
