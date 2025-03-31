import Link from "next/link";

export const Button = ({
  href,
  children,
  external = false,
  backgroundColor = "bg-white",
  textColor = "text-slate-950",
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  backgroundColor?: string;
  textColor?: string;
}) => {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      className="animate-rotate-border flex cursor-pointer rounded-full bg-conic/[from_var(--border-angle)] from-teal-400 via-green-500 to-teal-400 p-0.5 text-slate-950 transition-all hover:scale-[1.03] active:scale-[0.99]"
    >
      <span
        className={`rounded-full p-4 px-8 text-center text-sm tracking-wide ${backgroundColor} ${textColor}`}
      >
        {children}
      </span>
    </Link>
  );
};
