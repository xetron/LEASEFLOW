"use client";

import { useState } from "react";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample data
const revenueByPropertyType = [
  { name: "Office", value: 42 },
  { name: "Retail", value: 28 },
  { name: "Industrial", value: 18 },
  { name: "Other", value: 12 },
];

const leaseExpirationData = [
  { month: "Apr", count: 2 },
  { month: "May", count: 1 },
  { month: "Jun", count: 0 },
  { month: "Jul", count: 3 },
  { month: "Aug", count: 1 },
  { month: "Sep", count: 2 },
  { month: "Oct", count: 4 },
  { month: "Nov", count: 2 },
  { month: "Dec", count: 1 },
  { month: "Jan", count: 5 },
  { month: "Feb", count: 2 },
  { month: "Mar", count: 3 },
];

const revenueGrowthData = [
  { year: "2022", revenue: 3200000 },
  { year: "2023", revenue: 3800000 },
  { year: "2024", revenue: 4200000 },
  { year: "2025", revenue: 4675000, projected: true },
  { year: "2026", revenue: 5100000, projected: true },
];

const occupancyRateData = [
  { quarter: "Q1 '24", rate: 92 },
  { quarter: "Q2 '24", rate: 94 },
  { quarter: "Q3 '24", rate: 91 },
  { quarter: "Q4 '24", rate: 93 },
  { quarter: "Q1 '25", rate: 95 },
];

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("year");
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="md:col-span-2">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Revenue Growth</CardTitle>
              <CardDescription>Year-over-year revenue growth analysis</CardDescription>
            </div>
            <Select defaultValue={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="year">Yearly</SelectItem>
                <SelectItem value="quarter">Quarterly</SelectItem>
                <SelectItem value="month">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={revenueGrowthData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="year" />
                <YAxis 
                  tickFormatter={(value) => `$${value/1000000}M`}
                />
                <Tooltip 
                  formatter={(value, name) => {
                    if (name === "revenue") {
                      return [formatCurrency(value as number), "Revenue"];
                    }
                    return [value, name];
                  }}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    borderColor: 'hsl(var(--border))' 
                  }}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(var(--chart-1))" 
                  fill="hsl(var(--chart-1))" 
                  fillOpacity={0.6}
                  name="Revenue"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Revenue by Property Type</CardTitle>
          <CardDescription>Distribution of revenue across property types</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={revenueByPropertyType}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {revenueByPropertyType.map((entry, index) => (
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
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Lease Expirations</CardTitle>
          <CardDescription>Number of leases expiring by month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={leaseExpirationData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value) => [`${value} leases`, "Expirations"]}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    borderColor: 'hsl(var(--border))' 
                  }}
                />
                <Bar 
                  dataKey="count" 
                  name="Expirations" 
                  fill="hsl(var(--chart-2))" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Occupancy Rate</CardTitle>
          <CardDescription>Property occupancy rate over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={occupancyRateData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="quarter" />
                <YAxis domain={[85, 100]} />
                <Tooltip
                  formatter={(value) => [`${value}%`, "Occupancy Rate"]}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    borderColor: 'hsl(var(--border))' 
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="hsl(var(--chart-3))" 
                  activeDot={{ r: 8 }} 
                  name="Occupancy Rate"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}