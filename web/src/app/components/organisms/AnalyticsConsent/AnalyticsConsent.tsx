"use client";

import Script from "next/script";
import Link from "next/link";
import { useEffect, useState } from "react";

const CONSENT_KEY = "wilkinson-analytics-consent";
const MEASUREMENT_ID = "G-S35TH57BF2";
type Consent = "accepted" | "rejected" | null;

const setAnalyticsDisabled = (disabled: boolean) => {
  const analyticsWindow = window as typeof window & Record<string, boolean>;
  analyticsWindow[`ga-disable-${MEASUREMENT_ID}`] = disabled;
};

const clearAnalyticsCookies = () => {
  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0]?.trim();
    if (name?.startsWith("_ga")) {
      document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
      document.cookie = `${name}=; Max-Age=0; path=/; Domain=.wilkinsoncounselling.co.uk; SameSite=Lax`;
    }
  });
};

const clearSettingsQuery = () => {
  const url = new URL(window.location.href);
  if (!url.searchParams.has("cookie-settings")) return;

  url.searchParams.delete("cookie-settings");
  window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
};

export const AnalyticsConsent = () => {
  const [consent, setConsent] = useState<Consent>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const shouldOpenPreferences =
      new URLSearchParams(window.location.search).get("cookie-settings") ===
      "true";
    let saved: string | null = null;
    try {
      saved = window.localStorage.getItem(CONSENT_KEY);
    } catch {
      // Storage can be unavailable in restrictive browser modes.
    }
    if (shouldOpenPreferences) {
      setConsent(null);
      setAnalyticsDisabled(true);
    } else if (saved === "accepted" || saved === "rejected") {
      setConsent(saved);
      setAnalyticsDisabled(saved !== "accepted");
    } else {
      setAnalyticsDisabled(true);
    }
    setIsReady(true);
  }, []);

  const acceptAnalytics = () => {
    try {
      window.localStorage.setItem(CONSENT_KEY, "accepted");
    } catch {
      // Consent still applies to the current page if storage is unavailable.
    }
    setAnalyticsDisabled(false);
    clearSettingsQuery();
    setConsent("accepted");
  };

  const rejectAnalytics = () => {
    try {
      window.localStorage.setItem(CONSENT_KEY, "rejected");
    } catch {
      // Analytics remains disabled for the current page.
    }
    setAnalyticsDisabled(true);
    clearAnalyticsCookies();
    clearSettingsQuery();
    setConsent("rejected");
  };

  if (!isReady) return null;

  return (
    <>
      {consent === "accepted" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${MEASUREMENT_ID}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {consent === null && (
        <section
          role="dialog"
          aria-label="Analytics cookie preferences"
          aria-live="polite"
          className="fixed right-4 bottom-4 left-4 z-50 mx-auto max-w-2xl rounded-2xl border border-teal-200 bg-white p-5 text-slate-800 shadow-2xl md:left-auto md:p-6"
        >
          <h2 className="mb-2 font-serif text-xl text-teal-950">
            Analytics cookies
          </h2>
          <p className="text-sm leading-6">
            Wilkinson Counselling uses optional Google Analytics cookies to
            understand how the website is used. They are only loaded if you
            accept. Essential website features work without them. Read the{" "}
            <Link
              href="/privacy-policy/"
              className="font-semibold text-teal-800 underline underline-offset-4"
            >
              privacy policy
            </Link>
            .
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={acceptAnalytics}
              className="rounded-full bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
            >
              Accept analytics
            </button>
            <button
              type="button"
              onClick={rejectAnalytics}
              className="rounded-full border border-teal-700 px-5 py-2.5 text-sm font-semibold text-teal-800 transition-colors hover:bg-teal-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
            >
              Reject non-essential
            </button>
          </div>
        </section>
      )}
    </>
  );
};
