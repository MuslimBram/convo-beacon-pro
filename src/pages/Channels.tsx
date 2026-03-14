import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { mockChannels } from "@/lib/mock-data";
import {
  MessageSquare,
  Send,
  Mail,
  Globe,
  Facebook,
  Instagram,
  CheckCircle2,
  Circle,
} from "lucide-react";

const channelIcons: Record<string, React.ElementType> = {
  telegram: Send,
  whatsapp: MessageSquare,
  email: Mail,
  website: Globe,
  facebook: Facebook,
  instagram: Instagram,
};

const channelColors: Record<string, string> = {
  telegram: "bg-primary/10 text-primary",
  whatsapp: "bg-success/10 text-success",
  email: "bg-warning/10 text-warning",
  website: "bg-accent/10 text-accent",
  facebook: "bg-primary/10 text-primary",
  instagram: "bg-destructive/10 text-destructive",
};

export default function Channels() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">Channels</h1>
          <p className="text-sm text-muted-foreground">Manage your communication channels</p>
        </div>
        <Button>
          <MessageSquare className="mr-2 h-4 w-4" />
          Add Channel
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockChannels.map((channel) => {
          const Icon = channelIcons[channel.type] || MessageSquare;
          return (
            <Card key={channel.id} className={!channel.connected ? "opacity-60" : ""}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${channelColors[channel.type]}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">{channel.name}</h3>
                      <p className="text-xs capitalize text-muted-foreground">{channel.type}</p>
                    </div>
                  </div>
                  <Switch checked={channel.connected} />
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {channel.connected ? (
                      <CheckCircle2 className="h-3 w-3 text-success" />
                    ) : (
                      <Circle className="h-3 w-3 text-muted-foreground" />
                    )}
                    <span className="text-xs text-muted-foreground">
                      {channel.connected ? "Connected" : "Disconnected"}
                    </span>
                  </div>
                  {channel.connected && (
                    <span className="text-xs text-muted-foreground">
                      {channel.messagesCount.toLocaleString()} messages
                    </span>
                  )}
                </div>

                {channel.connected && channel.lastActivity && (
                  <p className="mt-2 text-[10px] text-muted-foreground">
                    Last activity: {channel.lastActivity}
                  </p>
                )}

                {!channel.connected && (
                  <Button variant="outline" size="sm" className="mt-3 w-full text-xs">
                    Connect
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
