"use client";
import { useAccount } from "wagmi";
import React, { useEffect } from "react";

const SimplePage: React.FC = () => {
  const account = useAccount();

  React.useEffect(() => {
    if (account.isConnected) {
      fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address: account.address }),
      });
    }
  }, [account.isConnected]);

  return (
    <main className="w-full flex flex-col items-center justify-center gap-8 min-h-screen bg-white">
      <h1 className="text-6xl text-black font-bold">
        {account.isConnected ? "Connected" : "Main"}
      </h1>
      {/* @ts-ignore */}
      <w3m-button />
      {account.isConnected && (
        <div className="flex flex-col gap-4 items-center p-4 border-2 border-gray-300 rounded-xl text-black">
          <p className="font-bold text-lg">Address</p>
          <p className="text-lg">{account.address}</p>
          {/* @ts-ignore */}
          <w3m-network-button />
        </div>
      )}
    </main>
  );
};

export default SimplePage;
