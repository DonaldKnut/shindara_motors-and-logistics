import { NextResponse } from "next/server";
import {
  buildBrandedEmailHtml,
  mailUnavailableMessage,
  sendTransactionalMail,
} from "@/lib/mail";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";
import { contactSchema, isHoneypotTriggered } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    if (isRateLimited(`contact:${ip}`, { max: 8 })) {
      return NextResponse.json(
        { message: "Too many requests. Please try again later or contact us directly." },
        { status: 429 },
      );
    }

    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Invalid form submission. Please check your details and try again.",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const payload = parsed.data;
    if (isHoneypotTriggered(payload.website)) {
      return NextResponse.json({
        message: "Thank you. Your enquiry has been received.",
      });
    }

    const textBody = [
      "New contact enquiry from shindaraautos.com",
      "",
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Phone: ${payload.phone}`,
      `Type: ${payload.enquiryType}`,
      "",
      payload.message,
    ].join("\n");

    const result = await sendTransactionalMail({
      subject: `Shindara contact — ${payload.enquiryType}`,
      text: textBody,
      html: buildBrandedEmailHtml({
        title: "New website contact",
        intro: "A visitor submitted the contact form on shindaraautos.com.",
        rows: [
          { label: "Name", value: payload.name },
          { label: "Email", value: payload.email },
          { label: "Phone", value: payload.phone },
          { label: "Type", value: payload.enquiryType },
        ],
        body: payload.message,
      }),
      replyTo: payload.email,
      tags: ["contact"],
    });

    if (!result.ok && result.reason === "unconfigured") {
      console.warn("Contact received without mail provider configured.", {
        name: payload.name,
        email: payload.email,
        enquiryType: payload.enquiryType,
      });
      return NextResponse.json({ message: mailUnavailableMessage }, { status: 503 });
    }

    if (!result.ok) {
      return NextResponse.json(
        {
          message:
            "We could not deliver your enquiry right now. Please email hello@shindaraautos.com or oluwasina@shindaraautos.com, or call us.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      message:
        "Thank you. Your enquiry has been sent successfully. Our team will respond shortly.",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      {
        message:
          "Something went wrong while sending your enquiry. Please try again or contact us directly.",
      },
      { status: 500 },
    );
  }
}
