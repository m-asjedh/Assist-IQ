"use client";

import React, { useState } from "react";
import {
  UploadCloud,
  FileText,
  MoreVertical,
  Trash2,
  Download,
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

const docs = [
  { name: "Company FAQ.pdf", type: "PDF", date: "Jul 6, 2026", status: "Trained", color: "green" },
  { name: "Refund Policy.docx", type: "DOCX", date: "Jul 5, 2026", status: "Trained", color: "green" },
  { name: "Product Guide.pdf", type: "PDF", date: "Jul 4, 2026", status: "Processing", color: "orange" },
  { name: "Support Terms.txt", type: "TXT", date: "Jul 2, 2026", status: "Trained", color: "green" },
];

export default function KnowledgeBasePage() {
  const [menu, setMenu] = useState<number | null>(null);

  return (
    <div className="max-w-7xl mx-auto">
      <SectionHeader
        title="Knowledge Base"
        subtitle="Upload the docs your chatbot learns from."
        action={
          <NeoButton variant="lime" className="text-sm">
            <Plus size={18} strokeWidth={3} /> Add Document
          </NeoButton>
        }
      />

      <Panel color="bg-purple-400" className="p-2 mb-10">
        <div className="border-4 border-dashed border-black rounded-xl bg-white/60 py-14 px-6 flex flex-col items-center text-center">
          <div className="border-4 border-black rounded-2xl p-5 bg-[#ccff00] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mb-5">
            <UploadCloud size={40} />
          </div>
          <h3 className="text-2xl font-black uppercase tracking-tight mb-1">
            Drag &amp; Drop Files
          </h3>
          <p className="font-bold text-black/60 mb-6">
            PDF, DOCX, TXT up to 20MB each
          </p>
          <NeoButton variant="black" className="text-sm">
            Browse Files
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
        <Table head={["Name", "Type", "Uploaded", "Status", ""]}>
          {docs.map((d, i) => (
            <Tr key={i}>
              <Td>
                <div className="flex items-center gap-3">
                  <div className="border-2 border-black rounded-lg p-2 bg-neutral-50">
                    <FileText size={16} />
                  </div>
                  {d.name}
                </div>
              </Td>
              <Td>
                <Badge color="gray">{d.type}</Badge>
              </Td>
              <Td className="whitespace-nowrap text-black/60">{d.date}</Td>
              <Td>
                <Badge color={d.color}>{d.status}</Badge>
              </Td>
              <Td className="text-right relative">
                <button
                  onClick={() => setMenu(menu === i ? null : i)}
                  className="border-2 border-black rounded-lg p-1 bg-white hover:bg-neutral-100"
                  aria-label="Actions"
                >
                  <MoreVertical size={16} />
                </button>
                {menu === i && (
                  <div className="absolute right-4 mt-2 w-44 bg-white border-4 border-black rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-2 z-20 text-left">
                    <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-100 font-bold text-sm">
                      <Download size={15} /> Download
                    </button>
                    <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-100 font-bold text-sm">
                      <RefreshCw size={15} /> Re-train
                    </button>
                    <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-orange-100 font-bold text-sm text-red-600">
                      <Trash2 size={15} /> Delete
                    </button>
                  </div>
                )}
              </Td>
            </Tr>
          ))}
        </Table>
      </Panel>
    </div>
  );
}
