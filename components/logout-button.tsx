"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { forwardRef } from "react";

export const LogoutButton = forwardRef<
  HTMLButtonElement,
  { asMenuItem?: boolean }
>(function LogoutButton({ asMenuItem, ...props }, ref) {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  if (asMenuItem) {
    return (
      <button
        ref={ref}
        onClick={logout}
        className="w-full text-left text-sm cursor-pointer"
        {...props}
      >
        Keluar
      </button>
    );
  }

  return (
    <Button ref={ref} onClick={logout} variant="outline" size="sm" {...props}>
      Keluar
    </Button>
  );
});
