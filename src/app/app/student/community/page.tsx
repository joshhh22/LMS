"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/auth/auth-context";
import { db } from "@/lib/store";
import {
  MessageSquare,
  Bell,
  Send,
  Pin,
  Clock,
  User,
  PlusCircle,
  CheckCircle2,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { formatDate } from "@/lib/utils";

export default function StudentCommunityPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"discussions" | "announcements">("discussions");
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [expandedDiscId, setExpandedDiscId] = useState<string | null>(null);

  const announcements = db.getAnnouncements();
  const discussions = db.getDiscussions();
  const enrolledClasses = db.getClasses(user || undefined);

  const handleCreateDiscussion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newBody.trim() || !enrolledClasses[0]) return;
    setIsPosting(true);
    try {
      db.createDiscussion(enrolledClasses[0].id, newTitle, newBody);
      setNewTitle("");
      setNewBody("");
    } finally {
      setIsPosting(false);
    }
  };

  const handleSendReply = (discussionId: string) => {
    const text = replyText[discussionId];
    if (!text || !text.trim()) return;

    db.replyDiscussion(discussionId, text);
    setReplyText((prev) => ({ ...prev, [discussionId]: "" }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Forum & Komunitas Kelas
          </h1>
          <p className="text-sm text-slate-500">
            Papan pengumuman resmi dan ruang diskusi akademik antar siswa dan guru.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex rounded-lg bg-slate-100 p-1 text-xs">
          <button
            onClick={() => setActiveTab("discussions")}
            className={`rounded-md px-3.5 py-1.5 font-semibold transition-colors ${
              activeTab === "discussions"
                ? "bg-white text-slate-900 shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Diskusi Belajar ({discussions.length})
          </button>
          <button
            onClick={() => setActiveTab("announcements")}
            className={`rounded-md px-3.5 py-1.5 font-semibold transition-colors ${
              activeTab === "announcements"
                ? "bg-white text-slate-900 shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Pengumuman ({announcements.length})
          </button>
        </div>
      </div>

      {activeTab === "announcements" ? (
        /* Announcements list */
        <div className="space-y-4">
          {announcements.map((ann) => (
            <Card key={ann.id} className={ann.is_pinned ? "border-indigo-300 shadow-xs" : ""}>
              <CardContent className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {ann.is_pinned && (
                      <Badge variant="indigo" className="text-[10px] flex items-center gap-1">
                        <Pin className="h-3 w-3" /> Disematkan
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-[10px]">
                      {ann.class ? ann.class.name : "Platform Sekolah"}
                    </Badge>
                  </div>
                  <span className="text-xs text-slate-400">{formatDate(ann.published_at)}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900">{ann.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {ann.body}
                </p>
                <div className="pt-2 text-xs text-slate-400">
                  Diumumkan oleh: <strong>{ann.author?.full_name || "Admin Sekolah"}</strong>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Discussions list */
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Discussion Threads (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            {discussions.map((disc) => {
              const isExpanded = expandedDiscId === disc.id;
              const replies = disc.replies || [];
              return (
                <Card key={disc.id} className="hover:border-slate-300 transition-colors">
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-700">
                          {disc.author?.full_name}
                        </span>
                        <span>• {disc.class?.name}</span>
                      </div>
                      <span>{formatDate(disc.created_at)}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900">{disc.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{disc.body}</p>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <button
                        onClick={() => setExpandedDiscId(isExpanded ? null : disc.id)}
                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5"
                      >
                        <MessageSquare className="h-3.5 w-3.5" />
                        {replies.length} Balasan Diskusi
                      </button>
                    </div>

                    {/* Replies Panel */}
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                        <div className="space-y-2">
                          {replies.map((reply) => (
                            <div
                              key={reply.id}
                              className="rounded-xl bg-slate-50 p-3.5 text-xs space-y-1 border border-slate-100"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-slate-800">
                                  {reply.author?.full_name}
                                </span>
                                <span className="text-[10px] text-slate-400">
                                  {formatDate(reply.created_at)}
                                </span>
                              </div>
                              <p className="text-slate-600 leading-relaxed">{reply.body}</p>
                            </div>
                          ))}
                        </div>

                        {/* Reply Form */}
                        <div className="flex gap-2 pt-2">
                          <Input
                            placeholder="Tulis balasan atau penjelasan Anda..."
                            value={replyText[disc.id] || ""}
                            onChange={(e) =>
                              setReplyText((prev) => ({ ...prev, [disc.id]: e.target.value }))
                            }
                            className="text-xs"
                          />
                          <Button
                            onClick={() => handleSendReply(disc.id)}
                            size="sm"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs shrink-0"
                          >
                            <Send className="h-3.5 w-3.5 mr-1" /> Balas
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* New Discussion Form (1 Col) */}
          <div>
            <Card>
              <CardHeader className="pb-3 border-b border-slate-100">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <PlusCircle className="h-4 w-4 text-indigo-600" />
                  Buat Topik Diskusi Baru
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <form onSubmit={handleCreateDiscussion} className="space-y-4">
                  <div>
                    <Label htmlFor="discTitle" className="text-xs">Judul Pertanyaan / Topik</Label>
                    <Input
                      id="discTitle"
                      placeholder="Contoh: Tips mengerjakan soal akar..."
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="mt-1 text-xs"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="discBody" className="text-xs">Uraian / Pertanyaan Lengkap</Label>
                    <Textarea
                      id="discBody"
                      placeholder="Jelaskan pertanyaan Anda dengan rinci agar teman sekelas dan guru dapat membantu..."
                      value={newBody}
                      onChange={(e) => setNewBody(e.target.value)}
                      className="mt-1 min-h-[100px] text-xs"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isPosting}
                    size="sm"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs"
                  >
                    {isPosting ? "Memposting..." : "Publikasikan Topik Diskusi"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
