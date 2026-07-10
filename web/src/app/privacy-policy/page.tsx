import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Wilkinson Counselling",
  description:
    "How Wilkinson Counselling handles personal information, enquiry form details, analytics and cookies.",
  alternates: {
    canonical: "https://www.wilkinsoncounselling.co.uk/privacy-policy/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main
      id="main-content"
      className="bg-teal-50 py-16 text-teal-950 md:py-24"
    >
      <article className="container mx-auto max-w-3xl px-6">
        <p className="mb-4 text-sm font-semibold tracking-widest text-teal-700 uppercase">
          Privacy policy
        </p>
        <h1 className="mb-6 font-serif text-4xl leading-tight md:text-5xl">
          How Wilkinson Counselling handles your information
        </h1>
        <p className="mb-8 text-sm text-teal-800">Last updated: 10 July 2026</p>

        <div className="prose prose-teal max-w-none">
          <p>
            Wilkinson Counselling is responsible for the personal information
            handled through this website. This page explains what the website
            collects and how it is used. It does not replace the separate privacy
            information you may receive if you choose to begin counselling.
          </p>

          <h2>Information you may choose to send</h2>
          <p>
            If you use the contact form, you may share your name, email address,
            phone number and the message you write. Please avoid sending detailed
            sensitive information through the form. A brief outline is usually
            enough for an initial enquiry.
          </p>

          <h2>How enquiry information is used</h2>
          <p>
            Enquiry details are used to respond to you, answer questions about
            counselling and manage your request. They may be processed because
            you have asked Wilkinson Counselling to take steps before potentially
            providing a service, and for the legitimate interest of operating a
            secure and responsive website.
          </p>
          <p>
            The form uses a hidden anti-spam field, input limits and temporary
            rate limiting. These checks help protect the website and do not make
            decisions about counselling support.
          </p>

          <h2>Service providers</h2>
          <p>
            The website is hosted by Vercel, content is managed through Sanity,
            and contact form email is delivered through Resend. These providers
            process information only as needed to supply their services and may
            use infrastructure outside the UK under their applicable data
            protection safeguards.
          </p>

          <h2>Analytics and cookies</h2>
          <p>
            Optional Google Analytics is used to understand broad website usage,
            such as which pages are visited. Google Analytics is not loaded until
            you select “Accept analytics” in the cookie notice. If you reject
            non-essential cookies, the site continues to work without analytics.
          </p>
          <p>
            Your analytics choice is stored in your browser. If accepted, Google
            Analytics may set cookies beginning with <code>_ga</code>. You can
            review or change your choice at any time using “Cookie settings” in
            the website footer.
          </p>

          <h2>How long information is kept</h2>
          <p>
            Enquiry emails are kept only for as long as reasonably needed to
            respond, manage related administration, and meet professional,
            safeguarding or legal obligations. Website security logs and
            analytics data follow the retention settings of the relevant service
            provider.
          </p>

          <h2>Your rights</h2>
          <p>
            Depending on the circumstances, you may ask for access to your
            personal information, correction, deletion, restriction, or a copy of
            the information you provided. You may also object to some processing
            or withdraw consent where consent is the basis used.
          </p>
          <p>
            If you remain concerned after contacting Wilkinson Counselling, you
            can find guidance or raise a concern with the{" "}
            <a
              href="https://ico.org.uk/make-a-complaint/data-protection-complaints/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Information Commissioner’s Office
            </a>
            .
          </p>

          <h2>Contact</h2>
          <p>
            If you have a privacy question or want to exercise a data protection
            right, please use the details on the{" "}
            <Link href="/contact/">contact page</Link>.
          </p>
        </div>
      </article>
    </main>
  );
}
