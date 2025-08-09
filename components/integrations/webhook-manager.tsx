"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { MoreHorizontal, Play, Trash, Edit, Webhook, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";

// Sample webhooks data
const webhooks = [
  {
    id: "webhook-1",
    name: "Lease Created Notification",
    url: "https://example.com/webhooks/lease-created",
    events: ["lease.created", "lease.updated"],
    active: true,
    lastTriggered: "2025-03-20T14:30:00Z",
    successRate: 100,
  },
  {
    id: "webhook-2",
    name: "Document Processing Complete",
    url: "https://example.com/webhooks/document-processed",
    events: ["document.processed"],
    active: true,
    lastTriggered: "2025-03-19T10:15:00Z",
    successRate: 98,
  },
  {
    id: "webhook-3",
    name: "Payment Received",
    url: "https://example.com/webhooks/payment",
    events: ["payment.received", "payment.failed"],
    active: false,
    lastTriggered: "2025-03-15T09:45:00Z",
    successRate: 75,
  },
];

const availableEvents = [
  { id: "lease.created", name: "Lease Created" },
  { id: "lease.updated", name: "Lease Updated" },
  { id: "lease.deleted", name: "Lease Deleted" },
  { id: "document.uploaded", name: "Document Uploaded" },
  { id: "document.processed", name: "Document Processed" },
  { id: "document.error", name: "Document Processing Error" },
  { id: "payment.received", name: "Payment Received" },
  { id: "payment.failed", name: "Payment Failed" },
  { id: "user.created", name: "User Created" },
  { id: "user.login", name: "User Login" },
];

export function WebhookManager() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [webhookName, setWebhookName] = useState("");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [currentWebhook, setCurrentWebhook] = useState<any>(null);
  
  const resetForm = () => {
    setWebhookName("");
    setWebhookUrl("");
    setSelectedEvents([]);
    setEditMode(false);
    setCurrentWebhook(null);
  };
  
  const handleOpenDialog = (webhook?: any) => {
    if (webhook) {
      setWebhookName(webhook.name);
      setWebhookUrl(webhook.url);
      setSelectedEvents(webhook.events);
      setEditMode(true);
      setCurrentWebhook(webhook);
    } else {
      resetForm();
    }
    setDialogOpen(true);
  };
  
  const handleCloseDialog = () => {
    setDialogOpen(false);
    resetForm();
  };
  
  const handleEventChange = (eventId: string, checked: boolean) => {
    if (checked) {
      setSelectedEvents([...selectedEvents, eventId]);
    } else {
      setSelectedEvents(selectedEvents.filter(id => id !== eventId));
    }
  };
  
  const handleSaveWebhook = () => {
    // In a real app, this would call an API to save the webhook
    toast({
      title: editMode ? "Webhook updated" : "Webhook created",
      description: `Successfully ${editMode ? "updated" : "created"} webhook "${webhookName}"`,
    });
    
    handleCloseDialog();
  };
  
  const handleTestWebhook = (webhook: any) => {
    // In a real app, this would call an API to test the webhook
    toast({
      title: "Webhook test sent",
      description: `Test event sent to "${webhook.name}"`,
    });
  };
  
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Never";
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };
  
  const getSuccessRateBadge = (rate: number) => {
    if (rate >= 95) {
      return <Badge variant="outline\" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">{rate}%</Badge>;
    } else if (rate >= 80) {
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50 border-yellow-200">{rate}%</Badge>;
    } else {
      return <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200">{rate}%</Badge>;
    }
  };
  
  return (
    <div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editMode ? "Edit webhook" : "Add webhook"}</DialogTitle>
            <DialogDescription>
              {editMode ? "Update your webhook configuration" : "Configure a new webhook to receive event notifications"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Webhook name</Label>
              <Input
                id="name"
                placeholder="e.g., Lease Created Notification"
                value={webhookName}
                onChange={(e) => setWebhookName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="url">Endpoint URL</Label>
              <Input
                id="url"
                placeholder="https://example.com/webhooks/endpoint"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
              />
            </div>
            <div>
              <Label className="mb-2 block">Events to subscribe</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-40 overflow-y-auto border rounded-md p-3">
                {availableEvents.map((event) => (
                  <div key={event.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`event-${event.id}`}
                      checked={selectedEvents.includes(event.id)}
                      onCheckedChange={(checked) => 
                        handleEventChange(event.id, checked as boolean)
                      }
                    />
                    <label
                      htmlFor={`event-${event.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {event.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleCloseDialog}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveWebhook}
              disabled={!webhookName || !webhookUrl || selectedEvents.length === 0}
            >
              {editMode ? "Update webhook" : "Create webhook"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Name</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Events</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Triggered</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {webhooks.map((webhook) => (
              <TableRow key={webhook.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <Webhook className="h-3 w-3 text-primary" />
                    </div>
                    {webhook.name}
                  </div>
                </TableCell>
                <TableCell className="font-mono text-xs truncate max-w-[200px]">
                  {webhook.url}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {webhook.events.map((event) => (
                      <Badge key={event} variant="secondary" className="text-xs">
                        {event}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <Switch
                      checked={webhook.active}
                      aria-label="Toggle webhook"
                    />
                    {getSuccessRateBadge(webhook.successRate)}
                  </div>
                </TableCell>
                <TableCell>{formatDate(webhook.lastTriggered)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleOpenDialog(webhook)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleTestWebhook(webhook)}>
                        <Play className="mr-2 h-4 w-4" />
                        Test webhook
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}