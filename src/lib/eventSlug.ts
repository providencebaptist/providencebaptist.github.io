// Helpers for grouping events by name and routing to a per-event detail page.

// Strip trailing variants like " - Day 1", " - Night 2", " (Part 3)", "- Session 4"
// so multi-day events collapse to a single group.
export function getEventGroupName(name: string): string {
  return name
    .replace(/\s*[-–—]\s*(day|night|part|session|evening)\s*\d+\s*$/i, "")
    .replace(/\s*\((day|night|part|session|evening)\s*\d+\)\s*$/i, "")
    .trim();
}

export function slugifyEvent(name: string): string {
  return getEventGroupName(name)
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[''"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function eventDetailPath(name: string): string {
  return `/events/${slugifyEvent(name)}`;
}
