import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { mockChartData, mockLeadsByChannel, mockStats } from "@/lib/mock-data";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area,
} from "recharts";

const weeklyData = [
  { week: "W1", leads: 45, converted: 12 },
  { week: "W2", leads: 62, converted: 18 },
  { week: "W3", leads: 58, converted: 15 },
  { week: "W4", leads: 71, converted: 22 },
  { week: "W5", leads: 84, converted: 28 },
  { week: "W6", leads: 79, converted: 25 },
];

const conversionData = [
  { month: "Jan", rate: 18 },
  { month: "Feb", rate: 21 },
  { month: "Mar", rate: 19 },
  { month: "Apr", rate: 24 },
  { month: "May", rate: 27 },
  { month: "Jun", rate: 23.7 },
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Analytics</h1>
        <p className="text-sm text-muted-foreground">Performance metrics and trends</p>
      </div>

      {/* KPI cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {mockStats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-5">
              <span className="text-xs text-muted-foreground">{stat.label}</span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-display text-2xl font-bold">
                  {stat.label === "Conversion Rate" ? `${stat.value}%` : stat.value}
                </span>
                <span className={`flex items-center text-xs ${stat.change > 0 ? "text-success" : "text-destructive"}`}>
                  {stat.change > 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {Math.abs(stat.change)}%
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Weekly Lead Trend</CardTitle>
            <CardDescription>Leads discovered vs converted over 6 weeks</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="week" tick={{ fill: "hsl(220 10% 46%)", fontSize: 12 }} />
                <YAxis tick={{ fill: "hsl(220 10% 46%)", fontSize: 12 }} />
                <Tooltip />
                <Area type="monotone" dataKey="leads" stroke="hsl(243 75% 59%)" fill="hsl(243 75% 59% / 0.15)" name="Leads" />
                <Area type="monotone" dataKey="converted" stroke="hsl(172 66% 50%)" fill="hsl(172 66% 50% / 0.15)" name="Converted" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Conversion Rate</CardTitle>
            <CardDescription>Monthly conversion rate trend</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={conversionData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" tick={{ fill: "hsl(220 10% 46%)", fontSize: 12 }} />
                <YAxis tick={{ fill: "hsl(220 10% 46%)", fontSize: 12 }} unit="%" />
                <Tooltip />
                <Line type="monotone" dataKey="rate" stroke="hsl(243 75% 59%)" strokeWidth={2} dot={{ fill: "hsl(243 75% 59%)" }} name="Rate" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Daily Leads Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="day" tick={{ fill: "hsl(220 10% 46%)", fontSize: 12 }} />
                <YAxis tick={{ fill: "hsl(220 10% 46%)", fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="leads" fill="hsl(243 75% 59%)" radius={[4, 4, 0, 0]} name="Total" />
                <Bar dataKey="qualified" fill="hsl(172 66% 50%)" radius={[4, 4, 0, 0]} name="Qualified" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
