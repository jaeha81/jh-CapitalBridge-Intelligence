"use client";

import { useState } from "react";
import { Lightbulb, Sparkles, Copy, Check, AlertCircle, Save } from "lucide-react";
import type { AiRouteResponse } from "@/lib/api-response";

const styleOptions = [
  "모던 미니멀", "북유럽 스칸디나비안", "내추럴 우드",
  "클래식 럭셔리", "인더스트리얼", "빈티지 레트로",
  "한국 전통 모던", "지중해풍", "재팬디", "보헤미안",
];

const roomOptions = [
  "거실", "주방", "안방", "아이방", "서재",
  "욕실", "현관", "드레스룸", "다이닝룸", "전체",
];

export default function ProposalPage() {
  const [form, setForm] = useState({
    styleKeyword: "",
    roomType: "",
    budgetRange: "",
    additionalNotes: "",
  });
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [saveNotice, setSaveNotice] = useState("");

  const handleGenerate = async () => {
    if (!form.styleKeyword || !form.roomType) {
      setError("스타일과 공간 유형을 선택해주세요.");
      return;
    }
    setError("");
    setSaveNotice("");
    setLoading(true);
    setResult("");

    try {
      const res = await fetch("/api/ai/proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as Partial<AiRouteResponse> & {
        error?: string;
      };
      if (!res.ok) throw new Error(data.error);
      setResult(data.result ?? "");
      setSaveNotice(
        data.saved
          ? "Supabase proposals 테이블에 저장되었습니다."
          : data.warning ?? "AI 결과가 생성되었지만 저장 상태를 확인하지 못했습니다."
      );
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto animate-slide-up">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-yellow-400/10 rounded-lg">
            <Lightbulb size={18} className="text-yellow-400" />
          </div>
          <h1 className="font-display text-4xl tracking-wider text-text-primary">
            제안서 생성
          </h1>
        </div>
        <p className="text-text-secondary text-sm ml-12">
          스타일 키워드 입력 → AI 자재/가구 제안서 자동 생성
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="card space-y-5">
          <h2 className="text-sm font-medium text-text-secondary uppercase tracking-wider">
            스타일 정보 입력
          </h2>

          <div>
            <label className="block text-xs text-text-muted mb-2">
              스타일 선택 <span className="text-red-400">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {styleOptions.map((style) => (
                <button
                  key={style}
                  onClick={() => setForm({ ...form, styleKeyword: style })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    form.styleKeyword === style
                      ? "bg-brand-600 text-white"
                      : "bg-surface border border-surface-border text-text-secondary hover:border-brand-600/50"
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
            <input
              type="text"
              className="input mt-2"
              placeholder="직접 입력 가능"
              value={form.styleKeyword}
              onChange={(e) => setForm({ ...form, styleKeyword: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs text-text-muted mb-2">
              공간 유형 <span className="text-red-400">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {roomOptions.map((room) => (
                <button
                  key={room}
                  onClick={() => setForm({ ...form, roomType: room })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    form.roomType === room
                      ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                      : "bg-surface border border-surface-border text-text-secondary hover:border-yellow-500/30"
                  }`}
                >
                  {room}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs text-text-muted mb-1.5">
              예산 범위
            </label>
            <select
              className="input"
              value={form.budgetRange}
              onChange={(e) => setForm({ ...form, budgetRange: e.target.value })}
            >
              <option value="">선택 안함</option>
              <option value="500만원 이하">500만원 이하</option>
              <option value="500~1,000만원">500~1,000만원</option>
              <option value="1,000~2,000만원">1,000~2,000만원</option>
              <option value="2,000~3,000만원">2,000~3,000만원</option>
              <option value="3,000만원 이상">3,000만원 이상</option>
            </select>
          </div>

          <div>
            <label className="block text-xs text-text-muted mb-1.5">
              추가 요청사항
            </label>
            <textarea
              className="input min-h-[80px] resize-none"
              placeholder="예: 반려동물 있음, 아이 있어서 안전한 소재 선호..."
              value={form.additionalNotes}
              onChange={(e) => setForm({ ...form, additionalNotes: e.target.value })}
            />
          </div>

          {error && (
            <p className="text-red-300 text-xs bg-red-400/10 rounded-lg px-3 py-2 flex items-center gap-2">
              <AlertCircle size={13} />
              {error}
            </p>
          )}

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                AI 생성 중...
              </>
            ) : (
              <>
                <Sparkles size={14} />
                AI 제안서 생성
              </>
            )}
          </button>
        </div>

        <div className="card flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-text-secondary uppercase tracking-wider">
              AI 자재/가구 제안서
            </h2>
            {result && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs text-text-muted hover:text-text-primary transition-colors"
              >
                {copied ? (
                  <><Check size={12} className="text-green-400" /> 복사됨</>
                ) : (
                  <><Copy size={12} /> 복사</>
                )}
              </button>
            )}
          </div>

          {result ? (
            <div className="flex-1 bg-surface rounded-lg p-4 overflow-y-auto">
              <pre className="text-sm text-text-primary whitespace-pre-wrap font-sans leading-relaxed">
                {result}
              </pre>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Lightbulb size={32} className="text-text-muted mx-auto mb-3" />
                <p className="text-text-muted text-sm">스타일과 공간을 선택하고</p>
                <p className="text-text-muted text-sm">AI 제안서 생성을 눌러주세요</p>
              </div>
            </div>
          )}
          {saveNotice && (
            <p className="text-xs text-emerald-200 mt-3 pt-3 border-t border-surface-border flex items-center gap-2">
              <Save size={13} />
              {saveNotice}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
