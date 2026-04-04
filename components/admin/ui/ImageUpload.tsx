"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2, ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic validation
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.url) {
        onChange(data.url);
        toast.success("Image uploaded successfully");
      } else {
        throw new Error(data.error || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      {label && <label className="text-[11px] font-black uppercase tracking-[0.15em] text-muted-foreground ml-1">{label}</label>}
      
      <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-muted/30 border border-border rounded-3xl group hover:border-primary/20 transition-all">
        <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-card border border-border flex-shrink-0 group-hover:scale-105 transition-transform">
          {value ? (
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground/30">
              <ImageIcon className="w-8 h-8 mb-1" />
              <span className="text-[10px] font-bold">PREVIEW</span>
            </div>
          )}
          
          {isUploading && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
              <Loader2 className="w-6 h-6 text-white animate-spin" />
            </div>
          )}
        </div>

        <div className="flex-1 space-y-3">
          <div className="flex flex-wrap gap-3">
             <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="h-10 px-5 bg-white border border-border rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-primary hover:text-white hover:border-primary transition-all active:scale-95 disabled:opacity-50"
             >
                <Upload className="w-3.5 h-3.5" />
                Select Photo
             </button>
             
             {value && (
                <button
                   type="button"
                   onClick={() => onChange("")}
                   className="h-10 px-5 bg-rose-50 border border-rose-100 rounded-xl text-rose-500 text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-rose-500 hover:text-white transition-all active:scale-95"
                >
                   <X className="w-3.5 h-3.5" />
                   Remove
                </button>
             )}
          </div>
          <p className="text-[10px] font-medium text-muted-foreground opacity-60">
            JPG, PNG or WEBP. Max size 5MB. For best results, use a square professional portrait.
          </p>
        </div>
        
        <input 
          type="file" 
          hidden 
          ref={fileInputRef} 
          onChange={handleUpload} 
          accept="image/*"
        />
      </div>
    </div>
  );
}
