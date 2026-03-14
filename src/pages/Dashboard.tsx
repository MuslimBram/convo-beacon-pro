import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockStats, mockChartData, mockLeads, mockLeadsByChannel } from "@/lib/mock-data";
import { ArrowUpRight, ArrowDownRight, TrendingUp, Users, Zap, Radio } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          AI-powered lead discovery overview
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {mockStats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{stat.label}</span>
                {stat.change > 0 ? (
                  <ArrowUpRight className="h-4 w-4 text-success" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-destructive" />
                )}
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-display text-3xl font-bold">
                  {stat.label === "Conversion Rate" ? `${stat.value}%` : stat.value}
                </span>
                <span
                  className={`text-xs font-medium ${
                    stat.change > 0 ? "text-success" : "text-destructive"
                  }`}
                >
                  {stat.change > 0 ? "+" : ""}
                  {stat.change}%
                </span>
              </div>
              <span className="text-xs text-muted-foreground">{stat.period}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Leads This Week</CardTitle>
            <CardDescription>Total vs qualified leads per day</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="day" className="text-xs" tick={{ fill: "hsl(220 10% 46%)" }} />
                <YAxis className="text-xs" tick={{ fill: "hsl(220 10% 46%)" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0 0% 100%)",
                    border: "1px solid hsl(220 13% 91%)",
                    borderRadius: "0.5rem",
                    fontSize: "0.75rem",
                  }}
                />
                <Bar dataKey="leads" fill="hsl(243 75% 59%)" radius={[4, 4, 0, 0]} name="Total" />
                <Bar dataKey="qualified" fill="hsl(172 66% 50%)" radius={[4, 4, 0, 0]} name="Qualified" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">By Channel</CardTitle>
            <CardDescription>Lead distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={mockLeadsByChannel}
                  dataKey="leads"
                  nameKey="channel"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  strokeWidth={2}
                  stroke="hsl(0 0% 100%)"
                >
                  {mockLeadsByChannel.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 grid grid-cols-2 gap-1">
              {mockLeadsByChannel.map((item) => (
                <div key={item.channel} className="flex items-center gap-1.5 text-xs">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.fill }} />
                  <span className="text-muted-foreground">{item.channel}</span>
                  <span className="ml-auto font-medium">{item.leads}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent leads */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Leads</CardTitle>
          <CardDescription>Latest AI-detected opportunities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockLeads.slice(0, 5).map((lead) => (
              <div
                key={lead.id}
                className="flex items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 font-display text-sm font-bold text-primary">
                  {lead.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{lead.name}</span>
                    <Badge
                      variant={lead.confidence >= 90 ? "default" : "secondary"}
                      className="text-[10px] px-1.5 py-0"
                    >
                      {lead.confidence}%
                    </Badge>
                    <StatusBadge status={lead.status} />
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground truncate">{lead.message}</p>
                  <div className="mt-1 flex items-center gap-2 text-[10px] text-muted-foreground">
                    <span>{lead.source}</span>
                    <span>•</span>
                    <span>{lead.intent}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    new: "bg-primary/10 text-primary",
    contacted: "bg-warning/10 text-warning",
    qualified: "bg-success/10 text-success",
    converted: "bg-accent/10 text-accent",
    dismissed: "bg-muted text-muted-foreground",
  };
  return (
    <span className={`rounded-full px-1.5 py-0 text-[10px] font-medium ${styles[status] || styles.new}`}>
      {status}
    </span>
  );
}
