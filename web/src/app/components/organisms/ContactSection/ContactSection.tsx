"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { FiPhone } from "react-icons/fi";
import Image from "next/image";
import { urlForImage } from "@sanity/lib/client";
import { Button } from "@atoms/Button/Button";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import { SectionWrapper } from "@atoms/SectionWrapper/SectionWrapper";

// Form field type for validation
type FormFields = {
  name: string;
  email: string;
  phone: string;
  message: string;
  companyName: string; // honeypot field
};

type ContactSectionProps = {
  data: {
    text: PortableTextBlock[];
    phoneNumber: string;
    backgroundImage: {
      asset: {
        _ref: string;
        _type: string;
      };
    };
    formDisclaimer: string;
    successTitle: string;
    successMessage: string;
    buttonText: string;
    wrapper?: "none" | "dark" | "light";
    topSpacing?: "none" | "small" | "medium" | "large";
    bottomSpacing?: "none" | "small" | "medium" | "large";
  };
};

// Initial state and error state
const initialState: FormFields = {
  name: "",
  email: "",
  phone: "",
  message: "",
  companyName: "",
};

export const ContactSection = ({ data }: ContactSectionProps) => {
  const [formData, setFormData] = useState<FormFields>(initialState);
  const [errors, setErrors] = useState<Partial<FormFields>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name as keyof FormFields]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormFields> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Honeypot check - if filled, silently "succeed" but don't actually submit
    if (formData.companyName) {
      console.log("Honeypot triggered - likely bot submission");
      setSubmitSuccess(true);
      return;
    }

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData(initialState);
      } else {
        // Handle server errors
        console.error("Form submission error:", result.error);
        alert(result.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert(
        "Something went wrong. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SectionWrapper
      wrapper={data.wrapper || "none"}
      topSpacing={data.topSpacing || "medium"}
      bottomSpacing={data.bottomSpacing || "medium"}
      className="min-h-[600px]"
    >
      <div className="relative overflow-hidden rounded-3xl lg:flex">
        {/* Background Image */}
        {data.backgroundImage && (
          <div className="absolute inset-0 z-0">
            <Image
              src={urlForImage(data.backgroundImage).url()}
              alt="Counseling session"
              className="h-full w-full object-cover"
              fill
            />
            <div className="absolute inset-0 bg-gradient-to-r from-green-900/60 to-emerald-900/50"></div>
          </div>
        )}
        <div className="container mx-auto flex flex-col px-4 lg:flex-row">
          {/* Left Column - Background with Content */}
          <div className="relative flex w-full flex-col items-center justify-center md:items-start">
            {/* Content */}
            <div className="prose 3xl:pl-16 relative z-10 pt-8 pl-4 text-white md:px-0 md:pt-12 md:pl-8 lg:pt-16 lg:pb-8">
              {data.text && (
                <PortableText
                  value={data.text}
                  components={{
                    marks: {
                      styled: ({ children }) => (
                        <span className="font-serif italic">{children}</span>
                      ),
                    },
                  }}
                />
              )}

              {data.phoneNumber && (
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                    <FiPhone className="text-xl text-white" />
                  </div>
                  <span className="text-lg">Call us: {data.phoneNumber}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="flex w-full items-center justify-center p-4 pb-12 lg:px-8 lg:py-20">
            <div className="noise-pattern-2 group w-full rounded-2xl bg-slate-700/70 p-6 text-white shadow-lg backdrop-blur-sm transition-all duration-500 focus-within:bg-slate-700/85 hover:bg-slate-700/85 md:p-8 lg:max-w-lg">
              {data.formDisclaimer && (
                <p className="mb-6 text-sm text-slate-300">
                  {data.formDisclaimer}
                </p>
              )}

              {submitSuccess ? (
                <div className="flex min-h-[400px] items-center justify-center rounded-lg bg-green-500/20 p-6 text-center">
                  <div>
                    <h3 className="mb-4 text-xl font-semibold">
                      {data.successTitle || "Thank you!"}
                    </h3>
                    <p className="text-lg">
                      {data.successMessage ||
                        "Your message has been sent successfully."}
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="mb-1 block text-sm">
                      Your Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full rounded-md border border-slate-900/20 bg-slate-600/40 p-3 text-white placeholder-slate-400 transition-colors outline-none group-focus-within:bg-slate-500/50 group-hover:bg-slate-500/50 focus:ring-2 focus:ring-teal-300/50 ${
                        errors.name ? "border border-red-500" : ""
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-400">{errors.name}</p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="mb-1 block text-sm">
                      Your Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full rounded-md border border-slate-900/20 bg-slate-600/40 p-3 text-white placeholder-slate-400 transition-colors outline-none group-focus-within:bg-slate-500/50 group-hover:bg-slate-500/50 focus:ring-2 focus:ring-teal-300/50 ${
                        errors.email ? "border border-red-500" : ""
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-400">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label htmlFor="phone" className="mb-1 block text-sm">
                      Your Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-md border border-slate-900/20 bg-slate-600/40 p-3 text-white placeholder-slate-400 transition-colors outline-none group-focus-within:bg-slate-500/50 group-hover:bg-slate-500/50 focus:ring-2 focus:ring-teal-300/50"
                    />
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="mb-1 block text-sm">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className={`field-sizing-content w-full rounded-md border border-slate-900/20 bg-slate-600/40 p-3 text-white placeholder-slate-400 transition-colors outline-none group-focus-within:bg-slate-500/50 group-hover:bg-slate-500/50 focus:ring-2 focus:ring-teal-300/50 ${
                        errors.message ? "border border-red-500" : ""
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-400">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Honeypot Field - Hidden from real users */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="companyName">
                      Company Name (Leave Empty)
                    </label>
                    <input
                      id="companyName"
                      name="companyName"
                      type="text"
                      value={formData.companyName}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="mx-auto w-full max-w-2xs"
                    backgroundColor="bg-slate-700/90"
                    textColor="text-teal-50"
                  >
                    {isSubmitting
                      ? "Sending..."
                      : data.buttonText || "MAKE AN APPOINTMENT"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};
