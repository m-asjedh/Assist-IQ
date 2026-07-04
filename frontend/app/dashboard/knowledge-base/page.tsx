"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, FileText, MoreVertical, Trash2, Eye, RefreshCw, CloudUpload, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge, SectionHeader, EmptyState, cardClass, primaryBtnClass } from "@/components/shared";
import { documents } from "@/lib/data";

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const typeColors: Record<string, string> = {
  PDF: "bg-red-50 text-red-600",
  DOCX: "bg-blue-50 text-blue-600",
  TXT: "bg-slate-100 text-slate-600",
};

export default function KnowledgeBasePage() {
  const [dragging, setDragging] = useState(false);
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  return (
    <motion.div initial="hidden" animate="visible" variants={stagger}>
      <motion.div variants={fadeUp}>
        <SectionHeader
          title="Knowledge Base"
          description="Upload documents to train your chatbot. Supported formats: PDF, DOCX, TXT."
          action={<Button className={primaryBtnClass}><Upload className="w-4 h-4" /> Upload File</Button>}
        />
      </motion.div>

      {/* Upload Area */}
      <motion.div variants={fadeUp} className="mb-6">
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); }}
          className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all cursor-pointer ${
            dragging ? "border-indigo-400 bg-indigo-50" : "border-slate-200 bg-slate-50 hover:border-indigo-300 hover:bg-indigo-50/30"
          }`}
        >
          <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center mx-auto mb-4">
            <CloudUpload className="w-7 h-7 text-indigo-600" />
          </div>
          <h3 className="text-base font-semibold text-slate-900 mb-1">Drop files here to upload</h3>
          <p className="text-sm text-slate-500 mb-4">or click to browse from your computer</p>
          <Button variant="outline" className="font-semibold rounded-xl h-auto px-4 py-2">
            <Upload className="w-4 h-4" /> Browse Files
          </Button>
          <p className="text-xs text-slate-400 mt-3">Supports PDF, DOCX, TXT up to 50MB</p>
        </div>
      </motion.div>

      {/* Stats Row */}
      <motion.div variants={fadeUp} className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Documents", value: "4" },
          { label: "Trained", value: "3" },
          { label: "Processing", value: "1" },
        ].map((item) => (
          <Card key={item.label} className={`${cardClass} p-4 text-center`}>
            <p className="text-2xl font-bold text-slate-900">{item.value}</p>
            <p className="text-xs text-slate-400 mt-0.5">{item.label}</p>
          </Card>
        ))}
      </motion.div>

      {/* Document Table */}
      <motion.div variants={fadeUp}>
        <Card className={cardClass}>
          <div className="px-5 py-4 border-b border-slate-50">
            <h3 className="font-semibold text-slate-900">Uploaded Documents</h3>
          </div>
          {documents.length === 0 ? (
            <EmptyState
              icon={<BookOpen className="w-7 h-7" />}
              title="No documents yet"
              description="Upload your first document to start training your chatbot."
              action={<Button className={primaryBtnClass}><Upload className="w-4 h-4" /> Upload Document</Button>}
            />
          ) : (
            <>
              {/* Table Header */}
              <div className="hidden sm:grid grid-cols-12 gap-4 px-5 py-2.5 text-xs font-semibold text-slate-400 uppercase tracking-wide border-b border-slate-50">
                <div className="col-span-5">File Name</div>
                <div className="col-span-2">Type</div>
                <div className="col-span-2">Size</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-1" />
              </div>
              <div className="divide-y divide-slate-50">
                {documents.map((doc) => (
                  <div key={doc.id} className="grid grid-cols-12 gap-4 px-5 py-4 items-center hover:bg-slate-50 transition-colors">
                    <div className="col-span-10 sm:col-span-5 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-4 h-4 text-slate-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{doc.name}</p>
                        <p className="text-xs text-slate-400">{doc.uploaded}</p>
                      </div>
                    </div>
                    <div className="hidden sm:block col-span-2">
                      <span className={`text-xs font-bold px-2 py-1 rounded-lg ${typeColors[doc.type] ?? "bg-slate-100 text-slate-600"}`}>
                        {doc.type}
                      </span>
                    </div>
                    <div className="hidden sm:block col-span-2">
                      <span className="text-sm text-slate-600">{doc.size}</span>
                    </div>
                    <div className="hidden sm:block col-span-2">
                      <StatusBadge status={doc.status} />
                    </div>
                    <div className="col-span-2 sm:col-span-1 flex justify-end relative">
                      <button
                        onClick={() => setOpenMenu(openMenu === doc.id ? null : doc.id)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-400"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      {openMenu === doc.id && (
                        <div className="absolute right-0 top-8 w-40 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-10">
                          <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
                            <Eye className="w-3.5 h-3.5" /> View Details
                          </button>
                          <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
                            <RefreshCw className="w-3.5 h-3.5" /> Retrain
                          </button>
                          <button onClick={() => setOpenMenu(null)} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50">
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </Card>
      </motion.div>
    </motion.div>
  );
}
