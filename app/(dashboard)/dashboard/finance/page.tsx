import { Header } from "@/components/dashboard/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, DollarSign, Filter, Clock } from "lucide-react";
import { FinancialOverview } from "@/components/finance/financial-overview";
import { LeaseTable } from "@/components/finance/lease-table";
import { ContractTable } from "@/components/finance/contract-table";
import { Separator } from "@/components/ui/separator";

export default function FinancePage() {
  return (
    <div>
      <Header title="Financial Management" />
      <main className="p-6">
        <div className="mb-8">
          <FinancialOverview />
        </div>
        <Tabs defaultValue="leases" className="w-full">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <TabsList>
              <TabsTrigger value="leases">Leases</TabsTrigger>
              <TabsTrigger value="contracts">Contracts</TabsTrigger>
              <TabsTrigger value="renewals">Renewals</TabsTrigger>
              <TabsTrigger value="amortization">Amortization</TabsTrigger>
            </TabsList>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button className="gap-2">
                <PlusCircle className="h-4 w-4" />
                Add New
              </Button>
            </div>
          </div>
          <div className="mt-6">
            <TabsContent value="leases" className="m-0">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Lease Management</CardTitle>
                      <CardDescription>
                        View and manage all active leases
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <LeaseTable />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="contracts" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Contracts</CardTitle>
                  <CardDescription>
                    Manage revenue contracts and service agreements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ContractTable />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="renewals" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Renewals</CardTitle>
                  <CardDescription>
                    Monitor and manage upcoming lease and contract renewals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="rounded-md border">
                      <div className="flex items-center p-4 bg-muted/50">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <Clock className="h-5 w-5 text-primary" />
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Office Lease - 123 Main St</p>
                              <p className="text-sm text-muted-foreground">Expires in 45 days</p>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">Analyze</Button>
                              <Button size="sm">Renew</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 border-t">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Current Terms</p>
                            <p className="font-medium">$20,000/month</p>
                            <p className="text-sm">3-year term</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Predicted Terms</p>
                            <p className="font-medium">$22,500/month</p>
                            <p className="text-sm text-green-600">+12.5% increase</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Market Analysis</p>
                            <p className="text-sm">10-15% increase expected based on market conditions</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="rounded-md border">
                      <div className="flex items-center p-4 bg-muted/50">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <Clock className="h-5 w-5 text-primary" />
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">IT Support Contract</p>
                              <p className="text-sm text-muted-foreground">Expires in 60 days</p>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">Analyze</Button>
                              <Button size="sm">Renew</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 border-t">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Current Terms</p>
                            <p className="font-medium">$8,500/month</p>
                            <p className="text-sm">1-year term</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Predicted Terms</p>
                            <p className="font-medium">$8,925/month</p>
                            <p className="text-sm text-green-600">+5% increase</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Market Analysis</p>
                            <p className="text-sm">5-7% increase expected based on inflation and service expansion</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="amortization" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Amortization Schedules</CardTitle>
                  <CardDescription>
                    View and manage amortization schedules for all leases
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="border rounded-md p-6">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="text-lg font-medium">Office Lease - 123 Main St</h3>
                          <p className="text-sm text-muted-foreground">36-month term starting Apr 1, 2025</p>
                        </div>
                        <Button variant="outline" size="sm">Export</Button>
                      </div>
                      <Separator className="mb-6" />
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Monthly Payment</p>
                            <p className="font-medium text-lg">$20,000</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Total Obligation</p>
                            <p className="font-medium text-lg">$720,000</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Present Value</p>
                            <p className="font-medium text-lg">$680,425</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Discount Rate</p>
                            <p className="font-medium text-lg">4.5%</p>
                          </div>
                        </div>
                        <div className="mt-6">
                          <div className="rounded-md border">
                            <div className="grid grid-cols-5 gap-4 p-4 bg-muted/50 font-medium text-sm">
                              <div>Period</div>
                              <div>Date</div>
                              <div>Payment</div>
                              <div>Interest</div>
                              <div>Balance</div>
                            </div>
                            <div className="divide-y">
                              {[1, 2, 3, 4, 5].map((period) => (
                                <div key={period} className="grid grid-cols-5 gap-4 p-4 text-sm">
                                  <div>{period}</div>
                                  <div>{new Date(2025, 3 + period, 1).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
                                  <div>$20,000</div>
                                  <div>${(680425 * 0.045 / 12).toFixed(2)}</div>
                                  <div>${(680425 - (period * 20000)).toFixed(2)}</div>
                                </div>
                              ))}
                            </div>
                            <div className="p-4 border-t bg-muted/30 text-sm">
                              <Button variant="link" size="sm" className="p-0 h-auto">
                                View full schedule
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  );
}