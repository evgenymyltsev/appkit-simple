'use client'
import { useRouter } from 'next/router';
import React from 'react'
import { useAccount } from 'wagmi';

export const DashPage = () => {
    const account = useAccount();
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
            setUser(user);
          } catch (err) {
            console.error(err);
          }
        }
      };
      fetchUser();
    }, [account]);
  
    if (account.isConnecting) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-2xl text-black">Loading...</p>
        </div>
      );
    }
  
    if (account.isConnected && user) {
      return (
        <div className="w-screen h-screen">
          <iframe src="http://62.109.31.207:80" className="h-full w-full" frameBorder="0" />
        </div>
      );
    }
}
