import { getExperiences, saveExperiences } from "@/lib/experiences";

function isAuthorized(req: Request): boolean {
  if (!process.env.ADMIN_PASSWORD) return false;
  return req.headers.get("authorization") === `Bearer ${process.env.ADMIN_PASSWORD}`;
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(req)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();
  const data = getExperiences();
  const idx = data.findIndex((e) => e.id === id);
  if (idx === -1) return Response.json({ error: "Not found" }, { status: 404 });

  data[idx] = { ...data[idx], ...body };
  saveExperiences(data);
  return Response.json(data[idx]);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(req)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  saveExperiences(getExperiences().filter((e) => e.id !== id));
  return Response.json({ ok: true });
}
