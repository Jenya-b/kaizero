import net from "node:net";
import tls from "node:tls";

type SendMailOptions = {
  subject: string;
  replyTo?: string;
  text: string;
  html: string;
};

type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
  to: string;
};

type SmtpSocket = net.Socket | tls.TLSSocket;

function getConfig(): SmtpConfig {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.CONTACT_FROM_EMAIL ?? user;
  const to = process.env.CONTACT_TO_EMAIL ?? user;
  const port = Number(process.env.SMTP_PORT ?? 465);
  const secure = process.env.SMTP_SECURE
    ? process.env.SMTP_SECURE === "true"
    : port === 465;

  if (!host || !user || !pass || !from || !to || !Number.isFinite(port)) {
    throw new Error(
      "SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS and CONTACT_TO_EMAIL must be configured",
    );
  }

  return { host, port, secure, user, pass, from, to };
}

function encodeHeader(value: string) {
  return `=?UTF-8?B?${Buffer.from(value).toString("base64")}?=`;
}

function normalizeAddress(value: string) {
  return value.replaceAll(/[\r\n<>]/g, "").trim();
}

function formatAddress(value: string) {
  return `<${normalizeAddress(value)}>`;
}

function createBoundary() {
  return `----contact-form-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2)}`;
}

function buildMessage(config: SmtpConfig, options: SendMailOptions) {
  const boundary = createBoundary();
  const headers = [
    `From: ${formatAddress(config.from)}`,
    `To: ${formatAddress(config.to)}`,
    `Subject: ${encodeHeader(options.subject)}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
  ];

  if (options.replyTo) {
    headers.push(`Reply-To: ${formatAddress(options.replyTo)}`);
  }

  return [
    ...headers,
    "",
    `--${boundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: 8bit",
    "",
    options.text,
    "",
    `--${boundary}`,
    'Content-Type: text/html; charset="UTF-8"',
    "Content-Transfer-Encoding: 8bit",
    "",
    options.html,
    "",
    `--${boundary}--`,
    "",
  ].join("\r\n");
}

function readResponse(socket: SmtpSocket): Promise<string> {
  return new Promise((resolve, reject) => {
    let buffer = "";

    function cleanup() {
      socket.off("data", onData);
      socket.off("error", onError);
    }

    function onError(error: Error) {
      cleanup();
      reject(error);
    }

    function onData(chunk: Buffer) {
      buffer += chunk.toString("utf8");
      const lines = buffer.split(/\r?\n/).filter(Boolean);
      const lastLine = lines.at(-1);

      if (lastLine && /^\d{3} /.test(lastLine)) {
        cleanup();
        resolve(buffer);
      }
    }

    socket.on("data", onData);
    socket.on("error", onError);
  });
}

async function command(socket: SmtpSocket, line: string, expected: number[]) {
  socket.write(`${line}\r\n`);
  const response = await readResponse(socket);
  const code = Number(response.slice(0, 3));

  if (!expected.includes(code)) {
    throw new Error(`SMTP command failed: ${line}; response: ${response}`);
  }

  return response;
}

function connect(config: SmtpConfig): Promise<SmtpSocket> {
  return new Promise((resolve, reject) => {
    const socket = config.secure
      ? tls.connect(config.port, config.host, { servername: config.host })
      : net.connect(config.port, config.host);

    socket.once("connect", () => resolve(socket));
    socket.once("error", reject);
  });
}

function upgradeToTls(socket: SmtpSocket, config: SmtpConfig) {
  return new Promise<tls.TLSSocket>((resolve, reject) => {
    const secureSocket = tls.connect({
      socket,
      servername: config.host,
    });

    secureSocket.once("secureConnect", () => resolve(secureSocket));
    secureSocket.once("error", reject);
  });
}

export async function sendMail(options: SendMailOptions) {
  const config = getConfig();
  let socket = await connect(config);

  try {
    await readResponse(socket);
    await command(socket, `EHLO ${config.host}`, [250]);

    if (!config.secure && process.env.SMTP_STARTTLS !== "false") {
      await command(socket, "STARTTLS", [220]);
      socket = await upgradeToTls(socket, config);
      await command(socket, `EHLO ${config.host}`, [250]);
    }

    await command(
      socket,
      `AUTH PLAIN ${Buffer.from(`\0${config.user}\0${config.pass}`).toString("base64")}`,
      [235],
    );
    await command(socket, `MAIL FROM:${formatAddress(config.from)}`, [250]);
    await command(socket, `RCPT TO:${formatAddress(config.to)}`, [250, 251]);
    await command(socket, "DATA", [354]);
    await command(socket, `${buildMessage(config, options).replaceAll("\r\n.", "\r\n..")}\r\n.`, [
      250,
    ]);
    await command(socket, "QUIT", [221]);
  } finally {
    socket.end();
  }
}
