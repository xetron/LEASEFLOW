"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { 
  Download, 
  BarChart3, 
  LineChart, 
  PieChart, 
  Table as TableIcon, 
  FileText,
  Plus,
  Trash
} from "lucide-react";

const reportTypes = [
  { id: "financial", label: "Financial Report" },
  { id: "lease", label: "Lease Analysis" },
  { id: "tenant", label: "Tenant Report" },
  { id: "compliance", label: "Compliance Report" },
  { id: "custom", label: "Custom Report" },
];

const dataSources = [
  { id: "leases", label: "Lease Database" },
  { id: "contracts", label: "Contracts Database" },
  { id: "finance", label: "Financial Records" },
  { id: "tenants", label: "Tenant Information" },
  { id: "documents", label: "Document Analysis" },
];

const visualizationTypes = [
  { id: "table", label: "Table", icon: TableIcon },
  { id: "bar", label: "Bar Chart", icon: BarChart3 },
  { id: "line", label: "Line Chart", icon: LineChart },
  { id: "pie", label: "Pie Chart", icon: PieChart },
  { id: "text", label: "Text Summary", icon: FileText },
];

const timeRanges = [
  { id: "last30", label: "Last 30 days" },
  { id: "last90", label: "Last 90 days" },
  { id: "lastYear", label: "Last 12 months" },
  { id: "ytd", label: "Year to date" },
  { id: "custom", label: "Custom range" },
];

export function ReportBuilder() {
  const [selectedReportType, setSelectedReportType] = useState("");
  const [selectedDataSources, setSelectedDataSources] = useState<string[]>([]);
  const [selectedVisualization, setSelectedVisualization] = useState("");
  const [reportName, setReportName] = useState("");
  const [timeRange, setTimeRange] = useState("");
  const [filters, setFilters] = useState<Array<{ field: string; value: string }>>([
    { field: "", value: "" },
  ]);
  
  const handleDataSourceChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedDataSources([...selectedDataSources, id]);
    } else {
      setSelectedDataSources(selectedDataSources.filter((item) => item !== id));
    }
  };
  
  const addFilter = () => {
    setFilters([...filters, { field: "", value: "" }]);
  };
  
  const removeFilter = (index: number) => {
    const newFilters = [...filters];
    newFilters.splice(index, 1);
    setFilters(newFilters);
  };
  
  const updateFilter = (index: number, field: string, value: string) => {
    const newFilters = [...filters];
    newFilters[index] = { ...newFilters[index], [field]: value };
    setFilters(newFilters);
  };
  
  const handleGenerateReport = () => {
    console.log("Generating report with:", {
      name: reportName,
      type: selectedReportType,
      dataSources: selectedDataSources,
      visualization: selectedVisualization,
      timeRange,
      filters,
    });
    
    // In a real app, this would call an API to generate the report
  };
  
  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Label htmlFor="report-name" className="text-base">Report Name</Label>
          <Input
            id="report-name"
            placeholder="Enter report name"
            className="mt-1"
            value={reportName}
            onChange={(e) => setReportName(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="report-type" className="text-base">Report Type</Label>
          <Select value={selectedReportType} onValueChange={setSelectedReportType}>
            <SelectTrigger id="report-type" className="mt-1">
              <SelectValue placeholder="Select report type" />
            </SelectTrigger>
            <SelectContent>
              {reportTypes.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div>
        <Label className="text-base">Data Sources</Label>
        <div className="grid gap-4 mt-2 md:grid-cols-2 lg:grid-cols-3">
          {dataSources.map((source) => (
            <div key={source.id} className="flex items-center space-x-2">
              <Checkbox
                id={`source-${source.id}`}
                checked={selectedDataSources.includes(source.id)}
                onCheckedChange={(checked) => 
                  handleDataSourceChange(source.id, checked as boolean)
                }
              />
              <label
                htmlFor={`source-${source.id}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {source.label}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <Label className="text-base">Visualization Type</Label>
        <RadioGroup
          value={selectedVisualization}
          onValueChange={setSelectedVisualization}
          className="grid gap-4 mt-2 md:grid-cols-2 lg:grid-cols-5"
        >
          {visualizationTypes.map((type) => (
            <div key={type.id} className="flex items-center space-x-2">
              <RadioGroupItem value={type.id} id={`viz-${type.id}`} />
              <label
                htmlFor={`viz-${type.id}`}
                className="flex items-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                <type.icon className="mr-2 h-4 w-4" />
                {type.label}
              </label>
            </div>
          ))}
        </RadioGroup>
      </div>
      
      <div>
        <Label htmlFor="time-range" className="text-base">Time Range</Label>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger id="time-range" className="mt-1">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            {timeRanges.map((range) => (
              <SelectItem key={range.id} value={range.id}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-2">
          <Label className="text-base">Filters</Label>
          <Button variant="outline" size="sm" onClick={addFilter} className="gap-1">
            <Plus className="h-3.5 w-3.5" />
            Add Filter
          </Button>
        </div>
        <div className="space-y-4">
          {filters.map((filter, index) => (
            <div key={index} className="flex items-end gap-4">
              <div className="flex-1">
                <Label htmlFor={`filter-field-${index}`} className="text-sm">Field</Label>
                <Select
                  value={filter.field}
                  onValueChange={(value) => updateFilter(index, "field", value)}
                >
                  <SelectTrigger id={`filter-field-${index}`} className="mt-1">
                    <SelectValue placeholder="Select field" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="property_type">Property Type</SelectItem>
                    <SelectItem value="tenant_name">Tenant Name</SelectItem>
                    <SelectItem value="lease_status">Lease Status</SelectItem>
                    <SelectItem value="lease_term">Lease Term</SelectItem>
                    <SelectItem value="rent_amount">Rent Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Label htmlFor={`filter-value-${index}`} className="text-sm">Value</Label>
                <Input
                  id={`filter-value-${index}`}
                  className="mt-1"
                  value={filter.value}
                  onChange={(e) => updateFilter(index, "value", e.target.value)}
                  placeholder="Enter value"
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeFilter(index)}
                className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                disabled={filters.length === 1}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
      
      <Separator />
      
      <div className="flex justify-end gap-4">
        <Button variant="outline">Save as Template</Button>
        <Button 
          className="gap-2"
          disabled={!reportName || !selectedReportType || selectedDataSources.length === 0 || !selectedVisualization || !timeRange}
          onClick={handleGenerateReport}
        >
          <BarChart3 className="h-4 w-4" />
          Generate Report
        </Button>
      </div>
    </div>
  );
}