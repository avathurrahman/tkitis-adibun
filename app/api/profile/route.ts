import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/data/auth";
import { updateProfileForUser } from "@/lib/data/profiles";
import { profileUpdateRequestSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = profileUpdateRequestSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Profil tidak valid." }, { status: 400 });
  }

  const fullName = parsed.data.full_name?.trim() || null;
  const avatarUrl = parsed.data.avatar_url?.trim() || null;

  try {
    const { error } = await updateProfileForUser(user.id, {
      avatar_url: avatarUrl,
      full_name: fullName,
    });

    if (error) {
      return NextResponse.json({ error: "Gagal memperbarui profil." }, { status: 500 });
    }
  } catch (error) {
    console.error("profile_update_error", error);
    return NextResponse.json(
      { error: "Fitur profil memerlukan konfigurasi server tambahan." },
      { status: 503 },
    );
  }

  return NextResponse.json({
    success: true,
    profile: {
      avatar_url: avatarUrl,
      full_name: fullName,
    },
  });
}
