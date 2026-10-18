import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import type { Vacancy, VacancyInput, VacancyStatus } from "@/lib/vacancy";
import { slugify } from "@/lib/vacancy";

const filePath = path.join(process.cwd(), "data", "vacancies.json");

export async function readVacancies(): Promise<Vacancy[]> {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

async function writeVacancies(vacancies: Vacancy[]): Promise<void> {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(vacancies, null, 2), "utf8");
}

function uniqueSlug(base: string, vacancies: Vacancy[], exceptId?: string): string {
  const slug = slugify(base) || "vacancy";
  const taken = new Set(
    vacancies
      .filter((v) => v.id !== exceptId)
      .map((v) => v.slug),
  );
  let candidate = slug;
  let i = 2;
  while (taken.has(candidate)) {
    candidate = `${slug}-${i}`;
    i += 1;
  }
  return candidate;
}

export async function createVacancy(input: VacancyInput): Promise<Vacancy> {
  const all = await readVacancies();
  const now = new Date().toISOString();
  const vacancy: Vacancy = {
    id: randomUUID(),
    slug: uniqueSlug(input.title, all),
    ...input,
    createdAt: now,
    updatedAt: now,
  };
  await writeVacancies([...all, vacancy]);
  return vacancy;
}

export async function updateVacancy(
  slug: string,
  input: VacancyInput,
): Promise<Vacancy | null> {
  const all = await readVacancies();
  const index = all.findIndex((v) => v.slug === slug);
  if (index === -1) return null;
  const updated: Vacancy = {
    ...all[index],
    ...input,
    slug: uniqueSlug(input.title, all, all[index].id),
    updatedAt: new Date().toISOString(),
  };
  all[index] = updated;
  await writeVacancies(all);
  return updated;
}

export async function deleteVacancy(slug: string): Promise<boolean> {
  const all = await readVacancies();
  const next = all.filter((v) => v.slug !== slug);
  if (next.length === all.length) return false;
  await writeVacancies(next);
  return true;
}

export function sanitizeStatus(value: unknown): VacancyStatus {
  return value === "draft" || value === "closed" ? value : "open";
}

export function sanitizeVacancyInput(body: Record<string, unknown>): VacancyInput {
  const text = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  return {
    title: text(body.title),
    department: text(body.department) || "General",
    location: text(body.location) || "Addis Ababa",
    type: text(body.type) || "Full-time",
    postedDate: text(body.postedDate),
    closingDate: text(body.closingDate),
    summary: text(body.summary),
    description: text(body.description),
    requirements: text(body.requirements),
    status: sanitizeStatus(body.status),
  };
}