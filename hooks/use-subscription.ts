"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "./use-auth";

type Subscription = {
  id: string;
  plan: "FREE" | "BASIC" | "PRO" | "ULTIMATE";
  status: "ACTIVE" | "CANCELED" | "PAST_DUE" | "UNPAID";
  current_period_start: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  created_at: string;
  updated_at: string;
};

export function useSubscription() {
  const { user, loading: authLoading } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setSubscription(null);
      setLoading(false);
      return;
    }

    const supabase = createClient();

    supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", user.id)
      .single()
      .then(({ data }) => {
        setSubscription(data);
        setLoading(false);
      });
  }, [user, authLoading]);

  const isPro = subscription?.plan === "PRO" || subscription?.plan === "ULTIMATE";
  const isActive = subscription?.status === "ACTIVE";

  return { subscription, loading, isPro, isActive };
}
