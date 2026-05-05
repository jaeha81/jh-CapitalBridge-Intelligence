"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  Camera,
  CheckCircle,
  Clock,
  FileText,
  Lightbulb,
  RefreshCw,
  TrendingUp,
  Users,
  Wrench,
} from "lucide-react";

const quickActions = [
  {
    href: "/estimate",
    label: "견적서 생성",
    desc: "고객 정보 입력 후 AI 견적 초안 생성",
    icon: FileText,
    color: "text-sky-300",
    bg: "bg-sky-400/10",
  },
  {
    href: "/proposal",
    label: "제안서 생성",
    desc: "스타일 키워드 기반 자재와 가구 제안",
    icon: Lightbulb,
    color: "text-amber-300",
    bg: "bg-amber-400/10",
  },
  {
    href: "/sns",
    label: "SNS 콘텐츠",
    desc: "시공 내용을 홍보 문안으로 변환",
    icon: Camera,
    color: "text-rose-300",
    bg: "bg-rose-400/10",
  },
  {
    href: "/customers",
    label: "고객 등록",
    desc: "상담, 진행, 완료 고객을 한 곳에서 관리",
    icon: Users,
    color: "text-emerald-300",
    bg: "bg-emerald-400/10",
  },
];

type DashboardStats = {
  customers: number;
  activeProjects: number;
  monthlyEstimates: number;
  completedProjects: number;
};

const initialStats: DashboardStats = {
  customers: 0,
  activeProjects: 0,
  monthlyEstimates: 0,
  completedProjects: 0,
};

export default function DashboardPage() {
  const [stats, setStats] = useState(initialStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadStats = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/dashboard/stats", {
        cache: "no-store",
      });
      const data = (await response.json()) as Partial<DashboardStats> & {
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error);
      }

      setStats({
        customers: data.customers ?? 0,
        activeProjects: data.activeProjects ?? 0,
        monthlyEstimates: data.monthlyEstimates ?? 0,
        completedProjects: data.completedProjects ?? 0,
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "대시보드 데이터를 불러오지 못했습니다."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadStats();
  }, []);

  const statItems = [
    {
      label: "전체 고객",
      value: stats.customers,
      icon: Users,
      color: "text-indigo-300",
      caption: "등록된 고객 수",
    },
    {
      label: "진행 중 프로젝트",
      value: stats.activeProjects,
      icon: TrendingUp,
      color: "text-emerald-300",
      caption: "active 상태 고객",
    },
    {
      label: "이번 달 견적",
      value: stats.monthlyEstimates,
      icon: FileText,
      color: "text-sky-300",
      caption: "월간 생성 견적",
    },
    {
      label: "완료 프로젝트",
      value: stats.completedProjects,
      icon: CheckCircle,
      color: "text-amber-300",
      caption: "completed 상태 고객",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl animate-slide-up space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-300">
            CapitalBridge Intelligence
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-text-primary">
            운영 대시보드
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-text-secondary">
            고객 상담부터 견적, 제안서, 콘텐츠 작성까지 한 화면에서 다음 업무를 빠르게 시작합니다.
          </p>
        </div>
        <button
          onClick={() => void loadStats()}
          className="btn-secondary inline-flex items-center justify-center gap-2"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          새로고침
        </button>
      </header>

      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      <section className="grid gap-4 md:grid-cols-4">
        {statItems.map(({ label, value, icon: Icon, color, caption }) => (
          <div key={label} className="card min-h-[132px]">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
                {label}
              </p>
              <Icon size={17} className={color} />
            </div>
            <p className={`mt-5 text-4xl font-semibold tracking-tight ${color}`}>
              {loading ? "-" : value.toLocaleString()}
            </p>
            <p className="mt-2 text-xs text-text-muted">{caption}</p>
          </div>
        ))}
      </section>

      <section>
        <div className="mb-4 flex items-center gap-2">
          <Clock size={15} className="text-text-muted" />
          <h2 className="text-sm font-semibold uppercase tracking-wider text-text-secondary">
            빠른 실행
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {quickActions.map(({ href, label, desc, icon: Icon, color, bg }) => (
            <Link
              key={href}
              href={href}
              className="card group transition hover:-translate-y-0.5 hover:border-brand-500/50"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className={`rounded-lg p-3 ${bg}`}>
                    <Icon size={19} className={color} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">
                      {label}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-text-muted">
                      {desc}
                    </p>
                  </div>
                </div>
                <ArrowRight
                  size={15}
                  className="mt-1 text-text-muted transition group-hover:text-brand-300"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Link
        href="/partners"
        className="card flex items-center justify-between transition hover:border-violet-400/40"
      >
        <div className="flex items-center gap-4">
          <div className="rounded-lg bg-violet-400/10 p-3">
            <Wrench size={19} className="text-violet-300" />
          </div>
          <div>
            <p className="text-sm font-semibold text-text-primary">
              협력업체 관리
            </p>
            <p className="mt-1 text-xs text-text-muted">
              시공팀, 자재업체, 전기·설비 파트너 DB를 관리합니다.
            </p>
          </div>
        </div>
        <ArrowRight size={15} className="text-text-muted" />
      </Link>
    </div>
  );
}
