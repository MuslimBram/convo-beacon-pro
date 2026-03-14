export interface Lead {
  id: string;
  name: string;
  source: string;
  channel: string;
  message: string;
  confidence: number;
  status: "new" | "contacted" | "qualified" | "converted" | "dismissed";
  detectedAt: string;
  intent: string;
}

export interface Channel {
  id: string;
  type: "telegram" | "whatsapp" | "email" | "website" | "facebook" | "instagram";
  name: string;
  connected: boolean;
  lastActivity?: string;
  messagesCount: number;
}

export interface MonitoredSource {
  id: string;
  type: "telegram_group" | "telegram_channel" | "forum" | "social";
  name: string;
  url: string;
  active: boolean;
  leadsFound: number;
  lastScanned?: string;
}

export interface AnalyticsStat {
  label: string;
  value: number;
  change: number;
  period: string;
}

export const mockLeads: Lead[] = [
  { id: "l1", name: "Alex Petrov", source: "Telegram: Web Dev Jobs", channel: "telegram", message: "Looking for a reliable team to build a SaaS dashboard. Budget around $15k. Need React expertise.", confidence: 92, status: "new", detectedAt: "2026-03-14T09:23:00Z", intent: "Software Development" },
  { id: "l2", name: "Maria Chen", source: "Facebook: Small Biz Owners", channel: "facebook", message: "Can anyone recommend a good marketing agency? We need help with social media and PPC campaigns.", confidence: 87, status: "contacted", detectedAt: "2026-03-14T08:15:00Z", intent: "Marketing Services" },
  { id: "l3", name: "James Wilson", source: "Instagram DM", channel: "instagram", message: "Hey, do you guys offer logo design packages? I'm rebranding my restaurant chain.", confidence: 78, status: "new", detectedAt: "2026-03-13T22:45:00Z", intent: "Design Services" },
  { id: "l4", name: "Olga Ivanova", source: "Telegram: Startup Founders", channel: "telegram", message: "Urgent: need a mobile app developer for iOS and Android. Project starts next week.", confidence: 95, status: "qualified", detectedAt: "2026-03-13T18:30:00Z", intent: "Mobile Development" },
  { id: "l5", name: "David Kim", source: "WhatsApp Business", channel: "whatsapp", message: "We're expanding our e-commerce store and need integration with payment gateways.", confidence: 81, status: "new", detectedAt: "2026-03-13T16:12:00Z", intent: "E-commerce Development" },
  { id: "l6", name: "Sarah Johnson", source: "Email Inquiry", channel: "email", message: "Interested in your consulting services for digital transformation.", confidence: 73, status: "converted", detectedAt: "2026-03-12T14:00:00Z", intent: "Consulting" },
  { id: "l7", name: "Tom Baker", source: "Website Chat", channel: "website", message: "Do you provide SEO audits? Our traffic dropped significantly last month.", confidence: 85, status: "contacted", detectedAt: "2026-03-12T11:20:00Z", intent: "SEO Services" },
  { id: "l8", name: "Priya Sharma", source: "Telegram: Freelancers Hub", channel: "telegram", message: "Looking for a full-stack developer for a 3-month contract. Remote work, competitive pay.", confidence: 90, status: "dismissed", detectedAt: "2026-03-11T09:00:00Z", intent: "Recruitment" },
];

export const mockChannels: Channel[] = [
  { id: "c1", type: "telegram", name: "Telegram Bot", connected: true, lastActivity: "2 min ago", messagesCount: 1243 },
  { id: "c2", type: "whatsapp", name: "WhatsApp Business", connected: true, lastActivity: "15 min ago", messagesCount: 876 },
  { id: "c3", type: "email", name: "support@company.com", connected: true, lastActivity: "1 hr ago", messagesCount: 2341 },
  { id: "c4", type: "website", name: "Live Chat Widget", connected: true, lastActivity: "5 min ago", messagesCount: 567 },
  { id: "c5", type: "facebook", name: "Facebook Page", connected: false, messagesCount: 0 },
  { id: "c6", type: "instagram", name: "Instagram Business", connected: false, messagesCount: 0 },
];

export const mockSources: MonitoredSource[] = [
  { id: "s1", type: "telegram_group", name: "Web Dev Jobs & Projects", url: "https://t.me/webdevjobs", active: true, leadsFound: 47, lastScanned: "2 min ago" },
  { id: "s2", type: "telegram_group", name: "Startup Founders Network", url: "https://t.me/startupfounders", active: true, leadsFound: 32, lastScanned: "5 min ago" },
  { id: "s3", type: "telegram_channel", name: "Freelancers Hub", url: "https://t.me/freelancershub", active: true, leadsFound: 21, lastScanned: "8 min ago" },
  { id: "s4", type: "telegram_group", name: "Small Business Owners", url: "https://t.me/smallbizowners", active: false, leadsFound: 15, lastScanned: "2 days ago" },
  { id: "s5", type: "forum", name: "Reddit: r/forhire", url: "https://reddit.com/r/forhire", active: true, leadsFound: 58, lastScanned: "12 min ago" },
];

export const mockStats: AnalyticsStat[] = [
  { label: "Total Leads", value: 284, change: 12.5, period: "vs last week" },
  { label: "Qualified Leads", value: 67, change: 8.3, period: "vs last week" },
  { label: "Conversion Rate", value: 23.7, change: -2.1, period: "vs last week" },
  { label: "Active Sources", value: 12, change: 3, period: "vs last week" },
];

export const mockChartData = [
  { day: "Mon", leads: 12, qualified: 4 },
  { day: "Tue", leads: 19, qualified: 7 },
  { day: "Wed", leads: 15, qualified: 5 },
  { day: "Thu", leads: 28, qualified: 11 },
  { day: "Fri", leads: 22, qualified: 9 },
  { day: "Sat", leads: 8, qualified: 3 },
  { day: "Sun", leads: 5, qualified: 2 },
];

export const mockLeadsByChannel = [
  { channel: "Telegram", leads: 112, fill: "hsl(243 75% 59%)" },
  { channel: "Email", leads: 65, fill: "hsl(172 66% 50%)" },
  { channel: "WhatsApp", leads: 48, fill: "hsl(152 60% 42%)" },
  { channel: "Website", leads: 32, fill: "hsl(38 92% 50%)" },
  { channel: "Facebook", leads: 18, fill: "hsl(0 72% 51%)" },
  { channel: "Instagram", leads: 9, fill: "hsl(280 60% 55%)" },
];
