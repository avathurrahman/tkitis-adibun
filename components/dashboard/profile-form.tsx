"use client";

import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ProfileForm({
  avatarUrl,
  email,
  fullName,
}: {
  avatarUrl: string | null;
  email: string;
  fullName: string | null;
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [formState, setFormState] = useState({
    avatar_url: avatarUrl ?? "",
    full_name: fullName ?? "",
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);

    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error ?? "Gagal memperbarui profil.");
        return;
      }

      toast.success("Profil berhasil diperbarui.");
      startTransition(() => {
        router.refresh();
      });
    } catch {
      toast.error("Gagal memperbarui profil.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="profile-email">Email</Label>
        <Input id="profile-email" value={email} disabled readOnly />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="profile-full-name">Nama lengkap</Label>
        <Input
          id="profile-full-name"
          value={formState.full_name}
          onChange={(event) =>
            setFormState((current) => ({
              ...current,
              full_name: event.target.value,
            }))
          }
          placeholder="Nama kamu"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="profile-avatar-url">Avatar URL</Label>
        <Input
          id="profile-avatar-url"
          type="url"
          value={formState.avatar_url}
          onChange={(event) =>
            setFormState((current) => ({
              ...current,
              avatar_url: event.target.value,
            }))
          }
          placeholder="https://..."
        />
      </div>
      <div>
        <Button type="submit" disabled={pending}>
          {pending ? "Menyimpan..." : "Simpan Profil"}
        </Button>
      </div>
    </form>
  );
}
