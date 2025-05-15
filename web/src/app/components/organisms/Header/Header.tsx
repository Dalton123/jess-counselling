"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { IoMenu, IoClose, IoChevronDown } from "react-icons/io5";
import classNames from "classnames";
import { urlForImage } from "@sanity/lib/client";

// Types from Sanity schema
export type NavLink = {
  name: string;
  url: string;
  submenu?: NavLink[];
};

export type HeaderProps = {
  siteTitle?: string;
  logo?: SanityImageObject;
  links?: NavLink[];
  cta?: {
    name: string;
    url: string;
  };
};

// A basic type for Sanity image objects for now
// Consider using a more specific type from a Sanity library if available
interface SanityImageObject {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
  // other image fields like hotspot, crop can be added here
  width?: number; // these might be custom fields added in schema or from asset itself
  height?: number;
}

export const Header = ({ data }: { data: HeaderProps }) => {
  const { siteTitle, logo, links, cta } = data;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const toggleMobile = () => setMobileOpen((open) => !open);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  return (
    <header
      className={classNames(
        "noise-pattern-2 sticky top-0 z-20 px-6 transition-colors duration-100",
        {
          // When mobile menu is open, apply a solid background to the entire header
          "bg-teal-50 text-teal-900 shadow": mobileOpen,
          // Otherwise, apply scroll-dependent styling
          "bg-teal-100/60 py-2 text-teal-900 shadow-sm backdrop-blur-md hover:bg-teal-100/80":
            !mobileOpen && isScrolled,
          "bg-teal-900 py-3 text-teal-800 shadow": !mobileOpen && !isScrolled,
        }
      )}
    >
      <div className="flex items-center justify-between">
        {/* Logo / Title */}
        {logo && logo.asset ? (
          <Link href="/">
            <Image
              src={urlForImage(logo).url()}
              alt={logo.alt || siteTitle || "Logo"}
              width={logo.width || 200}
              height={logo.height || 60}
              className={classNames("transition-all duration-200", {
                "w-30 md:w-40": isScrolled,
                "max-w-40 md:max-w-none": !isScrolled,
              })}
              priority
            />
          </Link>
        ) : siteTitle ? (
          <Link href="/" className="text-xl font-bold hover:text-teal-600">
            {siteTitle}
          </Link>
        ) : null}

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-6 lg:flex">
          {links?.map((link, idx) => {
            const isLast = idx === links.length - 1;
            return !link.submenu ? (
              <Link
                key={link.name}
                href={link.url}
                className="relative py-2 font-medium after:absolute after:top-full after:left-1/2 after:h-1 after:w-0 after:origin-center after:-translate-x-1/2 after:bg-teal-600 after:transition-all after:duration-300 after:ease-in-out after:content-[''] hover:text-teal-600 hover:after:w-full focus:after:w-full 2xl:text-lg"
              >
                {link.name}
              </Link>
            ) : (
              <DesktopDropdown
                key={link.name}
                link={link}
                align={isLast ? "right" : "left"}
              />
            );
          })}

          {cta && (
            <Link
              href={cta.url}
              className="ml-4 inline-block rounded bg-teal-600 px-4 py-2 text-white hover:bg-teal-700"
            >
              {cta.name}
            </Link>
          )}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="text-teal-800 focus:outline-none lg:hidden"
          onClick={toggleMobile}
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <IoClose size={40} /> : <IoMenu size={40} />}
        </button>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-30 bg-black"
                onClick={toggleMobile}
              />

              {/* Drawer Panel */}
              <motion.aside
                initial={{ x: 300, opacity: 0.5 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 300, opacity: 0 }}
                transition={{ type: "tween", duration: 0.2 }}
                className="noise-pattern fixed top-0 right-0 bottom-0 z-40 flex w-4/5 max-w-xs flex-col bg-teal-50 p-6"
              >
                <button
                  onClick={toggleMobile}
                  className="absolute top-4 right-4 text-teal-700 hover:text-teal-800"
                  aria-label="Close menu"
                >
                  <IoClose size={40} />
                </button>
                <nav className="mt-12 flex flex-col space-y-4 text-4xl font-black">
                  {links?.map((link, index) =>
                    !link.submenu ? (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.075,
                          ease: "easeInOut",
                        }}
                      >
                        <Link
                          href={link.url}
                          className="text-teal-700 hover:text-teal-600 focus:text-teal-600"
                          onClick={toggleMobile}
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    ) : (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.1,
                          ease: "easeOut",
                        }}
                      >
                        <MobileAccordion link={link} />
                      </motion.div>
                    )
                  )}

                  {cta && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{
                        duration: 0.3,
                        delay: links?.length ? links.length * 0.1 : 0.3,
                        ease: "easeOut",
                      }}
                    >
                      <Link
                        href={cta.url}
                        className="mt-4 inline-block rounded bg-teal-600 px-4 py-2 text-white hover:bg-teal-700"
                        onClick={toggleMobile}
                      >
                        {cta.name}
                      </Link>
                    </motion.div>
                  )}
                </nav>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

// Desktop dropdown with hover and framer-motion
export default function DesktopDropdown({
  link,
  align = "left",
}: {
  link: NavLink;
  align?: "left" | "right";
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="flex items-center space-x-1 font-medium hover:text-teal-600">
        <span>{link.name}</span>
        <IoChevronDown
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className={classNames(
              "text-md absolute top-full z-10 mt-2 max-w-40 space-y-1 rounded bg-white p-2 text-teal-800 shadow-lg",
              {
                "left-1/2 -translate-x-1/2": align === "left",
                "right-0": align === "right",
              }
            )}
          >
            {link.submenu!.map((s) => (
              <Link
                key={s.name}
                href={s.url}
                className="block px-4 py-2 text-center hover:bg-gray-100"
              >
                {s.name}
              </Link>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

// Mobile accordion for submenu
const MobileAccordion = ({ link }: { link: NavLink }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between text-teal-700 hover:text-teal-600"
      >
        <span>{link.name}</span>
        <IoChevronDown
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center pl-px before:mr-1 before:block before:h-0.5 before:w-3 before:bg-teal-700 before:content-['']"
          >
            {link.submenu!.map((s) => (
              <Link
                key={s.name}
                href={s.url}
                className="block py-1 text-3xl text-teal-700 hover:text-teal-600"
              >
                {s.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
