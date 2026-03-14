import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { mockSources } from "@/lib/mock-data";
import { Plus, Search, Radio, ExternalLink, Users } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Monitoring() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">Monitoring</h1>
          <p className="text-sm text-muted-foreground">Track online conversations for lead signals</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Source
        </Button>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
              <Radio className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-display font-bold">
                {mockSources.filter((s) => s.active).length}
              </p>
              <p className="text-xs text-muted-foreground">Active Sources</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-display font-bold">
                {mockSources.reduce((a, s) => a + s.leadsFound, 0)}
              </p>
              <p className="text-xs text-muted-foreground">Total Leads Found</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
              <Search className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-display font-bold">{mockSources.length}</p>
              <p className="text-xs text-muted-foreground">Total Sources</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sources table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Monitored Sources</CardTitle>
          <CardDescription>Telegram groups, channels, and online forums</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Source</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Leads Found</TableHead>
                <TableHead>Last Scanned</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockSources.map((source) => (
                <TableRow key={source.id}>
                  <TableCell>
                    <div className="font-medium text-sm">{source.name}</div>
                    <div className="text-xs text-muted-foreground">{source.url}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs capitalize">
                      {source.type.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{source.leadsFound}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {source.lastScanned}
                  </TableCell>
                  <TableCell>
                    <Switch checked={source.active} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
