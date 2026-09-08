import { Resend } from "resend";
import { PROFILE } from "@/lib/data";
import { rateLimit } from "@/lib/rate-limit";

interface ContactPayload {
  name?: string;
  email?: string;
  message?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Max 5 submissions per IP per 10 minutes.
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

function json(body: unknown, status = 200, headers?: HeadersInit) {
  return Response.json(body, { status, headers });
}

function clientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  // Throttle before doing any work.
  const { ok: allowed, retryAfter } = rateLimit(
    `contact:${clientIp(request)}`,
    RATE_LIMIT,
    RATE_WINDOW_MS,
  );
  if (!allowed) {
    return json(
      { ok: false, error: "Too many messages. Please try again later." },
      429,
      { "Retry-After": String(retryAfter) },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Not configured — the client falls back to a mailto: handoff.
    return json({ ok: false, error: "Email service not configured." }, 503);
  }

  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return json({ ok: false, error: "Invalid request body." }, 400);
  }

  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const message = payload.message?.trim() ?? "";

  if (!name || !email || !message) {
    return json({ ok: false, error: "All fields are required." }, 400);
  }
  if (!EMAIL_RE.test(email)) {
    return json({ ok: false, error: "Enter a valid email address." }, 400);
  }
  if (message.length > 5000) {
    return json({ ok: false, error: "Message is too long." }, 400);
  }

  const to = process.env.CONTACT_TO || PROFILE.email;
  const from = process.env.CONTACT_FROM || "Portfolio <onboarding@resend.dev>";

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Portfolio contact — ${name}`,
      text: `${message}\n\n— ${name} <${email}>`,
      html: `
        <div style="font-family:ui-sans-serif,system-ui,sans-serif;line-height:1.6;color:#111">
          <p style="white-space:pre-wrap;margin:0 0 16px">${escapeHtml(message)}</p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0" />
          <p style="margin:0;font-size:13px;color:#555">
            From <strong>${escapeHtml(name)}</strong> ·
            <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>
          </p>
        </div>`,
    });

    if (error) {
      return json({ ok: false, error: error.message ?? "Failed to send." }, 502);
    }
    return json({ ok: true, id: data?.id });
  } catch {
    return json({ ok: false, error: "Failed to send. Please try again." }, 502);
  }
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
