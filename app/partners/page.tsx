"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  Loader2,
  MapPin,
  Phone,
  Plus,
  Search,
  Star,
  Wrench,
  X,
} from "lucide-react";
import type { Partner } from "@/lib/types";
import {
  getSupabaseBrowserClient,
  isSupabaseBrowserConfigured,
} from "@/lib/supabase-browser";

const CATEGORIES = [
  "전체",
  "철거",
  "목공",
  "타일",
  "도배/도장",
  "전기",
  "설비",
  "가구",
  "조명",
  "기타",
];

const emptyForm = {
  name: "",
  category: "",
  contact: "",
  region: "",
  specialty: "",
  rating: "5",
  notes: "",
};

export default function PartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("전체");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const filtered = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return partners.filter((partner) => {
      const matchesCategory =
        category === "전체" || partner.category === category;
      const matchesSearch =
        !keyword ||
        [
          partner.name,
          partner.category,
          partner.contact,
          partner.region,
          partner.specialty,
          partner.notes,
        ]
          .filter(Boolean)
          .some((value) => value!.toLowerCase().includes(keyword));

      return matchesCategory && matchesSearch;
    });
  }, [category, partners, search]);

  const loadPartners = async () => {
    if (!isSupabaseBrowserConfigured()) {
      setLoading(false);
      setError("Supabase 환경변수가 없어 협력업체 데이터를 불러올 수 없습니다.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data, error: queryError } = await getSupabaseBrowserClient()
        .from("partners")
        .select("*")
        .order("created_at", { ascending: false });

      if (queryError) {
        throw queryError;
      }

      setPartners((data ?? []) as Partner[]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "협력업체 목록을 불러오지 못했습니다."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadPartners();
  }, []);

  const handleAdd = async () => {
    if (!form.name.trim() || !form.category.trim()) {
      setError("업체명과 분야는 필수입니다.");
      return;
    }

    if (!isSupabaseBrowserConfigured()) {
      setError("Supabase 환경변수 설정 후 업체 등록을 사용할 수 있습니다.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const payload = {
        name: form.name.trim(),
        category: form.category,
        contact: form.contact.trim() || null,
        region: form.region.trim() || null,
        specialty: form.specialty.trim() || null,
        rating: form.rating ? Number(form.rating) : null,
        notes: form.notes.trim() || null,
      };

      const { data, error: insertError } = await getSupabaseBrowserClient()
        .from("partners")
        .insert(payload)
        .select("*")
        .single();

      if (insertError) {
        throw insertError;
      }

      setPartners((current) => [data as Partner, ...current]);
      setForm(emptyForm);
      setShowForm(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "협력업체 등록에 실패했습니다."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl animate-slide-up space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-violet-400/10 p-2">
              <Wrench size={19} className="text-violet-300" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-200">
                Partner Network
              </p>
              <h1 className="mt-1 text-3xl font-semibold tracking-tight text-text-primary">
                협력업체
              </h1>
            </div>
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-text-secondary">
            공정별 파트너, 연락처, 전문분야와 평점을 정리해 현장 투입 판단을 빠르게 합니다.
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary inline-flex items-center justify-center gap-2"
        >
          <Plus size={14} />
          업체 등록
        </button>
      </header>

      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      <div className="flex flex-col gap-3 lg:flex-row">
        <div className="relative flex-1">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
          />
          <input
            type="text"
            className="input pl-9"
            placeholder="업체명, 전문분야, 지역, 연락처 검색"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
              category === item
                ? "border-violet-400/40 bg-violet-500/15 text-violet-200"
                : "border-surface-border bg-surface text-text-secondary hover:border-violet-400/30"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="card flex min-h-[260px] items-center justify-center">
          <Loader2 size={24} className="animate-spin text-brand-300" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="card flex min-h-[320px] flex-col items-center justify-center text-center">
          <Wrench size={42} className="mb-4 text-text-muted" />
          <p className="text-sm font-medium text-text-primary">
            {partners.length === 0
              ? "등록된 협력업체가 없습니다."
              : "검색 결과가 없습니다."}
          </p>
          <p className="mt-2 text-xs text-text-muted">
            자주 쓰는 업체부터 등록하면 견적과 실행 단계가 빨라집니다.
          </p>
          {partners.length === 0 && (
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary mt-5 inline-flex items-center gap-2"
            >
              <Plus size={14} />
              첫 업체 등록
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {filtered.map((partner) => (
            <article
              key={partner.id}
              className="card transition hover:border-violet-400/30"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-sm font-semibold text-text-primary">
                      {partner.name}
                    </h2>
                    <span className="badge bg-violet-500/15 text-violet-200">
                      {partner.category}
                    </span>
                  </div>
                  {partner.specialty && (
                    <p className="mt-2 text-xs leading-5 text-text-secondary">
                      {partner.specialty}
                    </p>
                  )}
                </div>
                {partner.rating && (
                  <div className="flex shrink-0 items-center gap-1 rounded-lg bg-amber-400/10 px-2.5 py-1.5">
                    <Star size={13} className="fill-amber-300 text-amber-300" />
                    <span className="font-mono text-xs text-amber-200">
                      {partner.rating}.0
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-text-muted">
                {partner.contact && (
                  <span className="inline-flex items-center gap-1.5 font-mono">
                    <Phone size={11} />
                    {partner.contact}
                  </span>
                )}
                {partner.region && (
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={11} />
                    {partner.region}
                  </span>
                )}
              </div>

              {partner.notes && (
                <p className="mt-4 border-t border-surface-border pt-3 text-xs leading-5 text-text-muted">
                  {partner.notes}
                </p>
              )}
            </article>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-lg rounded-lg border border-surface-border bg-surface-card p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-text-primary">
                  협력업체 등록
                </h2>
                <p className="mt-1 text-xs text-text-muted">
                  공정과 전문분야를 분리해 검색 정확도를 높입니다.
                </p>
              </div>
              <button
                onClick={() => setShowForm(false)}
                className="rounded-md p-1 text-text-muted hover:bg-surface-hover hover:text-text-primary"
                aria-label="닫기"
              >
                <X size={17} />
              </button>
            </div>

            <div className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="text-xs text-text-muted">
                  업체명 <span className="text-red-300">*</span>
                  <input
                    className="input mt-1.5"
                    value={form.name}
                    onChange={(event) =>
                      setForm({ ...form, name: event.target.value })
                    }
                    placeholder="홍길동 타일"
                  />
                </label>
                <label className="text-xs text-text-muted">
                  분야 <span className="text-red-300">*</span>
                  <select
                    className="input mt-1.5"
                    value={form.category}
                    onChange={(event) =>
                      setForm({ ...form, category: event.target.value })
                    }
                  >
                    <option value="">선택</option>
                    {CATEGORIES.filter((item) => item !== "전체").map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="text-xs text-text-muted">
                  연락처
                  <input
                    className="input mt-1.5"
                    value={form.contact}
                    onChange={(event) =>
                      setForm({ ...form, contact: event.target.value })
                    }
                    placeholder="010-0000-0000"
                  />
                </label>
                <label className="text-xs text-text-muted">
                  활동 지역
                  <input
                    className="input mt-1.5"
                    value={form.region}
                    onChange={(event) =>
                      setForm({ ...form, region: event.target.value })
                    }
                    placeholder="서울, 경기 남부"
                  />
                </label>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="text-xs text-text-muted">
                  전문분야
                  <input
                    className="input mt-1.5"
                    value={form.specialty}
                    onChange={(event) =>
                      setForm({ ...form, specialty: event.target.value })
                    }
                    placeholder="대형타일, 헤링본, 욕실"
                  />
                </label>
                <label className="text-xs text-text-muted">
                  평점
                  <select
                    className="input mt-1.5"
                    value={form.rating}
                    onChange={(event) =>
                      setForm({ ...form, rating: event.target.value })
                    }
                  >
                    {[5, 4, 3, 2, 1].map((value) => (
                      <option key={value} value={value}>
                        {value}점
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <label className="block text-xs text-text-muted">
                메모
                <textarea
                  className="input mt-1.5 min-h-[76px] resize-none"
                  value={form.notes}
                  onChange={(event) =>
                    setForm({ ...form, notes: event.target.value })
                  }
                  placeholder="단가, 응답 속도, 현장 태도, 주의사항"
                />
              </label>
            </div>

            <div className="mt-5 flex gap-2">
              <button
                onClick={() => setShowForm(false)}
                className="btn-secondary flex-1"
              >
                취소
              </button>
              <button
                onClick={() => void handleAdd()}
                disabled={saving}
                className="btn-primary flex flex-1 items-center justify-center gap-2"
              >
                {saving && <Loader2 size={14} className="animate-spin" />}
                등록
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
