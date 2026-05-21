import { getExperiences, saveExperiences, type Experience } from "@/lib/experiences";

function isAuthorized(req: Request): boolean {
  if (!process.env.ADMIN_PASSWORD) return false;
  return req.headers.get("authorization") === `Bearer ${process.env.ADMIN_PASSWORD}`;
}

export async function GET() {
  return Response.json(getExperiences());
}

export async function POST(req: Request) {
  if (!isAuthorized(req)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const data = getExperiences();
  const entry: Experience = { id: crypto.randomUUID(), ...body };
  data.unshift(entry);
  saveExperiences(data);
  return Response.json(entry, { status: 201 });
}
