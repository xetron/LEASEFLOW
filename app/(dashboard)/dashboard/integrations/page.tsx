import { Header } from "@/components/dashboard/header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IntegrationsList } from "@/components/integrations/integrations-list";
import { ApiKeyManager } from "@/components/integrations/api-key-manager";
import { WebhookManager } from "@/components/integrations/webhook-manager";
import { Globe, Key, Webhook, RefreshCw } from "lucide-react";

export default function IntegrationsPage() {
  return (
    <div>
      <Header title="Integrations" />
      <main className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Integration Hub</h1>
            <p className="text-muted-foreground">Connect your applications and services</p>
          </div>
          <Button className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Sync Connections
          </Button>
        </div>
        
        <Tabs defaultValue="available" className="w-full">
          <TabsList>
            <TabsTrigger value="available">Available Integrations</TabsTrigger>
            <TabsTrigger value="active">Active Connections</TabsTrigger>
            <TabsTrigger value="api">API Keys</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          </TabsList>
          <div className="mt-6">
            <TabsContent value="available" className="m-0">
              <IntegrationsList />
            </TabsContent>
            <TabsContent value="active" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Active Connections</CardTitle>
                  <CardDescription>
                    Manage your active integrations and their permissions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Globe className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">QuickBooks Integration</div>
                            <div className="text-sm text-muted-foreground">Financial data sync</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">Connected</Badge>
                          <Button variant="outline" size="sm">Configure</Button>
                          <Button variant="ghost" size="sm">Disconnect</Button>
                        </div>
                      </div>
                      <div className="mt-4 border-t pt-4">
                        <div className="text-sm">
                          <div className="font-medium mb-1">Permissions</div>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-green-500"></div>
                              <span>Read financial data</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-green-500"></div>
                              <span>Sync invoices</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-green-500"></div>
                              <span>Sync payments</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-sm mt-2">
                          <div className="font-medium mb-1">Last Synced</div>
                          <div>Today at 09:42 AM</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Globe className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">Salesforce Integration</div>
                            <div className="text-sm text-muted-foreground">Customer data management</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">Connected</Badge>
                          <Button variant="outline" size="sm">Configure</Button>
                          <Button variant="ghost" size="sm">Disconnect</Button>
                        </div>
                      </div>
                      <div className="mt-4 border-t pt-4">
                        <div className="text-sm">
                          <div className="font-medium mb-1">Permissions</div>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-green-500"></div>
                              <span>Read customer data</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-green-500"></div>
                              <span>Sync contracts</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-green-500"></div>
                              <span>Update lease status</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-sm mt-2">
                          <div className="font-medium mb-1">Last Synced</div>
                          <div>Yesterday at 04:15 PM</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="api" className="m-0">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>API Keys</CardTitle>
                      <CardDescription>
                        Manage your API keys for external integrations
                      </CardDescription>
                    </div>
                    <Button>
                      <Key className="mr-2 h-4 w-4" />
                      Generate New Key
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <ApiKeyManager />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="webhooks" className="m-0">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Webhooks</CardTitle>
                      <CardDescription>
                        Configure webhooks to notify external systems of events
                      </CardDescription>
                    </div>
                    <Button>
                      <Webhook className="mr-2 h-4 w-4" />
                      Add Webhook
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <WebhookManager />
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  );
}