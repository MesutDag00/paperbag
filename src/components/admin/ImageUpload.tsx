"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

interface Props {
  storagePath: string;
  value: string;
  onChange: (url: string) => void;
}

export function ImageUpload({ storagePath, value, onChange }: Props) {
  const [progress, setProgress] = useState(false);
  const [error, setError] = useState("");

  const onDrop = useCallback(
    async (files: File[]) => {
      const file = files[0];
      if (!file) return;
      setError("");
      setProgress(true);

      try {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("folder", storagePath);

        const res = await fetch("/api/upload", { method: "POST", body: fd });
        const data = await res.json() as { url?: string; error?: string };
        if (!res.ok) throw new Error(data.error ?? "Yükleme başarısız.");
        onChange(data.url!);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Yükleme başarısız.");
      } finally {
        setProgress(false);
      }
    },
    [storagePath, onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  return (
    <div className="space-y-2">
      <div
        {...getRootProps()}
        className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
      >
        <input {...getInputProps()} />
        <p className="text-sm text-gray-500">
          {isDragActive ? "Dosyayı bırakın..." : progress ? "Yükleniyor..." : "Sürükleyin veya tıklayın"}
        </p>
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
      {value && (
        <div className="relative h-32 w-32 rounded overflow-hidden border">
          <Image src={value} alt="Önizleme" fill className="object-cover" />
        </div>
      )}
    </div>
  );
}
