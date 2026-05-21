import fs from "fs";
import path from "path";

export type Experience = {
  id: string;
  role: string;
  org: string;
  period: string;
  desc: string;
};

const FILE = path.join(process.cwd(), "data", "experiences.json");

export function getExperiences(): Experience[] {
  return JSON.parse(fs.readFileSync(FILE, "utf-8")) as Experience[];
}

export function saveExperiences(data: Experience[]): void {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}
