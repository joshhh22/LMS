"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/auth/auth-context";
import { db } from "@/lib/store";
import {
  MessageSquare,
  Send,
  User,
  Clock,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/lib/utils";

export default function TeacherDiscussionsPage() {
  const { user } = useAuth();
  const discussions = db.getDiscussions();
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [expandedId, setExpandedId] = useState<string | null>(discussions[0]?.id || null);

  const handleReply = (discussionId: string) => {
    const text = replyText[discussionId];
    if (!text || !text.trim()) return;

    db.replyDiscussion(discussionId, text);
    setReplyText((prev) => ({ ...prev, [discussionId]: "" }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Forum Diskusi & Bimbingan Siswa
        </h1>
        <p className="text-sm text-slate-500">
          Tanggapi pertanyaan kesulitan belajar siswa binaan dan moderasi percakapan akademik kelas.
        </p>
      </div>

      <div className="space-y-4">
        {discussions.map((disc) => {
          const replies = disc.replies || [];
          const isExpanded = expandedId === disc.id;
          return (
            <Card key={disc.id} className="shadow-sm">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800">{disc.author?.full_name}</span>
                    <span>• {disc.class?.name}</span>
                  </div>
                  <span>{formatDate(disc.created_at)}</span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900">{disc.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{disc.body}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="text-xs font-semibold text-indigo-700 flex items-center gap-1.5">
                    <MessageSquare className="h-4 w-4" />
                    {replies.length} Tanggapan Diskusi
                  </span>
                  <Button
                    onClick={() => setExpandedId(isExpanded ? null : disc.id)}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                  >
                    {isExpanded ? "Tutup Balasan" : "Buka & Beri Jawaban"}
                  </Button>
                </div>

                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                    <div className="space-y-2">
                      {replies.map((reply) => {
                        const isTeacherReply = reply.author?.role === "teacher";
                        return (
                          <div
                            key={reply.id}
                            className={`rounded-xl p-3.5 text-xs space-y-1 border ${
                              isTeacherReply
                                ? "bg-indigo-50/70 border-indigo-200"
                                : "bg-slate-50 border-slate-100"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                                {reply.author?.full_name}
                                {isTeacherReply && (
                                  <Badge variant="indigo" className="text-[9px]">Guru Pengampu</Badge>
                                )}
                              </span>
                              <span className="text-[10px] text-slate-400">
                                {formatDate(reply.created_at)}
                              </span>
                            </div>
                            <p className="text-slate-700 leading-relaxed">{reply.body}</p>
                          </div>
                        );
                      })}
                    </div>

                    {/* Teacher Reply Input */}
                    <div className="flex gap-2 pt-2">
                      <Input
                        placeholder="Tulis penjelasan jawaban atau panduan konsep dari guru..."
                        value={replyText[disc.id] || ""}
                        onChange={(e) =>
                          setReplyText((prev) => ({ ...prev, [disc.id]: e.target.value }))
                        }
                        className="text-xs"
                      />
                      <Button
                        onClick={() => handleReply(disc.id)}
                        size="sm"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs shrink-0"
                      >
                        <Send className="h-3.5 w-3.5 mr-1" /> Kirim Bimbingan
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

