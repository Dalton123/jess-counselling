import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@sanity/lib/client";

interface SanityImageObject {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
  width?: number;
  height?: number;
}

type FooterData = {
  logoText: string;
  logo?: SanityImageObject;
  socialLinks: {
    platform: string;
    url: string;
    isActive: boolean;
  }[];
  showBackToTop: boolean;
};

export const Footer = ({ data }: { data: FooterData }) => (
  <footer className="before:flower-pattern relative z-1 overflow-hidden bg-slate-950 pt-8 pb-40 before:absolute before:inset-0 before:z-[-1] before:opacity-10 before:content-[''] md:py-12">
    <div className="container mx-auto px-4 md:px-16">
      <div className="flex flex-col items-start justify-between gap-12 md:flex-row md:gap-8">
        <div className="flex flex-col items-start gap-4">
          {data?.logo && data.logo.asset ? (
            <Image
              src={urlForImage(data.logo).url()}
              alt={data.logo.alt || data.logoText || "Logo"}
              width={data.logo.width || 200}
              height={data.logo.height || 60}
              className="object-contain"
            />
          ) : (
            <div className="font-serif text-2xl text-white/80 italic">
              {data?.logoText || "JESSICA"}
            </div>
          )}

          <p className="pr-10 text-sm text-white/60">
            Counselling and therapy in Higher Blackley, Manchester, UK. <br />
            Copyright © {new Date().getFullYear()} | All Rights Reserved
          </p>

          <nav aria-label="Privacy and cookie links" className="flex flex-col gap-2">
            <Link
              href="/privacy-policy/"
              className="text-sm text-white/70 underline underline-offset-4 transition-colors hover:text-white"
            >
              Privacy policy
            </Link>
            <Link
              href="/?cookie-settings=true"
              className="text-sm text-white/70 underline underline-offset-4 transition-colors hover:text-white"
            >
              Cookie settings
            </Link>
          </nav>
        </div>

        <div className="flex flex-col items-end gap-4">
          <Image
            src="/images/BACP_Jessica-Walsh-counselling-01.png"
            alt="BACP - British Association for Counselling and Psychotherapy"
            width={200}
            height={89}
            className="object-contain"
          />
        </div>
      </div>
    </div>

    {data?.showBackToTop && (
      <div className="absolute -bottom-16 left-1/2 m-auto mt-10 -translate-x-1/2 text-center">
        <a
          href="#top"
          className="group relative z-1 block cursor-pointer rounded-full"
          aria-label="Back to top"
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <span
              key={i}
              aria-hidden="true"
              className="absolute inset-0 z-0 animate-ping rounded-full bg-emerald-300/30"
              style={{ animationDuration: "5s", animationDelay: `${i}s` }}
            />
          ))}
          <span className="relative block rounded-full bg-emerald-300/10 px-7 py-16 text-sm text-white/80 uppercase transition-all duration-500 group-hover:bg-emerald-300/30">
            <span className="block -translate-y-4">Back To Top</span>
          </span>
        </a>
      </div>
    )}
  </footer>
);
