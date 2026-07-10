import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_MAX_ENTRIES = 500;
const MAX_FIELD_LENGTHS = {
  name: 100,
  email: 254,
  phone: 40,
  message: 4000,
};

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
  companyName: string;
};

const asString = (value: unknown) => (typeof value === "string" ? value : "");

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const getClientIp = (request: NextRequest) => {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0];

  return (
    forwardedFor?.trim() ||
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    "unknown"
  );
};

const pruneRateLimitStore = (now: number) => {
  for (const [key, entry] of rateLimitStore) {
    if (entry.resetAt <= now) rateLimitStore.delete(key);
  }

  while (rateLimitStore.size >= RATE_LIMIT_MAX_ENTRIES) {
    const oldestKey = rateLimitStore.keys().next().value;
    if (typeof oldestKey !== "string") break;
    rateLimitStore.delete(oldestKey);
  }
};

// Best-effort per-instance limiting. The honeypot and provider-level controls remain
// important because serverless requests can be handled by different instances.
const isRateLimited = (clientIp: string) => {
  const now = Date.now();
  if (rateLimitStore.size >= RATE_LIMIT_MAX_ENTRIES) {
    pruneRateLimitStore(now);
  }

  const current = rateLimitStore.get(clientIp);
  if (!current || current.resetAt <= now) {
    rateLimitStore.set(clientIp, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  current.count += 1;
  return current.count > RATE_LIMIT_MAX_REQUESTS;
};

const isTooLong = (body: ContactFormData) =>
  body.name.length > MAX_FIELD_LENGTHS.name ||
  body.email.length > MAX_FIELD_LENGTHS.email ||
  body.phone.length > MAX_FIELD_LENGTHS.phone ||
  body.message.length > MAX_FIELD_LENGTHS.message;

export async function POST(request: NextRequest) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error("Contact form email provider is not configured");
      return NextResponse.json(
        { error: "The contact form is temporarily unavailable. Please try again later." },
        { status: 503 }
      );
    }

    const resend = new Resend(resendApiKey);
    const payload = (await request.json()) as Record<string, unknown>;
    const body: ContactFormData = {
      name: asString(payload.name),
      email: asString(payload.email),
      phone: asString(payload.phone),
      message: asString(payload.message),
      companyName: asString(payload.companyName),
    };

    if (isRateLimited(getClientIp(request))) {
      return NextResponse.json(
        { error: "Too many messages sent. Please try again later." },
        { status: 429 }
      );
    }

    // Silently accept honeypot submissions without sending email.
    if (body.companyName) {
      return NextResponse.json({ success: true });
    }

    if (!body.name.trim() || !body.email.trim() || !body.message.trim()) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (isTooLong(body)) {
      return NextResponse.json(
        { error: "Message details are too long" },
        { status: 400 }
      );
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(body.email.trim())) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const name = body.name.trim();
    const email = body.email.trim();
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(body.phone.trim());
    const safeMessage = escapeHtml(body.message.trim());
    const subjectName = name.replace(/[\r\n]+/g, " ").slice(0, MAX_FIELD_LENGTHS.name);

    const notificationEmail = await resend.emails.send({
      from: "website@wilkinsoncounselling.co.uk",
      to: "wilkinsoncounselling@outlook.com",
      subject: `New Contact Form Submission from ${subjectName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0f766e;">New Contact Form Submission</h2>
          <div style="background: #f0fdfa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${safeName}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            ${safePhone ? `<p><strong>Phone:</strong> ${safePhone}</p>` : ""}
            <p><strong>Message:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 4px; white-space: pre-wrap;">${safeMessage}</div>
          </div>
          <p style="font-size: 14px; color: #666;">This message was sent from your website contact form.</p>
        </div>
      `,
    });

    if (notificationEmail.error) {
      throw new Error("Notification email was not accepted by the email provider");
    }

    const autoReplyEmail = await resend.emails.send({
      from: "jessica@wilkinsoncounselling.co.uk",
      to: email,
      subject: "Thank you for your message - Wilkinson Counselling",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="padding: 30px 20px; text-align: center;">
            <img src="https://www.wilkinsoncounselling.co.uk/images/Wilkinson-counselling.png" alt="Wilkinson Counselling Logo" style="max-width: 200px; height: auto; margin-bottom: 15px;" />
          </div>
          <div style="padding: 30px 20px;">
            <p>Hi ${safeName},</p>
            <p>Thank you for reaching out. I&apos;ve received your message and will get back to you as soon as I can, usually within 1-2 working days.</p>
            <p>In the meantime, take care, and thank you again for making contact.</p>
            <p>Warm wishes,<br />Jess</p>
            <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px;">
              <p style="font-weight: bold; color: #0f766e;">Wilkinson Counselling</p>
              <p style="font-size: 14px; color: #666;">This is an automated response. Please do not reply to this email.</p>
            </div>
          </div>
        </div>
      `,
    });

    if (autoReplyEmail.error) {
      console.error("Contact auto-reply was not accepted by the email provider");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
