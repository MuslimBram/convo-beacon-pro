import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your business profile and preferences</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="ai">AI Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Business Profile</CardTitle>
              <CardDescription>Your public business information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Business Name</Label>
                  <Input defaultValue="Acme Business" />
                </div>
                <div className="space-y-2">
                  <Label>Industry</Label>
                  <Input defaultValue="Software Development" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input defaultValue="contact@acmebiz.com" type="email" />
                </div>
                <div className="space-y-2">
                  <Label>Website</Label>
                  <Input defaultValue="https://acmebiz.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Input defaultValue="Full-service software development agency specializing in web and mobile apps." />
              </div>
              <div className="space-y-2">
                <Label>Services (comma-separated)</Label>
                <Input defaultValue="Web Development, Mobile Apps, UI/UX Design, Consulting" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "New lead detected", desc: "Get notified when AI finds a new potential lead", default: true },
                { label: "High confidence alerts", desc: "Instant alerts for leads with 90%+ confidence", default: true },
                { label: "Daily digest", desc: "Receive a daily summary of all discovered leads", default: false },
                { label: "Channel status changes", desc: "Get notified when a channel connects or disconnects", default: true },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch defaultChecked={item.default} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">AI Configuration</CardTitle>
              <CardDescription>Customize how AI detects and classifies leads</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Minimum Confidence Threshold</Label>
                <Input type="number" defaultValue="70" min="0" max="100" />
                <p className="text-xs text-muted-foreground">Leads below this score won't appear in your dashboard</p>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Target Keywords</Label>
                <Input defaultValue="looking for, need help with, searching for, recommend, hire" />
                <p className="text-xs text-muted-foreground">Comma-separated keywords that signal customer intent</p>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Auto-generate reply suggestions</p>
                  <p className="text-xs text-muted-foreground">AI will create response drafts for each new lead</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Button>Save AI Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
