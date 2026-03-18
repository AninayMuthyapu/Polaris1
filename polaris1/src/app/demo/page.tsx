"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function DemoPage() {
  const [response, setResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      setResponse("");
      const res = await fetch("/api/demo/blocking", {
        method: "POST",
      });
      const data = await res.json();
      setResponse(data.response?.text || JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(error);
      setResponse("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-8 min-h-screen">
      <h1 className="text-2xl font-bold">Gen AI Demo</h1>
      <Button onClick={handleClick} disabled={isLoading} size="lg">
        {isLoading ? "Generating..." : "Generate AI Response"}
      </Button>
      
      {response && (
        <div className="w-full max-w-2xl p-6 mt-4 border rounded-md bg-muted/50 whitespace-pre-wrap">
          {response}
        </div>
      )}
    </div>
  );
}
