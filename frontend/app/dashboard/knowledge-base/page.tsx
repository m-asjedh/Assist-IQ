"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  UploadCloud,
  FileText,
  MoreVertical,
  Trash2,
  RefreshCw,
  Plus,
} from "lucide-react";
import { NeoButton } from "@/src/components/landingpage/Brutalism";
import {
  Panel,
  SectionHeader,
  Table,
  Tr,
  Td,
  Badge,
} from "@/src/components/dashboard/primitives";
import { api } from "@/lib/api";
import type { Document } from "@/lib/api/types";
import {
  documentStatusLabel,
  formatDate,
  statusBadgeColor,
} from "@/lib/format";
import { ApiError } from "@/lib/api/client";

export default function KnowledgeBasePage() {
  const [docs, setDocs] = useState<Document[]>([]);
  const [menu, setMenu] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    const list = await api.listDocuments();
    setDocs(list);
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await load();
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof ApiError ? err.message : "Failed to load documents",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleUpload = async (file: File) => {
    setError("");
    setMessage("");
    setBusy(true);
    try {
      const uploaded = await api.uploadDocument(file);
      setMessage(`Uploaded ${uploaded.originalName}. Processing...`);
      await api.processDocument(uploaded.id);
      setMessage(`${uploaded.originalName} trained successfully.`);
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Upload failed");
      try {
        await load();
      } catch {
        /* ignore */
      }
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) void handleUpload(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) void handleUpload(file);
  };

  const retrain = async (id: string) => {
    setMenu(null);
    setBusy(true);
    setError("");
    try {
      await api.processDocument(id);
      setMessage("Document re-trained.");
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Re-train failed");
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id: string) => {
    setMenu(null);
    setBusy(true);
    setError("");
    try {
      await api.deleteDocument(id);
      setMessage("Document deleted.");
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Delete failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <SectionHeader
        title="Knowledge Base"
        subtitle="Upload the docs your chatbot learns from."
        action={
          <NeoButton
            variant="lime"
            className="text-sm"
            disabled={busy}
            onClick={() => inputRef.current?.click()}
          >
            <Plus size={18} strokeWidth={3} /> Add Document
          </NeoButton>
        }
      />

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.txt,.docx,application/pdf,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="hidden"
        onChange={onFileChange}
      />

      {(error || message) && (
        <div
          className={`mb-6 border-4 border-black rounded-xl px-4 py-3 font-bold ${
            error ? "bg-orange-200" : "bg-[#ccff00]"
          }`}
        >
          {error || message}
        </div>
      )}

      <Panel color="bg-purple-400" className="p-2 mb-10">
        <div
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-4 border-dashed border-black rounded-xl bg-white/60 py-14 px-6 flex flex-col items-center text-center"
        >
          <div className="border-4 border-black rounded-2xl p-5 bg-[#ccff00] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mb-5">
            <UploadCloud size={40} />
          </div>
          <h3 className="text-2xl font-black uppercase tracking-tight mb-1">
            Drag &amp; Drop Files
          </h3>
          <p className="font-bold text-black/60 mb-6">
            PDF, DOCX, TXT up to 10MB each
          </p>
          <NeoButton
            variant="black"
            className="text-sm"
            disabled={busy}
            onClick={() => inputRef.current?.click()}
          >
            {busy ? "Working..." : "Browse Files"}
          </NeoButton>
        </div>
      </Panel>

      <Panel className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black uppercase tracking-tight">
            Your Documents
          </h2>
          <Badge color="purple">{docs.length} Files</Badge>
        </div>

        {loading ? (
          <p className="font-bold text-black/50">Loading...</p>
        ) : docs.length === 0 ? (
          <p className="font-bold text-black/50">
            No documents yet. Upload your first file above.
          </p>
        ) : (
          <Table head={["Name", "Type", "Uploaded", "Status", ""]}>
            {docs.map((d) => (
              <Tr key={d.id}>
                <Td>
                  <div className="flex items-center gap-3">
                    <div className="border-2 border-black rounded-lg p-2 bg-neutral-50">
                      <FileText size={16} />
                    </div>
                    {d.originalName}
                  </div>
                </Td>
                <Td>
                  <Badge color="gray">{d.fileType.toUpperCase()}</Badge>
                </Td>
                <Td className="whitespace-nowrap text-black/60">
                  {formatDate(d.createdAt)}
                </Td>
                <Td>
                  <Badge color={statusBadgeColor(d.status)}>
                    {documentStatusLabel(d.status)}
                  </Badge>
                </Td>
                <Td className="text-right relative">
                  <button
                    onClick={() => setMenu(menu === d.id ? null : d.id)}
                    className="border-2 border-black rounded-lg p-1 bg-white hover:bg-neutral-100"
                    aria-label="Actions"
                  >
                    <MoreVertical size={16} />
                  </button>
                  {menu === d.id && (
                    <div className="absolute right-4 mt-2 w-44 bg-white border-4 border-black rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-2 z-20 text-left">
                      <button
                        onClick={() => void retrain(d.id)}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-100 font-bold text-sm"
                      >
                        <RefreshCw size={15} /> Re-train
                      </button>
                      <button
                        onClick={() => void remove(d.id)}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-orange-100 font-bold text-sm text-red-600"
                      >
                        <Trash2 size={15} /> Delete
                      </button>
                    </div>
                  )}
                </Td>
              </Tr>
            ))}
          </Table>
        )}
      </Panel>
    </div>
  );
}
