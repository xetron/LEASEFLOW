"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Globe, Check, Plus } from "lucide-react";

// Sample integrations data
const integrations = [
  {
    id: "quickbooks",
    name: "QuickBooks",
    description: "Sync financial data with QuickBooks",
    category: "accounting",
    popular: true,
    connected: true,
  },
  {
    id: "salesforce",
    name: "Salesforce",
    description: "Integrate with Salesforce CRM",
    category: "crm",
    popular: true,
    connected: true,
  },
  {
    id: "docusign",
    name: "DocuSign",
    description: "Electronic signatures for your documents",
    category: "document",
    popular: true,
    connected: false,
  },
  {
    id: "slack",
    name: "Slack",
    description: "Get notifications in your Slack channels",
    category: "communication",
    popular: false,
    connected: false,
  },
  {
    id: "microsoft365",
    name: "Microsoft 365",
    description: "Integrate with Microsoft 365 suite",
    category: "productivity",
    popular: true,
    connected: false,
  },
  {
    id: "google-workspace",
    name: "Google Workspace",
    description: "Connect with Google Workspace applications",
    category: "productivity",
    popular: false,
    connected: false,
  },
  {
    id: "xero",
    name: "Xero",
    description: "Accounting software integration",
    category: "accounting",
    popular: false,
    connected: false,
  },
  {
    id: "netsuite",
    name: "NetSuite",
    description: "Enterprise resource planning integration",
    category: "erp",
    popular: false,
    connected: false,
  },
  {
    id: "hubspot",
    name: "HubSpot",
    description: "Marketing and CRM platform",
    category: "crm",
    popular: false,
    connected: false,
  },
  {
    id: "dropbox",
    name: "Dropbox",
    description: "Cloud storage for your documents",
    category: "document",
    popular: false,
    connected: false,
  },
  {
    id: "box",
    name: "Box",
    description: "Secure content management",
    category: "document",
    popular: false,
    connected: false,
  },
  {
    id: "zapier",
    name: "Zapier",
    description: "Connect with thousands of apps",
    category: "automation",
    popular: true,
    connected: false,
  },
];

export function IntegrationsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  
  const filteredIntegrations = integrations.filter((integration) => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === "all" || integration.category === category;
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search integrations..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Tabs value={category} onValueChange={setCategory} className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="accounting">Accounting</TabsTrigger>
            <TabsTrigger value="crm">CRM</TabsTrigger>
            <TabsTrigger value="document">Document</TabsTrigger>
            <TabsTrigger value="productivity">Productivity</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIntegrations.length === 0 ? (
          <div className="col-span-full flex items-center justify-center h-40">
            <div className="text-center">
              <Globe className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
              <h3 className="font-medium">No integrations found</h3>
              <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or filters</p>
            </div>
          </div>
        ) : (
          filteredIntegrations.map((integration) => (
            <Card key={integration.id} className={integration.connected ? "border-primary/50" : ""}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                      <Globe className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{integration.name}</CardTitle>
                      <CardDescription className="text-xs mt-0.5">{integration.description}</CardDescription>
                    </div>
                  </div>
                  {integration.popular && (
                    <Badge variant="secondary" className="text-xs">Popular</Badge>
                  )}
                </div>
              </CardHeader>
              <CardFooter className="pb-3 pt-1">
                {integration.connected ? (
                  <div className="flex w-full justify-between items-center">
                    <span className="text-xs flex items-center text-green-600">
                      <Check className="mr-1 h-3 w-3" />
                      Connected
                    </span>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                ) : (
                  <Button size="sm" className="w-full gap-1">
                    <Plus className="h-3.5 w-3.5" />
                    Connect
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}