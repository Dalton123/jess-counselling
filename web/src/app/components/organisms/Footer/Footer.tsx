"use client";
import { motion } from "framer-motion";
import Image from "next/image";
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

export const Footer = ({ data }: { data: FooterData }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="before:flower-pattern relative z-1 overflow-hidden bg-slate-950 pt-8 pb-40 before:absolute before:inset-0 before:z-[-1] before:opacity-10 before:content-[''] md:py-12">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 md:px-16">
        <div className="flex flex-col items-start gap-4">
          {/* Logo/Text */}
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

          {/* Copyright */}
          <div className="text-sm text-white/60">
            Copyright © {new Date().getFullYear()} | All Rights Reserved
          </div>

          {/* Social Links */}
          {/* <div className="mt-4 flex gap-4">
            {data?.socialLinks
              ?.filter((link) => link.isActive)
              .map((social) => (
                <Link
                  key={social.platform}
                  href={social.url}
                  className="rounded bg-white/10 p-2 transition-colors hover:bg-white/20"
                  aria-label={social.platform}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span
                    className={`i-${social.platform} h-5 w-5 text-white/80`}
                  />
                </Link>
              ))}
          </div> */}
        </div>
      </div>

      {/* Back to Top Button with Radiating Animation */}
      {data?.showBackToTop && (
        <div className="absolute -bottom-16 left-1/2 m-auto mt-10 -translate-x-1/2 text-center">
          <button
            onClick={scrollToTop}
            className="group relative z-1 cursor-pointer rounded-full"
            aria-label="Back to top"
          >
            {/* More circles for a sun-like effect */}
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 z-0 rounded-full bg-emerald-300/30"
                animate={{
                  scale: [0.8, 1.5], // Different max scale for each ring
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  delay: i * 1, // Smaller delay for more continuous effect
                  ease: "linear",
                }}
              />
            ))}
            <span className="relative block rounded-full bg-emerald-300/10 px-7 py-16 text-sm text-white/80 uppercase transition-all duration-500 group-hover:bg-emerald-300/30">
              <span className="block -translate-y-4">Back To Top</span>
            </span>
          </button>
        </div>
      )}
    </footer>
  );
};
