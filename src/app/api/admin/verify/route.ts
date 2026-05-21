export async function POST(req: Request) {
  if (!process.env.ADMIN_PASSWORD) {
    return Response.json({ error: "ADMIN_PASSWORD not set" }, { status: 500 });
  }

  const { password } = await req.json();
  if (password === process.env.ADMIN_PASSWORD) {
    return Response.json({ ok: true });
  }
  return Response.json({ ok: false }, { status: 401 });
}
