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
import { 
  Eye, 
  FileText, 
  MoreHorizontal, 
  Edit, 
  Trash, 
  Download, 
  FileCheck, 
  DollarSign, 
  Timer 
} from "lucide-react";
import { format } from "date-fns";

// Sample contract data
const contracts = [
  {
    id: "contract-001",
    name: "IT Support Services",
    provider: "TechSupport Inc.",
    startDate: new Date("2025-04-01"),
    endDate: new Date("2026-03-31"),
    monthlyCost: 8500,
    annualCost: 102000,
    type: "service",
    status: "active",
    terminationClause: "30 days written notice",
  },
  {
    id: "contract-002",
    name: "Cleaning Services",
    provider: "CleanPro Services",
    startDate: new Date("2025-03-15"),
    endDate: new Date("2026-03-14"),
    monthlyCost: 3200,
    annualCost: 38400,
    type: "service",
    status: "active",
    terminationClause: "60 days written notice",
  },
  {
    id: "contract-003",
    name: "Software Licensing",
    provider: "Enterprise Software Co.",
    startDate: new Date("2025-01-01"),
    endDate: new Date("2027-12-31"),
    monthlyCost: 12000,
    annualCost: 144000,
    type: "licensing",
    status: "active",
    terminationClause: "90 days written notice + early termination fee",
  },
  {
    id: "contract-004",
    name: "Security Services",
    provider: "SecureGuard Inc.",
    startDate: new Date("2024-11-01"),
    endDate: new Date("2025-10-31"),
    monthlyCost: 5600,
    annualCost: 67200,
    type: "service",
    status: "expiring",
    terminationClause: "45 days written notice",
  },
  {
    id: "contract-005",
    name: "Equipment Maintenance",
    provider: "MechTech Solutions",
    startDate: new Date("2025-02-15"),
    endDate: new Date("2028-02-14"),
    monthlyCost: 4300,
    annualCost: 51600,
    type: "maintenance",
    status: "active",
    terminationClause: "60 days written notice + parts compensation",
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

export function ContractTable() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredContracts = contracts.filter((contract) => 
    contract.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contract.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contract.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Search contracts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Contract</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Monthly Cost</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContracts.map((contract) => (
              <TableRow key={contract.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                      <FileCheck className="h-4 w-4 text-primary" />
                    </div>
                    <div>{contract.name}</div>
                  </div>
                </TableCell>
                <TableCell>{contract.provider}</TableCell>
                <TableCell className="capitalize">{contract.type}</TableCell>
                <TableCell>{format(contract.startDate, "MMM d, yyyy")}</TableCell>
                <TableCell>{format(contract.endDate, "MMM d, yyyy")}</TableCell>
                <TableCell>{formatCurrency(contract.monthlyCost)}</TableCell>
                <TableCell>{getStatusBadge(contract.status)}</TableCell>
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
                        Edit Contract
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <FileText className="mr-2 h-4 w-4" />
                        View Document
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <Timer className="mr-2 h-4 w-4" />
                        Renewal Terms
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