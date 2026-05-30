import { createSlice } from "@reduxjs/toolkit";

export type BadgeVariant =
  | "warning"
  | "destructive"
  | "pending"
  | "success"
  | "default"
  | "secondary"
  | "outline";

export type SignalTheme = "red" | "orange" | "green" | "blue";
export type SignalIconKey = "speaker" | "shield" | "code" | "scale" | "check";

export interface SignalCardData {
  id: string;
  title: string;
  theme: SignalTheme;
  iconKey: SignalIconKey;
  tags: string[];
  noResponseText?: string;
  waitingOnText?: string;
  createdTime: string;
  lastActivityTime: string;
  badges: {
    text: string;
    variant: BadgeVariant;
  }[];
  statusBadge?: {
    text: string;
    variant: BadgeVariant;
  };
}

export interface SignalSectionData {
  id: "blocked" | "slowing" | "stable";
  title: string;
  subtitle: string;
  iconLabel: string;
  accent: "red" | "orange" | "emerald";
  count: number;
  items: SignalCardData[];
}

export interface JasoDashboardState {
  header: {
    greetingName: string;
    dateLabel: string;
    ctaLabel: string;
    healthLabel: string;
  };
  operationalHealth: {
    smoothPercent: number;
    smoothRecords: number;
    interventionPercent: number;
    interventionRecords: number;
    totalRecords: number;
  };
  summaries: {
    smooth: string;
    intervention: string;
  };
  signalSections: SignalSectionData[];
  executionSnapshot: {
    activeView: "Today" | "This Week";
    views: {
      Today: {
        blocked: number;
        slowingDown: number;
        missingOwner: number;
        stable: number;
        avgResponseTime: string;
      };
      "This Week": {
        blocked: number;
        slowingDown: number;
        missingOwner: number;
        stable: number;
        avgResponseTime: string;
      };
    };
  };
  topRisks: {
    title: string;
    sub: string;
  }[];
  trendData: {
    day: string;
    count: number;
  }[];
}

export const initialJasoDashboardState: JasoDashboardState = {
  header: {
    greetingName: "Navatej",
    dateLabel: "Tue, 19 Nov 2024, 10:13 AM",
    ctaLabel: "Manage your team today",
    healthLabel: "Operational Health Score",
  },
  operationalHealth: {
    smoothPercent: 64,
    smoothRecords: 32,
    interventionPercent: 36,
    interventionRecords: 18,
    totalRecords: 50,
  },
  summaries: {
    smooth:
      "Workstreams are advancing effectively across recruitment, fundraising, internal collaboration, and routine administrative tasks.",
    intervention:
      "Immediate engagement is crucial to address security vulnerabilities, unblock technical setups, resolve recruitment bottlenecks, and refine outreach strategies.",
  },
  signalSections: [
    {
      id: "blocked",
      title: "BLOCKED",
      subtitle: "Requires immediate action",
      iconLabel: "⚠️",
      accent: "red",
      count: 5,
      items: [
        {
          id: "blocked-1",
          title: "Exposed AWS credentials",
          theme: "red",
          iconKey: "speaker",
          tags: ["Security", "Infrastructure"],
          noResponseText:
            "Revoke/rotate the exposed AWS Access Key ID and Secret Access Key.",
          waitingOnText: "Anthropic Key details email",
          createdTime: "15m ago",
          lastActivityTime: "6h ago",
          badges: [{ text: "High impact", variant: "destructive" }],
          statusBadge: { text: "At Risk", variant: "destructive" },
        },
        {
          id: "blocked-2",
          title: "GitHub account verification / removal",
          theme: "red",
          iconKey: "shield",
          tags: ["GitHub", "Verification"],
          noResponseText:
            "Verify whether removing infra@novacommunicate.com was authorized.",
          waitingOnText: "Approve GitHub alias verification request",
          createdTime: "1h ago",
          lastActivityTime: "5h ago",
          badges: [{ text: "High priority", variant: "destructive" }],
          statusBadge: { text: "At Risk", variant: "destructive" },
        },
        {
          id: "blocked-3",
          title: "Claude access / setup failure",
          theme: "red",
          iconKey: "code",
          tags: ["Claude", "Setup"],
          noResponseText: "Resolve Sathvika's Claude access issue.",
          waitingOnText: "Reported error while setting up Claude",
          createdTime: "2h ago",
          lastActivityTime: "4h ago",
          badges: [{ text: "Blocking", variant: "destructive" }],
          statusBadge: { text: "Blocked", variant: "destructive" },
        },
        {
          id: "blocked-4",
          title: "Missing presentation template",
          theme: "red",
          iconKey: "scale",
          tags: ["Presentation", "Ops"],
          noResponseText:
            "Provide the PowerPoint template requested for Claude.",
          waitingOnText: "Template pending",
          createdTime: "2h ago",
          lastActivityTime: "3h ago",
          badges: [{ text: "Urgent", variant: "warning" }],
          statusBadge: { text: "Pending", variant: "pending" },
        },
        {
          id: "blocked-5",
          title: "Google Cloud account verification deadline",
          theme: "red",
          iconKey: "check",
          tags: ["Google Cloud", "Deadline"],
          noResponseText: "Complete verification before July 13, 2026.",
          waitingOnText: "Deadline approaching",
          createdTime: "3h ago",
          lastActivityTime: "3h ago",
          badges: [{ text: "Deadline", variant: "warning" }],
          statusBadge: { text: "Pending", variant: "pending" },
        },
      ],
    },
    {
      id: "slowing",
      title: "SLOWING DOWN",
      subtitle: "Monitor and act soon",
      iconLabel: "🛡️",
      accent: "orange",
      count: 9,
      items: [
        {
          id: "slowing-1",
          title: "Pending credit account setups",
          theme: "orange",
          iconKey: "shield",
          tags: ["GCP", "Azure", "Claude", "Figma"],
          noResponseText: "Account setup / confirmation still needs action.",
          waitingOnText: "Pending credit account setup",
          createdTime: "15m ago",
          lastActivityTime: "3h ago",
          badges: [{ text: "Medium impact", variant: "warning" }],
          statusBadge: { text: "Pending", variant: "pending" },
        },
        {
          id: "slowing-2",
          title: "Recruitment follow-up needed",
          theme: "orange",
          iconKey: "code",
          tags: ["Recruitment", "Frontend Engineer"],
          noResponseText: "Follow up with Varshitha Bugga.",
          waitingOnText: "Confirm screening call invitation and availability",
          createdTime: "25m ago",
          lastActivityTime: "2h ago",
          badges: [{ text: "Medium impact", variant: "warning" }],
          statusBadge: { text: "Pending", variant: "pending" },
        },
        {
          id: "slowing-3",
          title: "Availability mismatch",
          theme: "orange",
          iconKey: "speaker",
          tags: ["Role fit", "AIRA"],
          noResponseText:
            'Check the "Building Seamless Interfaces @ AIRA" candidate alignment.',
          waitingOnText: "Full-time onsite only from December onward",
          createdTime: "45m ago",
          lastActivityTime: "2h ago",
          badges: [{ text: "Needs review", variant: "warning" }],
          statusBadge: { text: "Review", variant: "pending" },
        },
        {
          id: "slowing-4",
          title: "Sales outreach not getting traction",
          theme: "orange",
          iconKey: "speaker",
          tags: ["Sales", "Outreach"],
          noResponseText:
            "Review stalled leads with repeated no-response patterns.",
          waitingOnText: "Needs outreach strategy refresh",
          createdTime: "1h ago",
          lastActivityTime: "5h ago",
          badges: [{ text: "Stalled", variant: "warning" }],
          statusBadge: { text: "Pending", variant: "pending" },
        },
        {
          id: "slowing-5",
          title: "Misdirected outreach",
          theme: "orange",
          iconKey: "shield",
          tags: ["Lead targeting", "Sales"],
          noResponseText:
            "Investigate why outreach was sent to the wrong contact instead of the target manager.",
          waitingOnText: "Fix lead targeting",
          createdTime: "1h ago",
          lastActivityTime: "4h ago",
          badges: [{ text: "Targeting issue", variant: "warning" }],
          statusBadge: { text: "Pending", variant: "pending" },
        },
        {
          id: "slowing-6",
          title: "Unanswered sales pitch",
          theme: "orange",
          iconKey: "code",
          tags: ["Sales", "Ashwin"],
          noResponseText: "Review Sathvika's outreach to Ashwin.",
          waitingOnText: "Decide on next engagement steps",
          createdTime: "2h ago",
          lastActivityTime: "6h ago",
          badges: [{ text: "No response", variant: "warning" }],
          statusBadge: { text: "Pending", variant: "pending" },
        },
        {
          id: "slowing-7",
          title: "Internal coordination issues",
          theme: "orange",
          iconKey: "speaker",
          tags: ["Internal", "Programs"],
          noResponseText:
            "Address communication delays around live classes and college partnerships.",
          waitingOnText: "Internal coordination bottlenecks",
          createdTime: "2h ago",
          lastActivityTime: "6h ago",
          badges: [{ text: "Coordination", variant: "warning" }],
          statusBadge: { text: "Pending", variant: "pending" },
        },
        {
          id: "slowing-8",
          title: "Guest list ambiguity",
          theme: "orange",
          iconKey: "shield",
          tags: ["Events", "Reception"],
          noResponseText: "Clarify the Nova team visit guest list.",
          waitingOnText: "Avoid reception confusion",
          createdTime: "3h ago",
          lastActivityTime: "6h ago",
          badges: [{ text: "Needs clarity", variant: "warning" }],
          statusBadge: { text: "Pending", variant: "pending" },
        },
        {
          id: "slowing-9",
          title: "GradRight communication challenges",
          theme: "orange",
          iconKey: "scale",
          tags: ["Ops", "B2B Partnerships"],
          noResponseText:
            "Follow up on the internal ops-product and B2B coordination breakdowns.",
          waitingOnText: "Communication breakdown needs follow-up",
          createdTime: "4h ago",
          lastActivityTime: "8h ago",
          badges: [{ text: "Escalated", variant: "warning" }],
          statusBadge: { text: "Pending", variant: "pending" },
        },
      ],
    },
    {
      id: "stable",
      title: "STABLE / FYI",
      subtitle: "No action needed",
      iconLabel: "✔️",
      accent: "emerald",
      count: 6,
      items: [
        {
          id: "stable-1",
          title: "Recruitment progress",
          theme: "green",
          iconKey: "scale",
          tags: [
            "Frontend Engineer",
            "Founder’s Office Intern",
            "Foundational AI Systems",
          ],
          noResponseText: "Multiple applications are progressing well.",
          waitingOnText: "Positive candidate movement",
          createdTime: "15m ago",
          lastActivityTime: "2h ago",
          badges: [],
          statusBadge: { text: "FYI", variant: "success" },
        },
        {
          id: "stable-2",
          title: "Fundraising & outreach",
          theme: "green",
          iconKey: "check",
          tags: ["VC Outreach", "Seed", "Pre-seed"],
          noResponseText: "Seed and pre-seed VC outreach is active.",
          waitingOnText: "Well crafted outreach in motion",
          createdTime: "15m ago",
          lastActivityTime: "2h ago",
          badges: [],
          statusBadge: { text: "Active", variant: "success" },
        },
        {
          id: "stable-3",
          title: "Internal collaboration & project management",
          theme: "green",
          iconKey: "speaker",
          tags: ["Docs", "Meeting Notes", "Sharing"],
          noResponseText:
            "Strategic review and note distribution are running normally.",
          waitingOnText: "Processes functioning as expected",
          createdTime: "30m ago",
          lastActivityTime: "1h ago",
          badges: [],
          statusBadge: { text: "Stable", variant: "success" },
        },
        {
          id: "stable-4",
          title: "Administrative & system health",
          theme: "green",
          iconKey: "shield",
          tags: ["Google", "GitHub", "Security"],
          noResponseText:
            "New account setup and alerts are being handled smoothly.",
          waitingOnText: "Startup reminders received",
          createdTime: "45m ago",
          lastActivityTime: "1h ago",
          badges: [],
          statusBadge: { text: "Healthy", variant: "success" },
        },
        {
          id: "stable-5",
          title: "Product outreach",
          theme: "green",
          iconKey: "code",
          tags: ["Sales", "AIRA"],
          noResponseText: "Outreach campaigns are structured and engaging.",
          waitingOnText: "Campaigns continue to land well",
          createdTime: "1h ago",
          lastActivityTime: "2h ago",
          badges: [],
          statusBadge: { text: "On track", variant: "success" },
        },
        {
          id: "stable-6",
          title: "HR & onboarding",
          theme: "green",
          iconKey: "check",
          tags: ["HR", "Onboarding"],
          noResponseText:
            "The relieving letter for Meghana Pediredla is complete.",
          waitingOnText: "Smooth process completion",
          createdTime: "2h ago",
          lastActivityTime: "2h ago",
          badges: [],
          statusBadge: { text: "Closed", variant: "outline" },
        },
      ],
    },
  ],
  executionSnapshot: {
    activeView: "Today",
    views: {
      Today: {
        blocked: 5,
        slowingDown: 9,
        missingOwner: 4,
        stable: 6,
        avgResponseTime: "4.2h",
      },
      "This Week": {
        blocked: 18,
        slowingDown: 31,
        missingOwner: 9,
        stable: 24,
        avgResponseTime: "3.1h",
      },
    },
  },
  topRisks: [
    {
      title: "Exposed AWS credentials",
      sub: "Immediate rotation and incident review required",
    },
    {
      title: "GitHub account verification / removal",
      sub: "Authorization and alias verification still need approval",
    },
    {
      title: "Claude access / setup failure",
      sub: "Access issue and presentation template are still unresolved",
    },
  ],
  trendData: [
    { day: "Mon", count: 15 },
    { day: "Tue", count: 20 },
    { day: "Wed", count: 12 },
    { day: "Thu", count: 28 },
    { day: "Fri", count: 38 },
    { day: "Sat", count: 25 },
    { day: "Sun", count: 18 },
  ],
};

const jasoDashboardSlice = createSlice({
  name: "jasoDashboard",
  initialState: initialJasoDashboardState,
  reducers: {},
});

export const selectJasoDashboard = (state: {
  jasoDashboard: JasoDashboardState;
}) => state.jasoDashboard;

export default jasoDashboardSlice.reducer;
