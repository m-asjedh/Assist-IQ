"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import {
  Panel,
  SectionHeader,
  Badge,
  ChatBubble,
} from "@/src/components/dashboard/primitives";
import { api } from "@/lib/api";
import type { Conversation, ConversationStatus } from "@/lib/api/types";
import { formatRelativeTime, statusBadgeColor } from "@/lib/format";
import { ApiError } from "@/lib/api/client";
import { NeoButton } from "@/src/components/landingpage/Brutalism";

const filters = ["All", "Resolved", "Open", "Waiting"] as const;

export default function ConversationsPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [detail, setDetail] = useState<Conversation | null>(null);
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const list = await api.listConversations();
        if (cancelled) return;
        setConversations(list);
        if (list[0]) setActiveId(list[0].id);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof ApiError
              ? err.message
              : "Failed to load conversations",
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

  useEffect(() => {
    if (!activeId) {
      setDetail(null);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const full = await api.getConversation(activeId);
        if (!cancelled) setDetail(full);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof ApiError
              ? err.message
              : "Failed to load conversation",
          );
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [activeId]);

  const list = useMemo(() => {
    return conversations.filter((c) => {
      const statusOk =
        filter === "All" || c.status === filter.toUpperCase();
      const q = search.trim().toLowerCase();
      const searchOk =
        !q ||
        (c.visitorName ?? "").toLowerCase().includes(q) ||
        (c.messages?.[0]?.content ?? "").toLowerCase().includes(q);
      return statusOk && searchOk;
    });
  }, [conversations, filter, search]);

  const updateStatus = async (status: ConversationStatus) => {
    if (!activeId) return;
    setUpdating(true);
    setError("");
    try {
      const updated = await api.updateConversationStatus(activeId, status);
      setConversations((prev) =>
        prev.map((c) => (c.id === activeId ? { ...c, status: updated.status } : c)),
      );
      setDetail((d) => (d ? { ...d, status: updated.status } : d));
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto font-black uppercase tracking-widest">
        Loading conversations...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <SectionHeader
        title="Conversations"
        subtitle="Every chat your bot has handled."
      />

      {error && (
        <div className="mb-6 border-4 border-black rounded-xl bg-orange-200 px-4 py-3 font-bold">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Panel className="lg:col-span-2 p-4 h-fit">
          <div className="flex items-center gap-2 border-4 border-black rounded-full px-4 py-2 bg-neutral-50 mb-4">
            <Search size={16} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search chats..."
              className="bg-transparent outline-none font-bold text-sm w-full placeholder:text-black/40"
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`border-2 border-black rounded-full px-3 py-1 text-xs font-black uppercase transition-colors ${
                  filter === f ? "bg-[#ccff00]" : "bg-white hover:bg-neutral-100"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            {list.length === 0 ? (
              <p className="font-bold text-black/50 px-2 py-4">
                No conversations found.
              </p>
            ) : (
              list.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveId(c.id)}
                  className={`w-full text-left border-4 rounded-xl p-3 transition-all ${
                    c.id === activeId
                      ? "border-black bg-[#ccff00] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                      : "border-black/20 hover:border-black bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-black text-sm">
                      {c.visitorName || "Anonymous"}
                    </span>
                    <span className="text-xs font-bold text-black/40">
                      {formatRelativeTime(c.updatedAt)}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-black/60 truncate mb-2">
                    {c.messages?.[0]?.content || "No messages yet"}
                  </div>
                  <Badge color={statusBadgeColor(c.status)}>{c.status}</Badge>
                </button>
              ))
            )}
          </div>
        </Panel>

        <Panel className="lg:col-span-3 flex flex-col h-[600px]">
          {!detail ? (
            <div className="flex-1 flex items-center justify-center font-bold text-black/40">
              Select a conversation
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between px-6 py-4 border-b-4 border-black gap-3 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-black rounded-full" />
                  <div>
                    <div className="font-black">
                      {detail.visitorName || "Anonymous"}
                    </div>
                    <div className="text-xs font-bold text-black/50">
                      {formatRelativeTime(detail.updatedAt)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge color={statusBadgeColor(detail.status)}>
                    {detail.status}
                  </Badge>
                  <NeoButton
                    variant="white"
                    className="text-xs py-2 px-4"
                    disabled={updating}
                    onClick={() => void updateStatus("RESOLVED")}
                  >
                    Resolve
                  </NeoButton>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {(detail.messages ?? []).map((m) => (
                  <ChatBubble
                    key={m.id}
                    from={m.role === "USER" ? "user" : "bot"}
                  >
                    {m.content}
                  </ChatBubble>
                ))}
              </div>
            </>
          )}
        </Panel>
      </div>
    </div>
  );
}
