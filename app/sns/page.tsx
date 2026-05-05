"use client";

import { useState } from "react";
import { Camera, Sparkles, Copy, Check, AlertCircle, Save } from "lucide-react";
import type { AiRouteResponse } from "@/lib/api-response";

export default function SnsPage() {
  const [form, setForm] = useState({
    projectType: "",
    styleTag: "",
    platform: "both",
    additionalContext: "",
  });
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [saveNotice, setSaveNotice] = useState("");

  const handleGenerate = async () => {
    if (!form.projectType) {
      setError("프로젝트 유형을 입력해주세요.");
      return;
    }
    setError("");
    setSaveNotice("");
    setLoading(true);
    setResult("");

    try {
      const res = await fetch("/api/ai/sns", {
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
          ? "Supabase sns_contents 테이블에 저장되었습니다."
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
    <div className="mx-auto max-w-5xl animate-slide-up">
      <div className="mb-6 sm:mb-8">
        <div className="mb-2 flex items-center gap-3">
          <div className="rounded-lg bg-pink-400/10 p-2">
            <Camera size={18} className="text-pink-400" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-text-primary sm:font-display sm:text-4xl sm:tracking-wider">
            SNS 콘텐츠
          </h1>
        </div>
        <p className="text-sm leading-6 text-text-secondary sm:ml-12">
          시공 정보 입력 → 인스타그램/블로그 게시글 자동 생성
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
        <div className="card space-y-4">
          <h2 className="text-sm font-medium text-text-secondary uppercase tracking-wider">
            시공 정보 입력
          </h2>

          <div>
            <label className="block text-xs text-text-muted mb-1.5">
              프로젝트 유형 <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              className="input"
              placeholder="예: 32평 아파트 거실/주방 모던 리모델링"
              value={form.projectType}
              onChange={(e) => setForm({ ...form, projectType: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs text-text-muted mb-1.5">
              스타일 태그
            </label>
            <input
              type="text"
              className="input"
              placeholder="예: 모던미니멀, 화이트그레이, 오픈형주방"
              value={form.styleTag}
              onChange={(e) => setForm({ ...form, styleTag: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs text-text-muted mb-2">
              게시 플랫폼
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: "instagram", label: "인스타그램" },
                { value: "blog", label: "블로그" },
                { value: "both", label: "둘 다" },
              ].map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setForm({ ...form, platform: value })}
                  className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all border ${
                    form.platform === value
                      ? "bg-pink-500/20 text-pink-400 border-pink-500/40"
                      : "bg-surface border-surface-border text-text-secondary hover:border-pink-500/30"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs text-text-muted mb-1.5">
              추가 정보
            </label>
            <textarea
              className="input min-h-[100px] resize-none"
              placeholder="예: 시공 기간 2주, 고객 만족도 높았음, 포인트는 아일랜드 식탁..."
              value={form.additionalContext}
              onChange={(e) => setForm({ ...form, additionalContext: e.target.value })}
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
                SNS 게시글 생성
              </>
            )}
          </button>
        </div>

        <div className="card flex min-h-[360px] flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-text-secondary uppercase tracking-wider">
              생성된 게시글
            </h2>
            {result && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs text-text-muted hover:text-text-primary transition-colors"
              >
                {copied ? (
                  <><Check size={12} className="text-green-400" /> 복사됨</>
                ) : (
                  <><Copy size={12} /> 전체 복사</>
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
                <Camera size={32} className="text-text-muted mx-auto mb-3" />
                <p className="text-text-muted text-sm">시공 정보를 입력하고</p>
                <p className="text-text-muted text-sm">게시글 생성을 눌러주세요</p>
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
