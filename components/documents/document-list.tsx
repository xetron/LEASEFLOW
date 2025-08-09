"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  FileText, 
  File, 
  MoreVertical, 
  Download, 
  Trash, 
  Share, 
  FileCheck, 
  Eye,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

type DocumentType = "lease" | "contract" | "amendment" | "all";

interface DocumentListProps {
  type?: DocumentType;
}

// Mock document data
const documents = [
  {
    id: "doc-1",
    name: "Office Lease Agreement - 123 Main St",
    type: "lease",
    date: new Date("2025-03-15"),
    size: "2.4 MB",
    status: "processed",
    confidence: 97,
    extractedData: {
      startDate: "2025-04-01",
      endDate: "2028-03-31",
      annualRent: "$240,000",
      securityDeposit: "$40,000",
      tenant: "Acme Corporation",
      propertyAddress: "123 Main St, Suite 400, New York, NY 10001",
    },
  },
  {
    id: "doc-2",
    name: "Service Contract - IT Support",
    type: "contract",
    date: new Date("2025-03-12"),
    size: "1.8 MB",
    status: "processed",
    confidence: 94,
    extractedData: {
      startDate: "2025-04-01",
      endDate: "2026-03-31",
      monthlyCost: "$8,500",
      provider: "TechSupport Inc.",
      terminationClause: "30 days written notice",
    },
  },
  {
    id: "doc-3",
    name: "Lease Amendment - Extended Term",
    type: "amendment",
    date: new Date("2025-03-10"),
    size: "1.2 MB",
    status: "processing",
    confidence: null,
    extractedData: null,
  },
  {
    id: "doc-4",
    name: "Retail Space Lease - Downtown Mall",
    type: "lease",
    date: new Date("2025-03-05"),
    size: "3.1 MB",
    status: "error",
    confidence: 65,
    extractedData: {
      startDate: "2025-05-01",
      endDate: "2030-04-30",
      annualRent: "$180,000",
      securityDeposit: "$30,000",
      tenant: "Fashion Outlet LLC",
      propertyAddress: "Downtown Mall, Unit 204, Chicago, IL 60601",
    },
    error: "Missing required signatures on page 12",
  },
  {
    id: "doc-5",
    name: "Warehouse Lease Agreement",
    type: "lease",
    date: new Date("2025-02-28"),
    size: "2.7 MB",
    status: "processed",
    confidence: 99,
    extractedData: {
      startDate: "2025-04-15",
      endDate: "2030-04-14",
      annualRent: "$320,000",
      securityDeposit: "$53,000",
      tenant: "Global Logistics Inc.",
      propertyAddress: "456 Industrial Pkwy, Building C, Dallas, TX 75001",
    },
  },
];

const getDocumentIcon = (type: string) => {
  switch (type) {
    case "lease":
      return FileText;
    case "contract":
      return FileCheck;
    case "amendment":
      return File;
    default:
      return File;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "processed":
      return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">Processed</Badge>;
    case "processing":
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200">Processing</Badge>;
    case "error":
      return <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200">Error</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

export function DocumentList({ type = "all" }: DocumentListProps) {
  const router = useRouter();
  const [selectedDoc, setSelectedDoc] = useState<any>(null);
  
  const filteredDocuments = type === "all" 
    ? documents 
    : documents.filter(doc => doc.type === type);

  const viewDocument = (doc: any) => {
    setSelectedDoc(doc);
    // In a real app, this would navigate to the document view page
    // router.push(`/dashboard/documents/${doc.id}`);
  };

  return (
    <div className="divide-y">
      {filteredDocuments.length === 0 ? (
        <div className="py-12 text-center">
          <File className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No documents found</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Upload documents to get started
          </p>
        </div>
      ) : (
        filteredDocuments.map((doc) => {
          const DocIcon = getDocumentIcon(doc.type);
          
          return (
            <div key={doc.id} className="flex items-center p-4 hover:bg-muted/50 transition-colors">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <DocIcon className="h-5 w-5 text-primary" />
              </div>
              <div className="ml-4 flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{doc.name}</p>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(doc.status)}
                    
                    {doc.status === "processed" && doc.confidence && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Info className="h-3 w-3" />
                              <span>{doc.confidence}%</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Extraction confidence score: {doc.confidence}%</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => viewDocument(doc)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share className="mr-2 h-4 w-4" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <div className="flex items-center text-sm text-muted-foreground gap-4">
                  <span>Uploaded {format(doc.date, "MMM d, yyyy")}</span>
                  <span>{doc.size}</span>
                  <span className="capitalize">{doc.type}</span>
                </div>
                {doc.status === "error" && doc.error && (
                  <div className="mt-1 text-sm text-destructive flex items-center gap-1">
                    <Info className="h-3 w-3" />
                    {doc.error}
                  </div>
                )}
              </div>
            </div>
          );
        })
      )}

      {/* Document Preview Dialog */}
      {selectedDoc && (
        <Dialog open={!!selectedDoc} onOpenChange={() => setSelectedDoc(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedDoc.name}</DialogTitle>
              <DialogDescription>
                Document details and extracted information
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border rounded-md p-4 bg-muted/30">
                <h3 className="text-sm font-medium mb-2">Document Preview</h3>
                <div className="aspect-[3/4] bg-background border rounded-md flex items-center justify-center">
                  <FileText className="h-16 w-16 text-muted-foreground" />
                  <span className="sr-only">Document preview</span>
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                  <div className="flex justify-between py-1">
                    <span>Uploaded</span>
                    <span>{format(selectedDoc.date, "MMMM d, yyyy")}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>File size</span>
                    <span>{selectedDoc.size}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Document type</span>
                    <span className="capitalize">{selectedDoc.type}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Processing status</span>
                    <span className="capitalize">{selectedDoc.status}</span>
                  </div>
                  {selectedDoc.confidence && (
                    <div className="flex justify-between py-1">
                      <span>Confidence score</span>
                      <span>{selectedDoc.confidence}%</span>
                    </div>
                  )}
                </div>
              </div>
              {selectedDoc.extractedData ? (
                <div>
                  <h3 className="text-sm font-medium mb-2">Extracted Information</h3>
                  <div className="space-y-4">
                    {Object.entries(selectedDoc.extractedData).map(([key, value]: [string, any]) => (
                      <div key={key} className="border rounded-md p-3">
                        <div className="text-xs text-muted-foreground mb-1">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </div>
                        <div className="font-medium">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <div className="text-center p-8">
                    <Info className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <p>No data has been extracted from this document yet.</p>
                    {selectedDoc.status === "processing" && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Document is currently being processed.
                      </p>
                    )}
                    {selectedDoc.status === "error" && (
                      <p className="text-sm text-destructive mt-1">
                        {selectedDoc.error}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setSelectedDoc(null)}>
                Close
              </Button>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}