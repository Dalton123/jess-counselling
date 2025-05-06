import Link from "next/link";

export const Button = ({
  href,
  children,
  external = false,
  backgroundColor = "bg-teal-50",
  textColor = "text-teal-900",
  type = "button",
  disabled = false,
  className = "",
}: {
  href?: string;
  children: React.ReactNode;
  external?: boolean;
  backgroundColor?: string;
  textColor?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}) => {
  const baseClass = `relative z-1 w-fit btn animate-rotate-border flex cursor-pointer rounded-full bg-conic/[from_var(--border-angle)] from-teal-300 via-green-500 to-teal-300 p-0.5 text-slate-950 transition-all active:scale-[0.99] group hover:shadow-md hover:shadow-teal-500/50`;
  const innerClass = `w-full rounded-full p-4 px-8 text-center text-sm tracking-wide uppercase ${textColor}`;

  const innerBackgroundClass = `absolute rounded-full overflow-hidden -z-1 w-[97%] h-[92%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform group-hover:scale-99 group-focus:scale-99 group-hover:opacity-95 ${backgroundColor}`;
  if (href) {
    return (
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        className={`${baseClass} ${className}`}
      >
        <div className={`${innerBackgroundClass}`}></div>
        <span className={`${innerClass}`}>{children}</span>
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${baseClass} ${className}`}
    >
      <div className={`${innerBackgroundClass}`}></div>
      <span className={`${innerClass}`}>{children}</span>
    </button>
  );
};
