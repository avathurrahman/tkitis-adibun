export type ServiceStatus = "operational" | "degraded" | "down";

export const serviceStatusPageConfig = {
  incidents: [
    {
      date: "10 Mar 2026",
      detail:
        "Resend mengalami degradasi selama ~45 menit. Semua email terkirim setelah pemulihan.",
      resolved: true,
      title: "Email pengiriman lambat — diselesaikan",
    },
    {
      date: "1 Feb 2026",
      detail:
        "Webhook Midtrans mengalami delay 2–5 menit. Tidak ada pembayaran yang hilang.",
      resolved: true,
      title: "Midtrans webhook timeout — diselesaikan",
    },
  ],
  lastUpdated: "16 Maret 2026, 09:00 WIB",
  services: [
    { name: "Website", description: "kilatkoding.com", status: "operational" as ServiceStatus },
    { name: "Autentikasi", description: "Login, register, OAuth", status: "operational" as ServiceStatus },
    { name: "Database", description: "Supabase Postgres", status: "operational" as ServiceStatus },
    { name: "Email", description: "Resend transactional email", status: "operational" as ServiceStatus },
    { name: "Payment — Midtrans", description: "Snap payment gateway", status: "operational" as ServiceStatus },
    { name: "Payment — Doku", description: "JOKUL payment gateway", status: "operational" as ServiceStatus },
    { name: "CDN & Hosting", description: "Vercel Edge Network", status: "operational" as ServiceStatus },
    { name: "API", description: "REST API endpoints", status: "operational" as ServiceStatus },
  ],
};
