"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  Lightbulb,
  Camera,
  Wrench,
  Zap,
} from "lucide-react";
import { clsx } from "clsx";

const navItems = [
  { href: "/dashboard", label: "대시보드", icon: LayoutDashboard },
  { href: "/customers", label: "고객 관리", icon: Users },
  { href: "/estimate", label: "견적 자동화", icon: FileText },
  { href: "/proposal", label: "제안서 생성", icon: Lightbulb },
  { href: "/sns", label: "SNS 콘텐츠", icon: Camera },
  { href: "/partners", label: "협력업체", icon: Wrench },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      <aside className="fixed left-0 top-0 z-50 hidden h-full w-64 flex-col border-r border-surface-border bg-surface-card lg:flex">
        <div className="border-b border-surface-border p-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
              <Zap size={16} className="text-white" />
            </div>
            <div>
              <p className="font-display text-lg leading-none tracking-wider text-text-primary">
                INTERIOR AI
              </p>
              <p className="mt-0.5 font-mono text-xs text-text-muted">
                PLATFORM v1.0
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={clsx(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                  active
                    ? "border border-brand-600/30 bg-brand-dim text-brand-400"
                    : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
                )}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-surface-border p-4">
          <div className="px-3 py-2">
            <p className="text-xs text-text-muted">AI 상태</p>
            <div className="mt-1 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse-slow" />
              <span className="font-mono text-xs text-green-400">
                Claude 연결 대기
              </span>
            </div>
          </div>
        </div>
      </aside>

      <header className="sticky top-0 z-40 mb-4 border-b border-surface-border bg-surface/95 px-1 py-3 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <Link href="/dashboard" className="flex min-w-0 items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-600">
              <Zap size={15} className="text-white" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-text-primary">
                CapitalBridge
              </p>
              <p className="text-[11px] text-text-muted">AI 운영 플랫폼</p>
            </div>
          </Link>
          <span className="rounded-full border border-green-400/20 bg-green-400/10 px-2 py-1 text-[11px] text-green-300">
            Online
          </span>
        </div>
      </header>

      <nav className="fixed inset-x-0 bottom-0 z-50 grid max-w-full grid-cols-6 overflow-hidden border-t border-surface-border bg-surface-card/95 px-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 backdrop-blur lg:hidden">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex min-w-0 flex-col items-center justify-center gap-1 rounded-lg px-1 py-2 text-[10px] font-medium transition",
                active
                  ? "bg-brand-dim text-brand-300"
                  : "text-text-muted hover:text-text-primary"
              )}
            >
              <Icon size={17} />
              <span className="max-w-full truncate">{label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
