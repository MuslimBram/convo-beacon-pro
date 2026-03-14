import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockLeads, type Lead } from "@/lib/mock-data";
import { Search, Filter, MessageSquare, Sparkles } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const statusColors: Record<string, string> = {
  new: "bg-primary/10 text-primary border-primary/20",
  contacted: "bg-warning/10 text-warning border-warning/20",
  qualified: "bg-success/10 text-success border-success/20",
  converted: "bg-accent/10 text-accent border-accent/20",
  dismissed: "bg-muted text-muted-foreground border-border",
};

export default function Leads() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selected, setSelected] = useState<Lead | null>(null);

  const filtered = mockLeads.filter((l) => {
    const matchSearch =
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.message.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || l.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const statuses = ["all", "new", "contacted", "qualified", "converted", "dismissed"];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Leads</h1>
        <p className="text-sm text-muted-foreground">AI-discovered potential customers</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search leads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-1">
          {statuses.map((s) => (
            <Button
              key={s}
              variant={statusFilter === s ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(s)}
              className="capitalize text-xs"
            >
              {s}
            </Button>
          ))}
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lead</TableHead>
                <TableHead>Intent</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Confidence</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((lead) => (
                <TableRow
                  key={lead.id}
                  className="cursor-pointer"
                  onClick={() => setSelected(lead)}
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {lead.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{lead.name}</div>
                        <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                          {lead.message}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">{lead.intent}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{lead.source}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <div className="h-1.5 w-16 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${lead.confidence}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium">{lead.confidence}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium capitalize ${statusColors[lead.status]}`}>
                      {lead.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); setSelected(lead); }}>
                      <MessageSquare className="h-3.5 w-3.5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="sm:max-w-lg">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display">{selected.name}</DialogTitle>
                <DialogDescription>{selected.source} • {selected.intent}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="rounded-lg bg-muted p-3">
                  <p className="text-sm italic">"{selected.message}"</p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Confidence</span>
                    <p className="font-medium">{selected.confidence}%</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Status</span>
                    <p className="font-medium capitalize">{selected.status}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Channel</span>
                    <p className="font-medium capitalize">{selected.channel}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Detected</span>
                    <p className="font-medium">{new Date(selected.detectedAt).toLocaleString()}</p>
                  </div>
                </div>
                <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
                  <div className="flex items-center gap-1.5 text-sm font-medium text-primary mb-2">
                    <Sparkles className="h-3.5 w-3.5" />
                    AI Suggested Reply
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Hi {selected.name.split(" ")[0]}, thanks for reaching out! We specialize in {selected.intent.toLowerCase()} and would love to discuss your project. Would you be available for a quick call this week?
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1">Send Reply</Button>
                  <Button variant="outline" className="flex-1">Dismiss</Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
