import { ReactNode } from "react";

type Props = {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
};

export default function SurfaceCard({ title, action, children, className = "" }: Props) {
  return (
    <section
      className={`glass border border-[color:var(--color-border)]/80 shadow-lg shadow-black/10 rounded-2xl p-5 ${className}`}
    >
      <header className="mb-3 flex items-center gap-2">
        {title ? <h2 className="text-base font-semibold text-white">{title}</h2> : null}
        <div className="ml-auto">{action}</div>
      </header>
      <div className="text-sm text-[color:var(--color-muted)]">{children}</div>
    </section>
  );
}

