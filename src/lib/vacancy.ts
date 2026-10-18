export type VacancyStatus = "open" | "draft" | "closed";

export interface Vacancy {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  postedDate: string;
  closingDate: string;
  summary: string;
  description: string;
  requirements: string;
  status: VacancyStatus;
  createdAt: string;
  updatedAt: string;
}

export interface VacancyInput {
  title: string;
  department: string;
  location: string;
  type: string;
  postedDate: string;
  closingDate: string;
  summary: string;
  description: string;
  requirements: string;
  status: VacancyStatus;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export function formatDate(iso: string): string {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function isOpen(vacancy: Vacancy): boolean {
  if (vacancy.status !== "open") return false;
  if (vacancy.closingDate) {
    const closing = new Date(vacancy.closingDate);
    if (!Number.isNaN(closing.getTime()) && closing.getTime() < Date.now()) return false;
  }
  return true;
}