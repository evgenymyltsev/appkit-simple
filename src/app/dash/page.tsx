"use client";
import React from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";

export default function DashPage() {
  const account = useAccount();
  const router = useRouter();
  const [user, setUser] = React.useState();
  React.useEffect(() => {
    const fetchUser = async () => {
      if (account.isConnected) {
        try {
          const res = await fetch("/api/users", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const resJson = await res.json();
          const user = resJson.find(
            (u: { address: string }) => u.address === account.address
          );
          if (!user) {
            router.push("/");
          }
          setUser(user);
        } catch (err) {
          console.error(err);
        }
      } else {
        router.push("/");
      }
    };
    fetchUser();
  }, [account, router]);

  if (account.isConnecting) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-2xl text-black">Loading...</p>
      </div>
    );
  }

  if (account.isConnected && user) {
    return (
      <div className="flex flex-col items-center justify-center gap-8 min-h-screen">
        <h1 className="text-6xl text-black">Dash</h1>
        {account.isConnected && (
          <p className="text-black">Connected to {account.address}</p>
        )}
      </div>
    );
  }
}
