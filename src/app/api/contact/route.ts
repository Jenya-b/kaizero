import { NextResponse } from "next/server";
import { sendMail } from "@/lib/smtp";

type ContactPayload = {
  name?: unknown;
  company?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  const name = getString(payload.name);
  const company = getString(payload.company);
  const email = getString(payload.email);
  const phone = getString(payload.phone);
  const message = getString(payload.message);

  if (!name || !email || !phone) {
    return NextResponse.json(
      { error: "Имя, телефон и email обязательны для заполнения" },
      { status: 400 },
    );
  }

  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: "Некорректный email" }, { status: 400 });
  }

  try {
    await sendMail({
      subject: `Новая заявка с сайта: ${name}`,
      replyTo: email,
      text: [
        `Имя: ${name}`,
        `Телефон: ${phone}`,
        `Email: ${email}`,
        company ? `Компания: ${company}` : null,
        message ? `Сообщение: ${message}` : null,
      ]
        .filter(Boolean)
        .join("\n"),
      html: `
        <h2>Новая заявка с сайта</h2>
        <p><strong>Имя:</strong> ${escapeHtml(name)}</p>
        <p><strong>Телефон:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${company ? `<p><strong>Компания:</strong> ${escapeHtml(company)}</p>` : ""}
        ${message ? `<p><strong>Сообщение:</strong><br>${escapeHtml(message).replaceAll("\n", "<br>")}</p>` : ""}
      `,
    });
  } catch (error) {
    console.error("Contact form mail error", error);
    return NextResponse.json(
      { error: "Не удалось отправить заявку" },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
