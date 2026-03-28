const DAY_IN_MS = 24 * 60 * 60 * 1000;
const HOUR_IN_MS = 60 * 60 * 1000;

export const DASHBOARD_DEMO_REFERENCE_TIME = "2026-03-28T15:41:00+07:00";

type DemoPlan = "FREE" | "BASIC" | "PRO" | "ULTIMATE";
type DemoRole = "member" | "admin";
type DemoActivityType = "login" | "payment" | "ai_usage" | "profile_update";
type DemoAuditType =
  | "admin.action"
  | "payment.failed"
  | "payment.success"
  | "subscription.change"
  | "user.login"
  | "user.signup";

function createSeededRandom(seed: number) {
  let state = seed >>> 0;

  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 0x1_0000_0000;
  };
}

export function shiftDemoTime({
  days = 0,
  hours = 0,
}: {
  days?: number;
  hours?: number;
}) {
  const referenceTime = new Date(DASHBOARD_DEMO_REFERENCE_TIME).getTime();

  return new Date(referenceTime - days * DAY_IN_MS - hours * HOUR_IN_MS).toISOString();
}

export function createDashboardDemoData({
  userCount = 12,
  waitlistCount = 8,
}: {
  userCount?: number;
  waitlistCount?: number;
} = {}) {
  const random = createSeededRandom(20260328 + userCount * 7 + waitlistCount * 13);
  const plans: DemoPlan[] = ["FREE", "BASIC", "PRO", "ULTIMATE"];

  const usageData = Array.from({ length: 14 }, (_, index) => ({
    date: shiftDemoTime({ days: 13 - index }).slice(0, 10),
    tokens: 1_000 + Math.floor(random() * 8_000),
  }));

  const activities: Array<{
    created_at: string;
    description?: string;
    id: string;
    title: string;
    type: DemoActivityType;
  }> = [
    {
      created_at: shiftDemoTime({ hours: 1 }),
      description: "Chrome · macOS",
      id: "1",
      title: "Login berhasil",
      type: "login",
    },
    {
      created_at: shiftDemoTime({ hours: 5 }),
      description: "Upgrade ke Pro",
      id: "2",
      title: "Pembayaran Rp 99.000",
      type: "payment",
    },
    {
      created_at: shiftDemoTime({ hours: 12 }),
      description: "Model: GPT-4o",
      id: "3",
      title: "AI Chat — 1.240 token",
      type: "ai_usage",
    },
    {
      created_at: shiftDemoTime({ days: 1 }),
      description: "Nama lengkap diubah",
      id: "4",
      title: "Profil diperbarui",
      type: "profile_update",
    },
    {
      created_at: shiftDemoTime({ days: 2 }),
      description: "Safari · iOS",
      id: "5",
      title: "Login berhasil",
      type: "login",
    },
  ];

  const notifications = [
    {
      body: "Paket Pro aktif hingga 17 Apr 2026.",
      created_at: shiftDemoTime({ hours: 2 }),
      id: "1",
      read: false,
      title: "Pembayaran berhasil",
    },
    {
      body: "85% token AI sudah terpakai bulan ini.",
      created_at: shiftDemoTime({ hours: 8 }),
      id: "2",
      read: false,
      title: "Kuota hampir habis",
    },
    {
      body: "Coba fitur text generation baru di dashboard.",
      created_at: shiftDemoTime({ days: 3 }),
      id: "3",
      read: true,
      title: "Fitur baru: AI Generate",
    },
  ];

  const onboardingSteps = [
    { completed: true, id: "1", label: "Buat akun" },
    {
      completed: true,
      description: "Cek inbox untuk link verifikasi",
      id: "2",
      label: "Verifikasi email",
    },
    {
      completed: false,
      description: "Pilih paket yang sesuai kebutuhan kamu",
      href: "/#pricing",
      id: "3",
      label: "Pilih paket",
    },
    {
      completed: false,
      description: "Mulai percakapan pertama dengan AI",
      href: "/dashboard/chat",
      id: "4",
      label: "Coba AI Chat",
    },
    {
      completed: false,
      description: "Tambahkan nama dan foto profil",
      href: "/dashboard/settings",
      id: "5",
      label: "Lengkapi profil",
    },
  ];

  const users = Array.from({ length: userCount }, (_, index) => {
    const number = index + 1;
    const plan = plans[index % plans.length];
    const role: DemoRole = index % 5 === 0 ? "admin" : "member";

    return {
      created_at: shiftDemoTime({ days: 10 + Math.floor(random() * 80) }),
      email: `user${number}@example.com`,
      full_name: index % 3 === 0 ? null : `User ${number}`,
      id: `user-${number}`,
      plan,
      role,
      status: "ACTIVE",
    };
  });

  const pieData = [
    { count: 120, plan: "FREE" },
    { count: 45, plan: "BASIC" },
    { count: 30, plan: "PRO" },
    { count: 8, plan: "ULTIMATE" },
  ] satisfies Array<{ count: number; plan: DemoPlan }>;

  const revenueComparison = Array.from({ length: 14 }, (_, index) => ({
    current: 500_000 + Math.floor(random() * 5_000_000),
    date: shiftDemoTime({ days: 13 - index }).slice(0, 10),
    previous: 300_000 + Math.floor(random() * 4_000_000),
  }));

  const auditEntries: Array<{
    actor_email: string;
    created_at: string;
    description: string;
    id: string;
    type: DemoAuditType;
  }> = [
    {
      actor_email: "new@example.com",
      created_at: shiftDemoTime({ hours: 1 }),
      description: "Pengguna baru mendaftar",
      id: "a1",
      type: "user.signup",
    },
    {
      actor_email: "pro@example.com",
      created_at: shiftDemoTime({ hours: 3 }),
      description: "Pembayaran Rp 99.000 berhasil",
      id: "a2",
      type: "payment.success",
    },
    {
      actor_email: "pro@example.com",
      created_at: shiftDemoTime({ hours: 3 }),
      description: "Upgrade dari Basic ke Pro",
      id: "a3",
      type: "subscription.change",
    },
    {
      actor_email: "admin@kilatkoding.com",
      created_at: shiftDemoTime({ hours: 6 }),
      description: "Login dari 103.28.x.x",
      id: "a4",
      type: "user.login",
    },
    {
      actor_email: "admin@kilatkoding.com",
      created_at: shiftDemoTime({ hours: 8 }),
      description: "Approve waitlist user@example.com",
      id: "a5",
      type: "admin.action",
    },
    {
      actor_email: "fail@example.com",
      created_at: shiftDemoTime({ days: 1 }),
      description: "Pembayaran Rp 49.000 gagal — kartu ditolak",
      id: "a6",
      type: "payment.failed",
    },
    {
      actor_email: "another@example.com",
      created_at: shiftDemoTime({ days: 2 }),
      description: "Pengguna baru mendaftar",
      id: "a7",
      type: "user.signup",
    },
  ];

  const waitlistEntries = Array.from({ length: waitlistCount }, (_, index) => {
    const number = index + 1;

    return {
      created_at: shiftDemoTime({ days: 2 + Math.floor(random() * 28) }),
      email: `waitlist${number}@example.com`,
      id: `wl-${number}`,
      name: index % 4 === 0 ? null : `Pendaftar ${number}`,
    };
  });

  return {
    activities,
    auditEntries,
    notifications,
    onboardingSteps,
    pieData,
    revenueComparison,
    usageData,
    users,
    waitlistEntries,
  };
}
