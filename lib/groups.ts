export type ChipColors = {
  background: string;
  text: string;
};

export type UserGroup = {
  id: string;
  name: string;
  count: number;
  frequent: boolean;
  kind: "User group" | "User";
};

// Palette from Figma — each group gets the next color in rotation.
export const GROUP_COLOR_PALETTE: ChipColors[] = [
  { background: "rgba(144, 194, 231, 0.3)", text: "#14588c" },
  { background: "rgba(252, 231, 98, 0.2)", text: "#998401" },
  { background: "rgba(215, 193, 173, 0.3)", text: "#a16e40" },
  { background: "rgba(116, 154, 170, 0.15)", text: "#568ba2" },
  { background: "rgba(102, 38, 81, 0.1)", text: "#662651" },
  { background: "rgba(214, 232, 176, 0.28)", text: "#66881d" },
];

export const USER_GROUPS: UserGroup[] = [
  {
    id: "copenhagen-hq",
    name: "Copenhagen HQ",
    count: 109,
    frequent: true,
    kind: "User group",
  },
  {
    id: "internal",
    name: "Internal",
    count: 49,
    frequent: true,
    kind: "User group",
  },
  {
    id: "london-hq",
    name: "London HQ",
    count: 19,
    frequent: true,
    kind: "User group",
  },
  {
    id: "london-1st-floor",
    name: "London 1st floor",
    count: 10,
    frequent: true,
    kind: "User group",
  },
  {
    id: "everyone",
    name: "Everyone",
    count: 503,
    frequent: true,
    kind: "User group",
  },
  {
    id: "tokyo-hq",
    name: "Tokyo HQ",
    count: 109,
    frequent: false,
    kind: "User group",
  },
  {
    id: "tokyo-central",
    name: "Tokyo Central",
    count: 89,
    frequent: false,
    kind: "User group",
  },
  {
    id: "tokyo-east",
    name: "Tokyo East",
    count: 19,
    frequent: false,
    kind: "User group",
  },
  {
    id: "tokyo-hr",
    name: "Tokyo HR",
    count: 4,
    frequent: false,
    kind: "User group",
  },
];

export function getGroupColor(groupId: string): ChipColors {
  const index = USER_GROUPS.findIndex((group) => group.id === groupId);
  const paletteIndex =
    index >= 0 ? index % GROUP_COLOR_PALETTE.length : 0;

  return GROUP_COLOR_PALETTE[paletteIndex];
}

export function filterGroups(query: string): UserGroup[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  return USER_GROUPS.filter((group) =>
    group.name.toLowerCase().includes(normalized),
  );
}

export function getFrequentGroups(): UserGroup[] {
  return USER_GROUPS.filter((group) => group.frequent);
}

export function formatUserCount(count: number): string {
  return `${count} user${count === 1 ? "" : "s"}`;
}
