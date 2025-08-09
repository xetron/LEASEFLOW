"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight, ArrowDownRight, DollarSign, BarChart2, TrendingUp } from "lucide-react";

const monthlyData = [
  { month: "Jan", revenue: 340000, expenses: 220000 },
  { month: "Feb", revenue: 320000, expenses: 230000 },
  { month: "Mar", revenue: 355000, expenses: 225000 },
  { month: "Apr", revenue: 375000, expenses: 240000 },
  { month: "May", revenue: 390000, expenses: 235000 },
  { month: "Jun", revenue: 400000, expenses: 260000 },
];

const quarterlyData = [
  { quarter: "Q1", revenue: 1015000, expenses: 675000 },
  { quarter: "Q2", revenue: 1165000, expenses: 735000 },
  { quarter: "Q3", revenue: 1210000, expenses: 760000 },
  { quarter: "Q4", revenue: 1285000, expenses: 795000 },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export function FinancialOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Overview</CardTitle>
        <CardDescription>
          Track key financial metrics for your lease and revenue portfolio
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="monthly" className="w-full">
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="monthly">
            <div className="grid gap-6 md:grid-cols-3 mb-8">
              <MetricCard 
                title="Total Revenue"
                value="$2.18M"
                change="+8.2%"
                trend="up"
                icon={DollarSign}
              />
              <MetricCard 
                title="Average Lease Value"
                value="$156K"
                change="+4.5%"
                trend="up"
                icon={BarChart2}
              />
              <MetricCard 
                title="Profit Margin"
                value="37.6%"
                change="-1.2%"
                trend="down"
                icon={TrendingUp}
              />
            </div>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" />
                  <YAxis 
                    tickFormatter={(value) => `$${value/1000}k`}
                  />
                  <Tooltip 
                    formatter={(value) => [formatCurrency(value as number), undefined]}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      borderColor: 'hsl(var(--border))' 
                    }}
                  />
                  <Bar 
                    dataKey="revenue" 
                    name="Revenue" 
                    fill="hsl(var(--chart-1))" 
                    radius={[4, 4, 0, 0]} 
                  />
                  <Bar 
                    dataKey="expenses" 
                    name="Expenses" 
                    fill="hsl(var(--chart-3))" 
                    radius={[4, 4, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="quarterly">
            <div className="grid gap-6 md:grid-cols-3 mb-8">
              <MetricCard 
                title="Total Revenue"
                value="$4.67M"
                change="+12.5%"
                trend="up"
                icon={DollarSign}
              />
              <MetricCard 
                title="Average Lease Value"
                value="$162K"
                change="+6.8%"
                trend="up"
                icon={BarChart2}
              />
              <MetricCard 
                title="Profit Margin"
                value="39.2%"
                change="+2.4%"
                trend="up"
                icon={TrendingUp}
              />
            </div>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={quarterlyData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="quarter" />
                  <YAxis 
                    tickFormatter={(value) => `$${value/1000}k`}
                  />
                  <Tooltip 
                    formatter={(value) => [formatCurrency(value as number), undefined]}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      borderColor: 'hsl(var(--border))' 
                    }}
                  />
                  <Bar 
                    dataKey="revenue" 
                    name="Revenue" 
                    fill="hsl(var(--chart-1))" 
                    radius={[4, 4, 0, 0]} 
                  />
                  <Bar 
                    dataKey="expenses" 
                    name="Expenses" 
                    fill="hsl(var(--chart-3))" 
                    radius={[4, 4, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="yearly">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <BarChart2 className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Yearly data is being processed</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  The yearly financial report is currently being compiled. Check back soon to view your annual financial metrics.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ElementType;
}

function MetricCard({ title, value, change, trend, icon: Icon }: MetricCardProps) {
  return (
    <div className="rounded-lg border bg-card p-6">
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div className={`flex items-center ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          {trend === 'up' ? (
            <ArrowUpRight className="mr-1 h-4 w-4" />
          ) : (
            <ArrowDownRight className="mr-1 h-4 w-4" />
          )}
          <span>{change}</span>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-3xl font-bold mt-1">{value}</p>
      </div>
    </div>
  );
}