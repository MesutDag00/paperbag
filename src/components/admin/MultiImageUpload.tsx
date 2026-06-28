"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { X } from "lucide-react";

interface Props {
  storagePath: string;
  values: string[];
  onChange: (urls: string[]) => void;
}

export function MultiImageUpload({ storagePath, values, onChange }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const onDrop = useCallback(
    async (files: File[]) => {
      if (!files.length) return;
      setError("");
      setUploading(true);

      try {
        const urls = await Promise.all(
          files.map(async (file) => {
            const fd = new FormData();
            fd.append("file", file);
            fd.append("folder", storagePath);
            const res = await fetch("/api/upload", { method: "POST", body: fd });
            const data = await res.json() as { url?: string; error?: string };
            if (!res.ok) throw new Error(data.error ?? "Yükleme başarısız.");
            return data.url!;
          })
        );
        onChange([...values, ...urls]);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Bazı görseller yüklenemedi.");
      } finally {
        setUploading(false);
      }
    },
    [storagePath, values, onChange]
  );

  function remove(url: string) {
    onChange(values.filter((u) => u !== url));
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  return (
    <div className="space-y-3">
      <div
        {...getRootProps()}
        className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
      >
        <input {...getInputProps()} />
        <p className="text-sm text-gray-500">
          {isDragActive ? "Dosyaları bırakın..." : uploading ? "Yükleniyor..." : "Sürükleyin veya tıklayın (çoklu görsel)"}
        </p>
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
      {values.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {values.map((url) => (
            <div key={url} className="relative h-20 w-20 rounded overflow-hidden border group">
              <Image src={url} alt="" fill className="object-cover" />
              <button
                type="button"
                onClick={() => remove(url)}
                className="absolute top-0.5 right-0.5 bg-black/60 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={10} className="text-white" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
