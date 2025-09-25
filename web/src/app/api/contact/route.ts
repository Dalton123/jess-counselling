import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
  companyName: string; // honeypot field
};

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Honeypot check - if filled, silently "succeed" but don't send emails
    if (body.companyName) {
      console.log("Honeypot triggered - likely bot submission");
      return NextResponse.json({ success: true });
    }

    // Basic validation
    if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Send notification email to Jessica
    const notificationEmail = await resend.emails.send({
      from: "website@wilkinsoncounselling.co.uk",
      to: "wilkinsoncounselling@outlook.com",
      subject: `New Contact Form Submission from ${body.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0f766e;">New Contact Form Submission</h2>
          
          <div style="background: #f0fdfa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${body.name}</p>
            <p><strong>Email:</strong> ${body.email}</p>
            ${body.phone ? `<p><strong>Phone:</strong> ${body.phone}</p>` : ""}
            <p><strong>Message:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 4px; white-space: pre-wrap;">${body.message}</div>
          </div>
          
          <p style="font-size: 14px; color: #666;">
            This message was sent from your website contact form.
          </p>
        </div>
      `,
    });

    // Send auto-reply to the person who submitted
    const autoReplyEmail = await resend.emails.send({
      from: "jessica@wilkinsoncounselling.co.uk",
      to: body.email,
      subject: "Thank you for your message - Wilkinson Counselling",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="padding: 30px 20px; text-align: center;">
            <img 
              src="https://www.wilkinsoncounselling.co.uk/images/Wilkinson-counselling.png" 
              alt="Wilkinson Counselling Logo" 
              style="max-width: 200px; height: auto; margin-bottom: 15px; filter: brightness(0) invert(1);"
            />
          </div>
          
          <div style="padding: 30px 20px;">
            <p>Hi ${body.name},</p>
            
            <p>Thank you for reaching out — I've received your message and will get back to you as soon as I can, usually within 1–2 working days.</p>
            
            <p>In the meantime, take care, and thank you again for making contact.</p>
            
            <p>Warm wishes,<br>
            Jess</p>
            
            <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px;">
              <p style="font-weight: bold; color: #0f766e;">Wilkinson Counselling</p>
              <p style="font-size: 14px; color: #666;">
                This is an automated response. Please do not reply to this email.
              </p>
            </div>
          </div>
        </div>
      `,
    });

    console.log("Emails sent successfully:", {
      notification: notificationEmail.data?.id,
      autoReply: autoReplyEmail.data?.id,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
