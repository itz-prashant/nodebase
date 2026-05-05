"use client"
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function page() {
  
  const {data} = authClient.useSession()
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      Nodebase
      {JSON.stringify(data)}
      {data && <Button onClick={()=> authClient.signOut()}>
        Logout
      </Button>}
    </div>
  );
}
