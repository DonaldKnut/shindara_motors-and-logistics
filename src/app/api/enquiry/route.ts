import { NextResponse } from "next/server";
import {
  buildBrandedEmailHtml,
  mailUnavailableMessage,
  sendTransactionalMail,
} from "@/lib/mail";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";
import { enquirySchema, isHoneypotTriggered } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    if (isRateLimited(`enquiry:${ip}`, { max: 6 })) {
      return NextResponse.json(
        {
          message:
            "Too many enquiry submissions from this connection. Please wait and try again, or contact us directly.",
        },
        { status: 429 },
      );
    }

    const body = await request.json();
    const parsed = enquirySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Please review the highlighted fields and submit again.",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const payload = parsed.data;
    if (isHoneypotTriggered(payload.website)) {
      return NextResponse.json({
        message: "Thank you. Your enquiry has been received.",
        reference: `SHN-${Date.now().toString().slice(-8)}`,
      });
    }

    const reference = `SHN-${Date.now().toString().slice(-8)}`;
    const textBody = [
      "MAJOR BUSINESS ENQUIRY — shindaraautos.com",
      `Reference: ${reference}`,
      "",
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Phone: ${payload.phone}`,
      `Company: ${payload.company || "—"}`,
      `Country: ${payload.country}`,
      `Enquiry type: ${payload.enquiryType}`,
      `Budget: ${payload.budget || "—"}`,
      `Timeline: ${payload.timeline || "—"}`,
      `Preferred contact: ${payload.preferredContact}`,
      `Vehicle interest: ${payload.vehicleInterest || "—"}`,
      "",
      "Brief:",
      payload.message,
    ].join("\n");

    const result = await sendTransactionalMail({
      subject: `Shindara major enquiry [${reference}] — ${payload.enquiryType}`,
      text: textBody,
      html: buildBrandedEmailHtml({
        title: `Major enquiry ${reference}`,
        intro: "A detailed business enquiry was submitted on shindaraautos.com.",
        rows: [
          { label: "Reference", value: reference },
          { label: "Name", value: payload.name },
          { label: "Email", value: payload.email },
          { label: "Phone", value: payload.phone },
          { label: "Company", value: payload.company || "—" },
          { label: "Country", value: payload.country },
          { label: "Type", value: payload.enquiryType },
          { label: "Budget", value: payload.budget || "—" },
          { label: "Timeline", value: payload.timeline || "—" },
          { label: "Preferred", value: payload.preferredContact },
          { label: "Interest", value: payload.vehicleInterest || "—" },
        ],
        body: payload.message,
      }),
      replyTo: payload.email,
      tags: ["enquiry", "major"],
    });

    if (!result.ok && result.reason === "unconfigured") {
      console.warn("Major enquiry received without mail provider configured.", {
        reference,
        email: payload.email,
        enquiryType: payload.enquiryType,
      });
      return NextResponse.json(
        {
          message: mailUnavailableMessage,
          reference,
        },
        { status: 503 },
      );
    }

    if (!result.ok) {
      return NextResponse.json(
        {
          message:
            "We could not deliver your enquiry right now. Please email hello@shindaraautos.com or oluwasina@shindaraautos.com, or WhatsApp +27 77 389 6008.",
          reference,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      message:
        "Thank you. Your enquiry has been received. Our team will respond with clear next steps.",
      reference,
    });
  } catch (error) {
    console.error("Enquiry API error:", error);
    return NextResponse.json(
      {
        message:
          "Something went wrong while submitting your enquiry. Please try again or contact us directly.",
      },
      { status: 500 },
    );
  }
}
