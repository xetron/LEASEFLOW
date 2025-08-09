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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Copy, Key, MoreHorizontal, Trash, RefreshCw, ClipboardCheck } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";

// Sample API keys data
const apiKeys = [
  {
    id: "key-1",
    name: "Production API Key",
    prefix: "lf_prod_",
    suffix: "3f9a21",
    created: "2025-02-15T10:30:00Z",
    lastUsed: "2025-03-21T14:22:00Z",
    expiresAt: "2026-02-15T10:30:00Z",
  },
  {
    id: "key-2",
    name: "QuickBooks Integration",
    prefix: "lf_qb_",
    suffix: "7d21e8",
    created: "2025-03-01T08:15:00Z",
    lastUsed: "2025-03-21T09:45:00Z",
    expiresAt: "2026-03-01T08:15:00Z",
  },
  {
    id: "key-3",
    name: "Reporting API",
    prefix: "lf_reporting_",
    suffix: "a12b34",
    created: "2025-03-10T16:20:00Z",
    lastUsed: null,
    expiresAt: "2026-03-10T16:20:00Z",
  },
];

export function ApiKeyManager() {
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyExpiration, setNewKeyExpiration] = useState("365");
  const [isGenerating, setIsGenerating] = useState(false);
  const [newKey, setNewKey] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  
  const handleGenerateKey = () => {
    setIsGenerating(true);
    
    // Simulate API key generation
    setTimeout(() => {
      const generatedKey = `lf_${newKeyName.toLowerCase().replace(/\s+/g, '_')}_${Math.random().toString(36).substring(2, 10)}`;
      setNewKey(generatedKey);
      setIsGenerating(false);
    }, 1000);
  };
  
  const handleCopyKey = () => {
    if (newKey) {
      navigator.clipboard.writeText(newKey);
      setCopiedKey(true);
      
      toast({
        title: "API key copied",
        description: "The API key has been copied to your clipboard.",
      });
      
      setTimeout(() => setCopiedKey(false), 3000);
    }
  };
  
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setNewKeyName("");
    setNewKeyExpiration("365");
    setNewKey(null);
    setCopiedKey(false);
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
  
  const isExpiringSoon = (expiresAt: string) => {
    const expirationDate = new Date(expiresAt);
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    
    return expirationDate <= thirtyDaysFromNow;
  };
  
  return (
    <div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Generate new API key</DialogTitle>
            <DialogDescription>
              Create a new API key for integrating with external services
            </DialogDescription>
          </DialogHeader>
          {!newKey ? (
            <>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Key name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Production API Key"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="expiration">Expiration</Label>
                  <select
                    id="expiration"
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    value={newKeyExpiration}
                    onChange={(e) => setNewKeyExpiration(e.target.value)}
                  >
                    <option value="30">30 days</option>
                    <option value="90">90 days</option>
                    <option value="365">1 year</option>
                    <option value="730">2 years</option>
                  </select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleGenerateKey}
                  disabled={!newKeyName || isGenerating}
                >
                  {isGenerating ? "Generating..." : "Generate key"}
                </Button>
              </DialogFooter>
            </>
          ) : (
            <>
              <div className="py-6">
                <div className="mb-4">
                  <Label className="text-muted-foreground">Your new API key:</Label>
                  <div className="mt-1 flex">
                    <Input
                      readOnly
                      value={newKey}
                      className="font-mono text-xs pr-20"
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute right-6 top-[50%] translate-y-[-50%]"
                      onClick={handleCopyKey}
                    >
                      {copiedKey ? <ClipboardCheck className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  <p className="flex items-center text-amber-600">
                    <Key className="h-4 w-4 mr-2" />
                    Make sure to copy your API key now. You won&apos;t be able to see it again!
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={handleCloseDialog}
                >
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Name</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Last Used</TableHead>
              <TableHead>Expires</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {apiKeys.map((key) => (
              <TableRow key={key.id}>
                <TableCell className="font-medium">
                  <div>
                    {key.name}
                    <div className="text-xs text-muted-foreground font-mono">
                      {key.prefix}...{key.suffix}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{formatDate(key.created)}</TableCell>
                <TableCell>{formatDate(key.lastUsed)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span>{formatDate(key.expiresAt)}</span>
                    {isExpiringSoon(key.expiresAt) && (
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50 border-yellow-200">
                        Expiring soon
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Rotate key
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash className="mr-2 h-4 w-4" />
                        Revoke key
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