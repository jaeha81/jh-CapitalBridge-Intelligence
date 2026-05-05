"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  Loader2,
  Mail,
  Phone,
  Plus,
  Search,
  Users,
  X,
} from "lucide-react";
import type { Customer } from "@/lib/types";

const STATUS_MAP = {
  lead: { label: "상담 대기", color: "bg-amber-500/15 text-amber-300" },
  active: { label: "진행 중", color: "bg-emerald-500/15 text-emerald-300" },
  completed: { label: "완료", color: "bg-sky-500/15 text-sky-300" },
  hold: { label: "보류", color: "bg-zinc-500/15 text-zinc-300" },
} satisfies Record<Customer["status"], { label: string; color: string }>;

const emptyForm = {
  name: "",
  phone: "",
  email: "",
  style_preference: "",
  budget: "",
  status: "lead" as Customer["status"],
  notes: "",
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const filtered = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) {
      return customers;
    }

    return customers.filter((customer) =>
      [
        customer.name,
        customer.phone,
        customer.email,
        customer.style_preference,
        customer.notes,
      ]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(keyword))
    );
  }, [customers, search]);

  const loadCustomers = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/customers", { cache: "no-store" });
      const data = (await response.json()) as {
        customers?: Customer[];
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error);
      }

      setCustomers(data.customers ?? []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "고객 목록을 불러오지 못했습니다."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadCustomers();
  }, []);

  const handleAdd = async () => {
    if (!form.name.trim() || !form.phone.trim()) {
      setError("이름과 연락처는 필수입니다.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const payload = {
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim() || null,
        style_preference: form.style_preference.trim() || null,
        budget: form.budget ? Number(form.budget) : null,
        status: form.status,
        notes: form.notes.trim() || null,
      };

      const response = await fetch("/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as {
        customer?: Customer;
        error?: string;
      };

      if (!response.ok || !data.customer) {
        throw new Error(data.error ?? "고객 등록에 실패했습니다.");
      }

      setCustomers((current) => [data.customer!, ...current]);
      setForm(emptyForm);
      setShowForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "고객 등록에 실패했습니다.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl animate-slide-up space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-emerald-400/10 p-2">
              <Users size={19} className="text-emerald-300" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200">
                Customer CRM
              </p>
              <h1 className="mt-1 text-3xl font-semibold tracking-tight text-text-primary">
                고객 관리
              </h1>
            </div>
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-text-secondary">
            상담 대기부터 완료 고객까지 상태, 예산, 선호 스타일을 한 번에 확인합니다.
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary inline-flex items-center justify-center gap-2"
        >
          <Plus size={14} />
          고객 등록
        </button>
      </header>

      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      <div className="relative">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
        />
        <input
          type="text"
          className="input pl-9"
          placeholder="이름, 연락처, 이메일, 스타일로 검색"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      {loading ? (
        <div className="card flex min-h-[260px] items-center justify-center">
          <Loader2 size={24} className="animate-spin text-brand-300" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="card flex min-h-[320px] flex-col items-center justify-center text-center">
          <Users size={42} className="mb-4 text-text-muted" />
          <p className="text-sm font-medium text-text-primary">
            {customers.length === 0
              ? "등록된 고객이 없습니다."
              : "검색 결과가 없습니다."}
          </p>
          <p className="mt-2 text-xs text-text-muted">
            첫 상담 고객을 등록하면 대시보드 통계에도 반영됩니다.
          </p>
          {customers.length === 0 && (
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary mt-5 inline-flex items-center gap-2"
            >
              <Plus size={14} />
              첫 고객 등록
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-3">
          {filtered.map((customer) => (
            <article
              key={customer.id}
              className="card transition hover:border-emerald-400/30"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-emerald-400/10 text-sm font-semibold text-emerald-200">
                    {customer.name.slice(0, 1)}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-sm font-semibold text-text-primary">
                        {customer.name}
                      </h2>
                      <span className={`badge ${STATUS_MAP[customer.status].color}`}>
                        {STATUS_MAP[customer.status].label}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-text-muted">
                      <span className="inline-flex items-center gap-1.5 font-mono">
                        <Phone size={11} />
                        {customer.phone}
                      </span>
                      {customer.email && (
                        <span className="inline-flex items-center gap-1.5">
                          <Mail size={11} />
                          {customer.email}
                        </span>
                      )}
                      {customer.style_preference && (
                        <span>스타일: {customer.style_preference}</span>
                      )}
                    </div>
                    {customer.notes && (
                      <p className="mt-3 max-w-3xl border-t border-surface-border pt-3 text-xs leading-5 text-text-muted">
                        {customer.notes}
                      </p>
                    )}
                  </div>
                </div>
                {customer.budget && (
                  <div className="rounded-lg bg-surface px-3 py-2 text-right">
                    <p className="text-[11px] text-text-muted">예산</p>
                    <p className="font-mono text-sm text-text-primary">
                      {customer.budget.toLocaleString()}만원
                    </p>
                  </div>
                )}
              </div>
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
                  고객 등록
                </h2>
                <p className="mt-1 text-xs text-text-muted">
                  필수 정보만 입력해도 상담 리드로 등록됩니다.
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
                  이름 <span className="text-red-300">*</span>
                  <input
                    className="input mt-1.5"
                    value={form.name}
                    onChange={(event) =>
                      setForm({ ...form, name: event.target.value })
                    }
                    placeholder="홍길동"
                  />
                </label>
                <label className="text-xs text-text-muted">
                  연락처 <span className="text-red-300">*</span>
                  <input
                    className="input mt-1.5"
                    value={form.phone}
                    onChange={(event) =>
                      setForm({ ...form, phone: event.target.value })
                    }
                    placeholder="010-0000-0000"
                  />
                </label>
              </div>
              <label className="block text-xs text-text-muted">
                이메일
                <input
                  className="input mt-1.5"
                  value={form.email}
                  onChange={(event) =>
                    setForm({ ...form, email: event.target.value })
                  }
                  placeholder="client@example.com"
                />
              </label>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="text-xs text-text-muted">
                  스타일 선호
                  <input
                    className="input mt-1.5"
                    value={form.style_preference}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        style_preference: event.target.value,
                      })
                    }
                    placeholder="모던, 내추럴"
                  />
                </label>
                <label className="text-xs text-text-muted">
                  예산(만원)
                  <input
                    className="input mt-1.5"
                    type="number"
                    value={form.budget}
                    onChange={(event) =>
                      setForm({ ...form, budget: event.target.value })
                    }
                    placeholder="2000"
                  />
                </label>
              </div>
              <label className="block text-xs text-text-muted">
                상태
                <select
                  className="input mt-1.5"
                  value={form.status}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      status: event.target.value as Customer["status"],
                    })
                  }
                >
                  <option value="lead">상담 대기</option>
                  <option value="active">진행 중</option>
                  <option value="completed">완료</option>
                  <option value="hold">보류</option>
                </select>
              </label>
              <label className="block text-xs text-text-muted">
                메모
                <textarea
                  className="input mt-1.5 min-h-[76px] resize-none"
                  value={form.notes}
                  onChange={(event) =>
                    setForm({ ...form, notes: event.target.value })
                  }
                  placeholder="상담 내용, 요청사항, 현장 특이사항"
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
