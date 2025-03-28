import Link from "next/link";

export const Button = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return <Link href={href} className="flex animate-rotate-border cursor-pointer rounded-full bg-conic/[from_var(--border-angle)] from-pink-400 via-pink-100 to-pink-400 p-0.5 transition-all hover:scale-[1.03] active:scale-[0.99]"><span className="rounded-full bg-white p-4 px-8 text-center text-sm text-black/50">{children}</span></Link>;
};

