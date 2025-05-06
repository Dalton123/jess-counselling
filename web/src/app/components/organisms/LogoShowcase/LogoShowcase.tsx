"use client";
import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@sanity/lib/client";
import classNames from "classnames";

type Logo = {
  _key: string;
  image: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  name: string;
  url?: string;
};

type LogoShowcaseProps = {
  data: {
    title?: string;
    description?: string;
    logos: Logo[];
    darkBackground?: boolean;
  };
};

export const LogoShowcase = ({ data }: LogoShowcaseProps) => {
  const { title, description, logos, darkBackground = true } = data;

  return (
    <section
      className={classNames("px8 container mx-auto mb-6 px-5 py-8 md:mb-8", {
        "w-[calc(100%-40px)] rounded-4xl bg-slate-700": darkBackground,
        "w-[calc(100%-40px)] rounded-4xl bg-gradient-to-bl from-emerald-100 to-teal-100":
          !darkBackground,
      })}
    >
      <div className="container mx-auto px-4">
        {(title || description) && (
          <div className="mb-10 text-center">
            {title && <h3 className="mb-3 text-2xl font-medium">{title}</h3>}
            {description && (
              <p className="mx-auto max-w-2xl text-center opacity-80">
                {description}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
          {logos.map((logo) => (
            <div
              key={logo._key}
              className="flex h-12 w-32 items-center justify-center transition-opacity hover:opacity-80 md:h-16 md:w-40"
            >
              {logo.url ? (
                <Link
                  href={logo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-full w-full items-center justify-center"
                >
                  <Image
                    src={urlForImage(logo.image).url()}
                    alt={logo.name}
                    width={160}
                    height={64}
                    className="max-h-full max-w-full object-contain"
                    style={{
                      filter: darkBackground
                        ? "brightness(0) invert(1)"
                        : "none",
                    }}
                  />
                </Link>
              ) : (
                <Image
                  src={urlForImage(logo.image).url()}
                  alt={logo.name}
                  width={160}
                  height={64}
                  className="max-h-full max-w-full object-contain"
                  style={{
                    filter: darkBackground ? "brightness(0) invert(1)" : "none",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
