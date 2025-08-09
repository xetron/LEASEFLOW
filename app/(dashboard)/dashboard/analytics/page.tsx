import { Header } from "@/components/dashboard/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Share, BarChart3, Filter } from "lucide-react";
import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard";
import { ReportBuilder } from "@/components/analytics/report-builder";

export default function AnalyticsPage() {
  return (
    <div>
      <Header title="Analytics & Reporting" />
      <main className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Analytics Dashboard</h1>
            <p className="text-muted-foreground">Analyze your lease and revenue data</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <Share className="h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button className="gap-2">
              <BarChart3 className="h-4 w-4" />
              New Report
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="reports">Report Builder</TabsTrigger>
            <TabsTrigger value="custom">Custom Analytics</TabsTrigger>
          </TabsList>
          <div className="mt-6">
            <TabsContent value="dashboard" className="m-0">
              <AnalyticsDashboard />
            </TabsContent>
            <TabsContent value="reports" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Report Builder</CardTitle>
                  <CardDescription>
                    Create custom reports based on your financial data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ReportBuilder />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="custom" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Custom Analytics</CardTitle>
                  <CardDescription>
                    Run custom queries against your data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-[400px]">
                    <div className="text-center">
                      <BarChart3 className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">Custom analytics engine is being prepared</h3>
                      <p className="text-sm text-muted-foreground max-w-md">
                        The DuckDB-powered custom analytics engine will be available soon. This feature will allow you to write SQL queries directly against your data.
                      </p>
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