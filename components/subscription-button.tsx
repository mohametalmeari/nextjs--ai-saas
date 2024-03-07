"use client";

import { ZapIcon } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import { useState } from "react";

interface SubscriptionButtonProps {
  isPro: boolean;
}

export const SubscriptionButton = ({
  isPro = false,
}: SubscriptionButtonProps) => {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      setLoading(true);

      const res = await axios.get("/api/stripe");

      window.location.href = res.data.url;
    } catch (error) {
      console.log(error, "BILLING_ERROR");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={isPro ? "default" : "premium"}
      onClick={onClick}
      disabled={loading}
    >
      {isPro ? (
        "Manage Subscription"
      ) : (
        <>
          Upgrade <ZapIcon className="w-4 h-4 ml-2 fill-white" />
        </>
      )}
    </Button>
  );
};
