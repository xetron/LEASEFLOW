"use client";

import { useState } from "react";
import { Upload, File, X, Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export function DocumentUploader() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files && files.length > 0) {
      handleFileUpload(files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      handleFileUpload(files);
    }
  };

  const handleFileUpload = (files: File[]) => {
    setUploading(true);
    setUploadProgress(0);

    // Simulate file upload with progress
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress === null) return 0;
        if (prevProgress >= 100) {
          clearInterval(interval);
          setUploading(false);
          
          toast({
            title: "Upload complete",
            description: `Successfully uploaded ${files.length} document${files.length > 1 ? 's' : ''}`,
            action: (
              <div className="h-8 w-8 bg-primary/20 rounded-full flex items-center justify-center">
                <Check className="h-4 w-4 text-primary" />
              </div>
            ),
          });
          
          return 100;
        }
        return prevProgress + 5;
      });
    }, 150);

    return () => clearInterval(interval);
  };

  const cancelUpload = () => {
    setUploading(false);
    setUploadProgress(null);
    toast({
      title: "Upload cancelled",
      description: "Your document upload was cancelled",
      variant: "destructive",
    });
  };

  if (uploading) {
    return (
      <div className="rounded-md border border-dashed p-8 my-4">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <File className="h-8 w-8 text-primary" />
            <div className="text-lg font-medium">Uploading document...</div>
          </div>
          <div className="w-full max-w-xs mt-2">
            <Progress value={uploadProgress ?? 0} className="h-2 w-full" />
            <div className="flex justify-between mt-1 text-xs text-muted-foreground">
              <span>{uploadProgress}% complete</span>
              <span>ETA: 30 seconds</span>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-4"
            onClick={cancelUpload}
          >
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-md border border-dashed p-8 my-4 transition-colors ${
        isDragging ? "bg-primary/5 border-primary" : ""
      }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center gap-2">
        <Upload className="h-10 w-10 text-muted-foreground" />
        <h3 className="text-lg font-medium">Drop files to upload</h3>
        <p className="text-sm text-muted-foreground text-center max-w-xs">
          Drag and drop your documents here or click the button below to browse your files
        </p>
        <div className="mt-4">
          <label htmlFor="file-upload">
            <div className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium cursor-pointer hover:bg-primary/90 transition-colors">
              Browse Files
            </div>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              multiple
              accept=".pdf,.doc,.docx,.xls,.xlsx"
              onChange={handleFileChange}
            />
          </label>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Supported formats: PDF, DOC, DOCX, XLS, XLSX
        </p>
      </div>
    </div>
  );
}