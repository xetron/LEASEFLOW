import { Header } from "@/components/dashboard/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DocumentUploader } from "@/components/documents/document-uploader";
import { DocumentList } from "@/components/documents/document-list";
import { FileUp, Filter, Search } from "lucide-react";

export default function DocumentsPage() {
  return (
    <div>
      <Header title="Document Management" />
      <main className="p-6">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <TabsList>
              <TabsTrigger value="all">All Documents</TabsTrigger>
              <TabsTrigger value="leases">Leases</TabsTrigger>
              <TabsTrigger value="contracts">Contracts</TabsTrigger>
              <TabsTrigger value="amendments">Amendments</TabsTrigger>
            </TabsList>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search documents..."
                  className="w-full pl-8 md:w-[260px]"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button className="gap-2">
                <FileUp className="h-4 w-4" />
                Upload
              </Button>
            </div>
          </div>
          <div className="mt-6">
            <TabsContent value="all" className="m-0">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>All Documents</CardTitle>
                      <CardDescription>Manage all your document assets</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Select defaultValue="recent">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="recent">Most Recent</SelectItem>
                          <SelectItem value="oldest">Oldest First</SelectItem>
                          <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                          <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <DocumentUploader />
                  <DocumentList />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="leases" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Lease Documents</CardTitle>
                  <CardDescription>
                    All lease agreements and related documents
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DocumentList type="lease" />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="contracts" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Contract Documents</CardTitle>
                  <CardDescription>
                    Service contracts and vendor agreements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DocumentList type="contract" />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="amendments" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Amendments</CardTitle>
                  <CardDescription>
                    Document amendments and addendums
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DocumentList type="amendment" />
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  );
}