"use client";

import { useState } from "react";
import { FileText, Sparkles, Copy, Check, AlertCircle, Save } from "lucide-react";
import type { AiRouteResponse } from "@/lib/api-response";

export default function EstimatePage() {
  const [form, setForm] = useState({
    projectType: "",
    spaceSize: "",
    requirements: "",
    budget: "",
    stylePreference: "",
  });
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [saveNotice, setSaveNotice] = useState("");

  const handleGenerate = async () => {
    if (!form.projectType || !form.requirements) {
      setError("프로젝트 유형과 요구사항을 입력해주세요.");
      return;
    }
    setError("");
    setSaveNotice("");
    setLoading(true);
    setResult("");

    try {
      const res = await fetch("/api/ai/estimate", {
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
          ? "Supabase estimates 테이블에 저장되었습니다."
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
          <div className="p-2 bg-blue-400/10 rounded-lg">
            <FileText size={18} className="text-blue-400" />
          </div>
          <h1 className="font-display text-4xl tracking-wider text-text-primary">
            견적 자동화
          </h1>
        </div>
        <p className="text-text-secondary text-sm ml-12">
          고객 요구사항 입력 → Claude AI 견적서 초안 자동 생성
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* 입력 폼 */}
        <div className="card space-y-4">
          <h2 className="text-sm font-medium text-text-secondary uppercase tracking-wider">
            프로젝트 정보 입력
          </h2>

          <div>
            <label className="block text-xs text-text-muted mb-1.5">
              프로젝트 유형 <span className="text-red-400">*</span>
            </label>
            <select
              className="input"
              value={form.projectType}
              onChange={(e) => setForm({ ...form, projectType: e.target.value })}
            >
              <option value="">선택하세요</option>
              <option value="아파트 전체 리모델링">아파트 전체 리모델링</option>
              <option value="주방 리모델링">주방 리모델링</option>
              <option value="욕실 리모델링">욕실 리모델링</option>
              <option value="거실/침실 인테리어">거실/침실 인테리어</option>
              <option value="상업공간 인테리어">상업공간 인테리어</option>
              <option value="사무실 인테리어">사무실 인테리어</option>
              <option value="부분 시공">부분 시공</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-text-muted mb-1.5">
                공간 크기 (평)
              </label>
              <input
                type="number"
                className="input"
                placeholder="예: 25"
                value={form.spaceSize}
                onChange={(e) => setForm({ ...form, spaceSize: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs text-text-muted mb-1.5">
                예산 범위 (만원)
              </label>
              <input
                type="number"
                className="input"
                placeholder="예: 2000"
                value={form.budget}
                onChange={(e) => setForm({ ...form, budget: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-text-muted mb-1.5">
              스타일 선호
            </label>
            <input
              type="text"
              className="input"
              placeholder="예: 모던 미니멀, 북유럽, 내추럴"
              value={form.stylePreference}
              onChange={(e) => setForm({ ...form, stylePreference: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs text-text-muted mb-1.5">
              요구사항 <span className="text-red-400">*</span>
            </label>
            <textarea
              className="input min-h-[140px] resize-none"
              placeholder="고객의 요구사항을 자유롭게 입력하세요.
예: 주방 전체 교체, 싱크대 ㄱ자형, 아일랜드 추가, 바닥 헤링본..."
              value={form.requirements}
              onChange={(e) => setForm({ ...form, requirements: e.target.value })}
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
                AI 견적서 생성
              </>
            )}
          </button>
        </div>

        {/* 결과 */}
        <div className="card flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-text-secondary uppercase tracking-wider">
              AI 견적서 초안
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
                <Sparkles size={32} className="text-text-muted mx-auto mb-3" />
                <p className="text-text-muted text-sm">
                  좌측에 정보를 입력하고
                </p>
                <p className="text-text-muted text-sm">
                  AI 견적서 생성 버튼을 누르세요
                </p>
              </div>
            </div>
          )}

          {result && (
            <p className="text-xs text-text-muted mt-3 pt-3 border-t border-surface-border">
              ※ AI 생성 초안입니다. 실제 견적 전 현장 확인 후 조정하세요.
            </p>
          )}
          {saveNotice && (
            <p className="text-xs text-emerald-200 mt-2 flex items-center gap-2">
              <Save size={13} />
              {saveNotice}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
