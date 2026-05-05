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
    <aside className="fixed left-0 top-0 h-full w-64 bg-surface-card border-r border-surface-border flex flex-col z-50">
      {/* 로고 */}
      <div className="p-6 border-b border-surface-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
            <Zap size={16} className="text-white" />
          </div>
          <div>
            <p className="font-display text-lg tracking-wider text-text-primary leading-none">
              INTERIOR AI
            </p>
            <p className="text-xs text-text-muted font-mono mt-0.5">
              PLATFORM v1.0
            </p>
          </div>
        </div>
      </div>

      {/* 네비게이션 */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                active
                  ? "bg-brand-dim text-brand-400 border border-brand-600/30"
                  : "text-text-secondary hover:text-text-primary hover:bg-surface-hover"
              )}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* 하단 */}
      <div className="p-4 border-t border-surface-border">
        <div className="px-3 py-2">
          <p className="text-xs text-text-muted">AI 상태</p>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-slow" />
            <span className="text-xs text-green-400 font-mono">Claude 연결됨</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
