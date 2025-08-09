"use client";

import { Header } from "@/components/dashboard/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowDownIcon, 
  ArrowRightIcon, 
  ArrowUpIcon, 
  DollarSign, 
  FileText, 
  BarChart3, 
  CheckCircle
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Button } from "@/components/ui/button";

const areaChartData = [
  { month: "Jan", revenue: 12400, projected: 10000 },
  { month: "Feb", revenue: 15000, projected: 12000 },
  { month: "Mar", revenue: 16200, projected: 14000 },
  { month: "Apr", revenue: 17800, projected: 16000 },
  { month: "May", revenue: 19500, projected: 18000 },
  { month: "Jun", revenue: 22100, projected: 20000 },
  { month: "Jul", revenue: 21000, projected: 22000 },
  { month: "Aug", revenue: 24500, projected: 24000 },
  { month: "Sep", revenue: 28000, projected: 26000 },
  { month: "Oct", revenue: 26800, projected: 28000 },
  { month: "Nov", revenue: 30000, projected: 30000 },
  { month: "Dec", revenue: 33000, projected: 32000 },
];

const pieChartData = [
  { name: "Office", value: 42 },
  { name: "Retail", value: 28 },
  { name: "Industrial", value: 18 },
  { name: "Other", value: 12 },
];

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

export default function Dashboard() {
  return (
    <div>
      <Header title="Dashboard" />
      <main className="p-6">
        <div className="grid gap-6">
          <section>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Overview</h2>
              <Button variant="outline" className="gap-2">
                Download Report <ArrowRightIcon className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Leases
                  </CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">142</div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <ArrowUpIcon className="mr-1 h-4 w-4 text-green-500" />
                    <span className="text-green-500">12%</span>
                    <span className="ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Revenue
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$1.2M</div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <ArrowUpIcon className="mr-1 h-4 w-4 text-green-500" />
                    <span className="text-green-500">8%</span>
                    <span className="ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Processed Documents
                  </CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">876</div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <ArrowUpIcon className="mr-1 h-4 w-4 text-green-500" />
                    <span className="text-green-500">23%</span>
                    <span className="ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Compliance Rate
                  </CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">98.2%</div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <ArrowUpIcon className="mr-1 h-4 w-4 text-green-500" />
                    <span className="text-green-500">3%</span>
                    <span className="ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
          <section className="grid gap-6 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={areaChartData}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" className="text-xs" />
                    <YAxis 
                      tickFormatter={(value) => `$${value/1000}k`}
                      className="text-xs" 
                    />
                    <Tooltip 
                      formatter={(value) => [`$${value}`, undefined]}
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        borderColor: 'hsl(var(--border))' 
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="projected"
                      stroke="hsl(var(--chart-2))"
                      fill="hsl(var(--chart-2))"
                      fillOpacity={0.2}
                      strokeDasharray="5 5"
                      name="Projected"
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="hsl(var(--chart-1))"
                      fill="hsl(var(--chart-1))"
                      fillOpacity={0.6}
                      name="Actual"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Lease Portfolio Mix</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-full h-full flex flex-col items-center">
                    <div style={{ width: '100%', height: '85%' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {pieChartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value) => [`${value}%`, undefined]}
                            contentStyle={{ 
                              backgroundColor: 'hsl(var(--card))', 
                              borderColor: 'hsl(var(--border))' 
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4 mt-2">
                      {pieChartData.map((entry, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                          <span className="text-xs">{entry.name} ({entry.value}%)</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
          <section>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4 rounded-lg border p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">New lease agreement processed</p>
                      <span className="text-sm text-muted-foreground">2 hours ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Office space at 123 Business Park, Suite 456</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-lg border p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <BarChart3 className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Monthly financial report generated</p>
                      <span className="text-sm text-muted-foreground">Yesterday</span>
                    </div>
                    <p className="text-sm text-muted-foreground">September 2025 financial summary</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-lg border p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
                    <CheckCircle className="h-5 w-5 text-destructive" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Compliance issue detected</p>
                      <span className="text-sm text-muted-foreground">2 days ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Missing documentation for Retail Complex lease agreement</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}