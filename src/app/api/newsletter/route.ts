import { NextResponse } from "next/server";
import { mailUnavailableMessage, sendTransactionalMail } from "@/lib/mail";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";
import { isHoneypotTriggered, newsletterSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    if (isRateLimited(`newsletter:${ip}`, { max: 5, windowMs: 60 * 60 * 1000 })) {
      return NextResponse.json(
        { message: "Too many subscription attempts. Please try again later." },
        { status: 429 },
      );
    }

    const body = await request.json();
    const parsed = newsletterSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Please enter a valid email address.",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const payload = parsed.data;
    if (isHoneypotTriggered(payload.website)) {
      return NextResponse.json({
        message: "You are subscribed. Thank you.",
      });
    }

    const textBody = [
      "Newsletter subscription — shindaraautos.com",
      "",
      `Email: ${payload.email}`,
      `Name: ${payload.name || "—"}`,
      `Source: ${payload.source || "website"}`,
      `Timestamp: ${new Date().toISOString()}`,
    ].join("\n");

    const result = await sendTransactionalMail({
      subject: `Shindara newsletter signup — ${payload.email}`,
      text: textBody,
      replyTo: payload.email,
      tags: ["newsletter"],
    });

    if (!result.ok && result.reason === "unconfigured") {
      console.warn("Newsletter signup without mail provider configured.", {
        email: payload.email,
      });
      return NextResponse.json({ message: mailUnavailableMessage }, { status: 503 });
    }

    if (!result.ok) {
      return NextResponse.json(
        {
          message:
            "We could not complete your subscription right now. Please email hello@shindaraautos.com.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      message: "Thank you for subscribing. We will keep you informed with care.",
    });
  } catch (error) {
    console.error("Newsletter API error:", error);
    return NextResponse.json(
      {
        message:
          "Something went wrong while processing your subscription. Please try again.",
      },
      { status: 500 },
    );
  }
}
