"use client";

import { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  InboxIcon,
  PackageIcon,
} from "lucide-react";

import { StatsGrid } from "@/components/dashboard/stats-grid";
import { EmptyState } from "@/components/dashboard/empty-state";
import { PaymentStatusBadge } from "@/components/dashboard/payment-status-badge";
import { DateRangePicker } from "@/components/dashboard/date-range-picker";
import { DataTableToolbar } from "@/components/dashboard/data-table-toolbar";
import { ExportButton } from "@/components/dashboard/export-button";
import { UsageChart } from "@/components/dashboard/usage-chart";
import { UsageMeter } from "@/components/dashboard/usage-meter";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { PlanComparisonModal } from "@/components/dashboard/plan-comparison-modal";
import { ProfileAvatar } from "@/components/dashboard/profile-avatar";
import { NotificationDropdown } from "@/components/dashboard/notification-dropdown";
import { CommandPalette } from "@/components/dashboard/command-palette";
import { OnboardingChecklist } from "@/components/dashboard/onboarding-checklist";
import { AdminStatsCards } from "@/components/admin/stats-cards";
import { UserTable, type UserRow } from "@/components/admin/user-table";
import { UserDetailSheet } from "@/components/admin/user-detail-sheet";
import { SubscriptionPieChart } from "@/components/admin/subscription-pie-chart";
import { RevenueLineChart } from "@/components/admin/revenue-line-chart";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AuditLog } from "@/components/admin/audit-log";
import { WaitlistTable } from "@/components/admin/waitlist-table";
import type { DateRange } from "react-day-picker";
import {
  createDashboardDemoData,
  DASHBOARD_DEMO_REFERENCE_TIME,
  shiftDemoTime,
} from "@/lib/demo/dashboard-mocks";

// ─── Mock Data ────────────────────────────────────────────
const {
  activities: mockActivities,
  auditEntries: mockAuditEntries,
  notifications: mockNotifications,
  onboardingSteps: mockOnboardingSteps,
  pieData: mockPieData,
  revenueComparison: mockRevenueComparison,
  usageData: mockUsageData,
  users: mockUsers,
  waitlistEntries: mockWaitlist,
} = createDashboardDemoData({
  userCount: 25,
  waitlistCount: 18,
});

// ─── Section Wrapper ──────────────────────────────────────

function ShowcaseSection({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20">
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">{title}</h2>
          <Badge variant="outline" className="text-[10px]">
            {id}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {children}
    </section>
  );
}

// ─── Main Component ───────────────────────────────────────

export function ComponentShowcase() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [toolbarSearch, setToolbarSearch] = useState("");
  const [notifications, setNotifications] = useState(mockNotifications);
  const [selectedUser, setSelectedUser] = useState<UserRow | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  function handleMarkAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }
  function handleMarkRead(id: string) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }

  function handleViewUser(user: UserRow) {
    setSelectedUser(user);
    setSheetOpen(true);
  }

  const userDetail = selectedUser
    ? {
        ...selectedUser,
        avatar_image_url: null,
        current_period_end: shiftDemoTime({ days: -30 }),
        payments: [
          { id: "p1", amount: 99_000, status: "PAID", provider: "midtrans", created_at: shiftDemoTime({ days: 5 }) },
          { id: "p2", amount: 49_000, status: "PAID", provider: "doku", created_at: shiftDemoTime({ days: 35 }) },
        ],
      }
    : null;

  return (
    <div className="flex flex-col gap-8">
      <CommandPalette />

      {/* Header */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Component Showcase</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div>
        <h1 className="text-2xl font-bold">Component Showcase</h1>
        <p className="text-muted-foreground text-sm mt-1">
          24 komponen dashboard & admin dengan data mock. Tekan{" "}
          <kbd className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono">⌘K</kbd>{" "}
          untuk Command Palette.
        </p>
      </div>

      <Separator />

      {/* ─── SHARED UTILITIES ─── */}
      <div>
        <h2 className="text-xl font-bold mb-6">Shared Utilities</h2>
        <div className="flex flex-col gap-8">

          <ShowcaseSection
            id="stats-grid"
            title="StatsGrid"
            description="Reusable stats card grid with loading state and optional icons/descriptions."
          >
            <div className="space-y-4">
              <StatsGrid
                items={[
                  { label: "Total Users", value: "203" },
                  { label: "Revenue", value: "Rp 12.5jt" },
                  { label: "Active Subs", value: "78" },
                  { label: "AI Tokens", value: "1.2M" },
                ]}
              />
              <p className="text-xs text-muted-foreground">Loading state:</p>
              <StatsGrid items={[]} loading columns={4} />
            </div>
          </ShowcaseSection>

          <ShowcaseSection
            id="empty-state"
            title="EmptyState"
            description="Zero-state placeholder with icon, text, and optional CTA."
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border rounded-lg">
                <EmptyState
                  icon={<InboxIcon className="h-6 w-6" />}
                  title="Belum ada data"
                  description="Data akan muncul di sini setelah kamu mulai menggunakan fitur ini."
                  actionLabel="Mulai Sekarang"
                  actionHref="/dashboard"
                />
              </div>
              <div className="border rounded-lg">
                <EmptyState
                  icon={<PackageIcon className="h-6 w-6" />}
                  title="Tidak ada produk"
                  description="Tambahkan produk pertamamu."
                />
              </div>
            </div>
          </ShowcaseSection>

          <ShowcaseSection
            id="payment-status-badge"
            title="PaymentStatusBadge"
            description="Centralized status→variant mapping with optional Indonesian labels."
          >
            <div className="flex flex-wrap gap-2">
              {["PAID", "SUCCESS", "ACTIVE", "PENDING", "CANCELED", "FAILED", "EXPIRED", "UNPAID"].map(
                (s) => (
                  <div key={s} className="flex flex-col items-center gap-1">
                    <PaymentStatusBadge status={s} />
                    <PaymentStatusBadge status={s} showLabel />
                  </div>
                )
              )}
            </div>
          </ShowcaseSection>

          <ShowcaseSection
            id="date-range-picker"
            title="DateRangePicker"
            description="Indonesian-locale date range picker using date-fns."
          >
            <DateRangePicker value={dateRange} onChange={setDateRange} />
          </ShowcaseSection>

          <ShowcaseSection
            id="data-table-toolbar"
            title="DataTableToolbar"
            description="Search + filter bar pattern for tables."
          >
            <DataTableToolbar
              searchValue={toolbarSearch}
              onSearchChange={setToolbarSearch}
              searchPlaceholder="Cari pengguna..."
              filters={[
                {
                  value: "ALL",
                  onChange: () => {},
                  placeholder: "Status",
                  options: [
                    { label: "Semua", value: "ALL" },
                    { label: "Aktif", value: "ACTIVE" },
                    { label: "Inactive", value: "INACTIVE" },
                  ],
                },
              ]}
            >
              <ExportButton onExport={() => {}} />
            </DataTableToolbar>
          </ShowcaseSection>
        </div>
      </div>

      <Separator />

      {/* ─── DASHBOARD COMPONENTS ─── */}
      <div>
        <h2 className="text-xl font-bold mb-6">Dashboard Components</h2>
        <div className="flex flex-col gap-8">

          <ShowcaseSection
            id="usage-chart"
            title="UsageChart"
            description="Area chart for AI token usage over time."
          >
            <UsageChart data={mockUsageData} />
          </ShowcaseSection>

          <ShowcaseSection
            id="usage-meter"
            title="UsageMeter"
            description="Plan-aware usage progress bar with color-coded warnings."
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <UsageMeter used={0} plan="FREE" />
              <UsageMeter used={7500} plan="BASIC" />
              <UsageMeter used={92000} plan="PRO" />
              <UsageMeter used={450000} plan="ULTIMATE" />
            </div>
          </ShowcaseSection>

          <ShowcaseSection
            id="activity-feed"
            title="ActivityFeed"
            description="Timeline of user events with relative timestamps."
          >
            <div className="max-w-md">
              <ActivityFeed
                activities={mockActivities}
                referenceTime={DASHBOARD_DEMO_REFERENCE_TIME}
              />
            </div>
          </ShowcaseSection>

          <ShowcaseSection
            id="quick-actions"
            title="QuickActions"
            description="4-card shortcut grid for common actions."
          >
            <QuickActions />
          </ShowcaseSection>

          <ShowcaseSection
            id="plan-comparison-modal"
            title="PlanComparisonModal"
            description="Dialog comparing all plan tiers. Click the button to open."
          >
            <PlanComparisonModal currentPlan="PRO" />
          </ShowcaseSection>

          <ShowcaseSection
            id="profile-avatar"
            title="ProfileAvatar"
            description="Editable avatar with upload button. Three sizes: sm, md, lg."
          >
            <div className="flex items-end gap-6">
              <ProfileAvatar fallback="GA" size="sm" />
              <ProfileAvatar fallback="GA" size="md" />
              <ProfileAvatar
                fallback="GA"
                size="lg"
                editable
                onUpload={async () => {
                  await new Promise((r) => setTimeout(r, 1000));
                }}
              />
            </div>
          </ShowcaseSection>

          <ShowcaseSection
            id="notification-dropdown"
            title="NotificationDropdown"
            description="Bell icon popover with unread count and mark-all-read."
          >
            <div className="flex items-center gap-4">
              <NotificationDropdown
                notifications={notifications}
                onMarkAllRead={handleMarkAllRead}
                onMarkRead={handleMarkRead}
                referenceTime={DASHBOARD_DEMO_REFERENCE_TIME}
              />
              <span className="text-xs text-muted-foreground">
                ← Klik bell icon
              </span>
            </div>
          </ShowcaseSection>

          <ShowcaseSection
            id="onboarding-checklist"
            title="OnboardingChecklist"
            description="Dismissible checklist with progress bar. Auto-hides when all done."
          >
            <div className="max-w-md">
              <OnboardingChecklist steps={mockOnboardingSteps} onDismiss={() => {}} />
            </div>
          </ShowcaseSection>
        </div>
      </div>

      <Separator />

      {/* ─── ADMIN COMPONENTS ─── */}
      <div>
        <h2 className="text-xl font-bold mb-6">Admin Components</h2>
        <div className="flex flex-col gap-8">

          <ShowcaseSection
            id="admin-stats-cards"
            title="AdminStatsCards"
            description="4-column stats with trend arrows (% change vs previous month)."
          >
            <AdminStatsCards
              stats={[
                { label: "Total Revenue", value: "Rp 12.5jt", change: 12.5 },
                { label: "Active Subs", value: "78", change: 8.3 },
                { label: "Paid Plans", value: "53", change: -2.1 },
                { label: "Free Plans", value: "150", change: 15.0 },
              ]}
            />
          </ShowcaseSection>

          <ShowcaseSection
            id="user-table"
            title="UserTable"
            description="Paginated, searchable, filterable user table with export."
          >
            <UserTable users={mockUsers} onViewUser={handleViewUser} />
            <UserDetailSheet
              user={userDetail}
              open={sheetOpen}
              onOpenChange={setSheetOpen}
            />
          </ShowcaseSection>

          <ShowcaseSection
            id="subscription-pie-chart"
            title="SubscriptionPieChart"
            description="Donut chart showing plan distribution."
          >
            <div className="max-w-md">
              <SubscriptionPieChart data={mockPieData} />
            </div>
          </ShowcaseSection>

          <ShowcaseSection
            id="revenue-line-chart"
            title="RevenueLineChart"
            description="Current vs previous month revenue comparison."
          >
            <RevenueLineChart data={mockRevenueComparison} />
          </ShowcaseSection>

          <ShowcaseSection
            id="admin-sidebar"
            title="AdminSidebar"
            description="Collapsible sidebar nav. Click the chevron to toggle."
          >
            <div className="h-[400px] border rounded-lg overflow-hidden">
              <AdminSidebar />
            </div>
          </ShowcaseSection>

          <ShowcaseSection
            id="audit-log"
            title="AuditLog"
            description="Searchable event timeline with type badges."
          >
            <AuditLog
              entries={mockAuditEntries}
              referenceTime={DASHBOARD_DEMO_REFERENCE_TIME}
            />
          </ShowcaseSection>

          <ShowcaseSection
            id="waitlist-table"
            title="WaitlistTable"
            description="Searchable waitlist with approve/remove actions and export."
          >
            <WaitlistTable
              entries={mockWaitlist}
              onApprove={() => {}}
              onRemove={() => {}}
            />
          </ShowcaseSection>
        </div>
      </div>
    </div>
  );
}
