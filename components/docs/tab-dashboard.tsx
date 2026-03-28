"use client";

import { useState } from "react";
import { ComponentDemo, DemoSection } from "./component-demo";
import { InboxIcon, PackageIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";

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
import { OnboardingChecklist } from "@/components/dashboard/onboarding-checklist";
import { AdminStatsCards } from "@/components/admin/stats-cards";
import { UserTable, type UserRow } from "@/components/admin/user-table";
import { UserDetailSheet } from "@/components/admin/user-detail-sheet";
import { SubscriptionPieChart } from "@/components/admin/subscription-pie-chart";
import { RevenueLineChart } from "@/components/admin/revenue-line-chart";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AuditLog } from "@/components/admin/audit-log";
import { WaitlistTable } from "@/components/admin/waitlist-table";
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
} = createDashboardDemoData();

// ─── Tab Component ────────────────────────────────────────

export function DashboardTab() {
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
    <div className="space-y-10">
      {/* ─── SHARED UTILITIES ─── */}
      <DemoSection title="StatsGrid" columns={1}>
        <ComponentDemo
          title="Default"
          description="4-column stats grid with icons"
          className="block"
        >
          <StatsGrid
            items={[
              { label: "Total Users", value: "203" },
              { label: "Revenue", value: "Rp 12.5jt" },
              { label: "Active Subs", value: "78" },
              { label: "AI Tokens", value: "1.2M" },
            ]}
          />
        </ComponentDemo>
        <ComponentDemo
          title="Loading"
          description="Skeleton loading state"
          className="block"
        >
          <StatsGrid items={[]} loading columns={4} />
        </ComponentDemo>
      </DemoSection>

      <DemoSection title="EmptyState" columns={1}>
        <ComponentDemo
          title="With action"
          description="Empty state with CTA button"
          className="block"
        >
          <EmptyState
            icon={<InboxIcon className="h-6 w-6" />}
            title="Belum ada data"
            description="Data akan muncul di sini setelah kamu mulai."
            actionLabel="Mulai Sekarang"
            actionHref="/dashboard"
          />
        </ComponentDemo>
        <ComponentDemo
          title="Without action"
          description="Minimal empty state"
          className="block"
        >
          <EmptyState
            icon={<PackageIcon className="h-6 w-6" />}
            title="Tidak ada produk"
          />
        </ComponentDemo>
      </DemoSection>

      <DemoSection title="PaymentStatusBadge" columns={1}>
        <ComponentDemo
          title="Status codes"
          description="All payment status variants"
        >
          {["PAID", "SUCCESS", "ACTIVE", "PENDING", "CANCELED", "FAILED", "EXPIRED"].map(
            (s) => (
              <PaymentStatusBadge key={s} status={s} />
            )
          )}
        </ComponentDemo>
        <ComponentDemo
          title="With labels"
          description="Indonesian translated labels"
        >
          {["PAID", "PENDING", "FAILED", "EXPIRED"].map((s) => (
            <PaymentStatusBadge key={s} status={s} showLabel />
          ))}
        </ComponentDemo>
      </DemoSection>

      <DemoSection title="DateRangePicker" columns={1}>
        <ComponentDemo
          title="Interactive"
          description="Indonesian-locale calendar range picker"
        >
          <DateRangePicker value={dateRange} onChange={setDateRange} />
        </ComponentDemo>
      </DemoSection>

      <DemoSection title="DataTableToolbar + ExportButton" columns={1}>
        <ComponentDemo
          title="Combined"
          description="Search bar with filter dropdown and export"
          className="block"
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
                ],
              },
            ]}
          >
            <ExportButton onExport={() => {}} />
          </DataTableToolbar>
        </ComponentDemo>
      </DemoSection>

      {/* ─── DASHBOARD COMPONENTS ─── */}
      <DemoSection title="UsageChart" columns={1}>
        <ComponentDemo
          title="Area chart"
          description="AI token usage over 14 days"
          className="block"
        >
          <UsageChart data={mockUsageData} />
        </ComponentDemo>
      </DemoSection>

      <DemoSection title="UsageMeter" columns={1}>
        <ComponentDemo
          title="Plan states"
          description="Free, Basic (75%), Pro (92%), Ultimate (unlimited)"
          className="block"
        >
          <div className="grid grid-cols-2 gap-3 w-full">
            <UsageMeter used={0} plan="FREE" />
            <UsageMeter used={7500} plan="BASIC" />
            <UsageMeter used={92000} plan="PRO" />
            <UsageMeter used={450000} plan="ULTIMATE" />
          </div>
        </ComponentDemo>
      </DemoSection>

      <DemoSection title="ActivityFeed" columns={1}>
        <ComponentDemo
          title="Recent events"
          description="Timeline with typed icons and relative time"
          className="block"
        >
          <ActivityFeed
            activities={mockActivities}
            referenceTime={DASHBOARD_DEMO_REFERENCE_TIME}
          />
        </ComponentDemo>
      </DemoSection>

      <DemoSection title="QuickActions" columns={1}>
        <ComponentDemo
          title="Action cards"
          description="Shortcut grid for common dashboard actions"
          className="block"
        >
          <QuickActions />
        </ComponentDemo>
      </DemoSection>

      <DemoSection title="PlanComparisonModal" columns={1}>
        <ComponentDemo
          title="Plan comparison"
          description="Click to open the comparison dialog"
        >
          <PlanComparisonModal currentPlan="PRO" />
        </ComponentDemo>
      </DemoSection>

      <DemoSection title="ProfileAvatar" columns={1}>
        <ComponentDemo
          title="Sizes"
          description="sm, md, lg — the lg variant supports upload"
        >
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
        </ComponentDemo>
      </DemoSection>

      <DemoSection title="NotificationDropdown" columns={1}>
        <ComponentDemo
          title="Bell icon"
          description="Click to see notification popover"
        >
          <NotificationDropdown
            notifications={notifications}
            onMarkAllRead={handleMarkAllRead}
            onMarkRead={handleMarkRead}
            referenceTime={DASHBOARD_DEMO_REFERENCE_TIME}
          />
        </ComponentDemo>
      </DemoSection>

      <DemoSection title="OnboardingChecklist" columns={1}>
        <ComponentDemo
          title="Checklist"
          description="Dismissible checklist with progress tracking"
          className="block"
        >
          <div className="max-w-md mx-auto">
            <OnboardingChecklist steps={mockOnboardingSteps} onDismiss={() => {}} />
          </div>
        </ComponentDemo>
      </DemoSection>

      {/* ─── ADMIN COMPONENTS ─── */}
      <DemoSection title="AdminStatsCards" columns={1}>
        <ComponentDemo
          title="With trends"
          description="Stats with percentage change arrows"
          className="block"
        >
          <AdminStatsCards
            stats={[
              { label: "Total Revenue", value: "Rp 12.5jt", change: 12.5 },
              { label: "Active Subs", value: "78", change: 8.3 },
              { label: "Paid Plans", value: "53", change: -2.1 },
              { label: "Free Plans", value: "150", change: 15.0 },
            ]}
          />
        </ComponentDemo>
      </DemoSection>

      <DemoSection title="UserTable + UserDetailSheet" columns={1}>
        <ComponentDemo
          title="Interactive table"
          description="Searchable, filterable with export — click eye icon to open detail sheet"
          className="block"
        >
          <UserTable users={mockUsers} onViewUser={handleViewUser} />
          <UserDetailSheet
            user={userDetail}
            open={sheetOpen}
            onOpenChange={setSheetOpen}
          />
        </ComponentDemo>
      </DemoSection>

      <DemoSection title="SubscriptionPieChart" columns={1}>
        <ComponentDemo
          title="Plan distribution"
          description="Donut chart showing user plan breakdown"
          className="block"
        >
          <div className="max-w-sm mx-auto">
            <SubscriptionPieChart data={mockPieData} />
          </div>
        </ComponentDemo>
      </DemoSection>

      <DemoSection title="RevenueLineChart" columns={1}>
        <ComponentDemo
          title="Revenue comparison"
          description="Current vs previous month line chart"
          className="block"
        >
          <RevenueLineChart data={mockRevenueComparison} />
        </ComponentDemo>
      </DemoSection>

      <DemoSection title="AdminSidebar" columns={1}>
        <ComponentDemo
          title="Collapsible"
          description="Click chevron to toggle collapse"
          className="block p-0 overflow-hidden"
        >
          <div className="h-[350px]">
            <AdminSidebar />
          </div>
        </ComponentDemo>
      </DemoSection>

      <DemoSection title="AuditLog" columns={1}>
        <ComponentDemo
          title="Event timeline"
          description="Searchable audit log with typed event badges"
          className="block"
        >
          <AuditLog
            entries={mockAuditEntries}
            referenceTime={DASHBOARD_DEMO_REFERENCE_TIME}
          />
        </ComponentDemo>
      </DemoSection>

      <DemoSection title="WaitlistTable" columns={1}>
        <ComponentDemo
          title="Waitlist management"
          description="Searchable with approve/remove actions and export"
          className="block"
        >
          <WaitlistTable
            entries={mockWaitlist}
            onApprove={() => {}}
            onRemove={() => {}}
          />
        </ComponentDemo>
      </DemoSection>
    </div>
  );
}
