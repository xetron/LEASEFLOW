"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Eye, FileText, MoreHorizontal, Edit, Trash, Download, Building, DollarSign } from "lucide-react";
import { format } from "date-fns";

// Sample lease data
const leases = [
  {
    id: "lease-001",
    property: "Office Building A",
    location: "123 Main St, New York, NY 10001",
    tenant: "Acme Corporation",
    startDate: new Date("2025-04-01"),
    endDate: new Date("2028-03-31"),
    monthlyRent: 20000,
    annualRent: 240000,
    securityDeposit: 40000,
    type: "office",
    status: "active",
  },
  {
    id: "lease-002",
    property: "Downtown Mall",
    location: "456 Market St, Chicago, IL 60601",
    tenant: "Fashion Outlet LLC",
    startDate: new Date("2025-05-01"),
    endDate: new Date("2030-04-30"),
    monthlyRent: 15000,
    annualRent: 180000,
    securityDeposit: 30000,
    type: "retail",
    status: "active",
  },
  {
    id: "lease-003",
    property: "Industrial Complex C",
    location: "789 Industrial Pkwy, Dallas, TX 75001",
    tenant: "Global Logistics Inc.",
    startDate: new Date("2025-04-15"),
    endDate: new Date("2030-04-14"),
    monthlyRent: 26667,
    annualRent: 320000,
    securityDeposit: 53000,
    type: "industrial",
    status: "active",
  },
  {
    id: "lease-004",
    property: "Tech Center",
    location: "101 Innovation Dr, San Francisco, CA 94105",
    tenant: "Future Technologies Inc.",
    startDate: new Date("2024-10-01"),
    endDate: new Date("2025-09-30"),
    monthlyRent: 32000,
    annualRent: 384000,
    securityDeposit: 64000,
    type: "office",
    status: "expiring",
  },
  {
    id: "lease-005",
    property: "Suburban Office Park",
    location: "202 Corporate Blvd, Boston, MA 02110",
    tenant: "Legal Associates LLP",
    startDate: new Date("2025-01-15"),
    endDate: new Date("2028-01-14"),
    monthlyRent: 18500,
    annualRent: 222000,
    securityDeposit: 37000,
    type: "office",
    status: "active",
  },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">Active</Badge>;
    case "expiring":
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50 border-yellow-200">Expiring</Badge>;
    case "expired":
      return <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200">Expired</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export function LeaseTable() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredLeases = leases.filter((lease) => 
    lease.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lease.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lease.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Search leases..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Property</TableHead>
              <TableHead>Tenant</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Monthly Rent</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeases.map((lease) => (
              <TableRow key={lease.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                      <Building className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div>{lease.property}</div>
                      <div className="text-xs text-muted-foreground">{lease.location}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{lease.tenant}</TableCell>
                <TableCell className="capitalize">{lease.type}</TableCell>
                <TableCell>{format(lease.startDate, "MMM d, yyyy")}</TableCell>
                <TableCell>{format(lease.endDate, "MMM d, yyyy")}</TableCell>
                <TableCell>{formatCurrency(lease.monthlyRent)}</TableCell>
                <TableCell>{getStatusBadge(lease.status)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem className="cursor-pointer">
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Lease
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <FileText className="mr-2 h-4 w-4" />
                        View Document
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <DollarSign className="mr-2 h-4 w-4" />
                        Amortization Schedule
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer text-destructive">
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