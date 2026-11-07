"use client";

import { useState } from "react";

// Layer 03 · Data. Admin / Analyst / Viewer tiers (CV: Cyber-Guardian RBAC).
// Rows are neutral mock data, labelled as such; no client data.
type Role = "Admin" | "Analyst" | "Viewer";
type Action = "view" | "edit" | "assign" | "delete" | "manageUsers";

const PERMISSIONS: Record<Role, Action[]> = {
  Admin: ["view", "edit", "assign", "delete", "manageUsers"],
  Analyst: ["view", "edit", "assign"],
  Viewer: ["view"],
};
const can = (role: Role, action: Action) => PERMISSIONS[role].includes(action);

const ROWS = [
  { id: "INC-1042", title: "Credential leak alert", severity: "High" },
  { id: "INC-1043", title: "Look-alike domain", severity: "Medium" },
  { id: "INC-1044", title: "Brand impersonation", severity: "Low" },
];

export default function RbacDemo() {
  const [role, setRole] = useState<Role>("Analyst");
  return (
    <div>
      <div role="group" aria-label="Role" className="mb-4 flex flex-wrap gap-2">
        {(Object.keys(PERMISSIONS) as Role[]).map((r) => (
          <button
            key={r}
            type="button"
            aria-pressed={role === r}
            onClick={() => setRole(r)}
            className={`min-h-11 rounded-full border px-5 text-[14px] font-semibold ${role === r ? "border-accent bg-accent text-bg" : "border-line text-secondary"}`}
          >
            {r}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between gap-3">
        <p className="mono-label">Incidents · mock data</p>
        {can(role, "manageUsers") ? (
          <span className="rounded-full border border-line px-3 py-1 text-[12px]">Manage users</span>
        ) : role === "Viewer" ? (
          <span className="rounded-full border border-line px-3 py-1 text-[12px] text-muted">Read-only</span>
        ) : null}
      </div>

      <ul className="mt-3 grid gap-2">
        {ROWS.map((row) => (
          <li key={row.id} className="rounded-xl border border-line bg-surface-2 p-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-semibold">
                <span className="mr-2 font-mono text-[12px] text-muted">{row.id}</span>
                {row.title}
              </p>
              <span className="font-mono text-[12px] text-secondary">{row.severity}</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {(["edit", "assign", "delete"] as const)
                .filter((a) => can(role, a))
                .map((a) => (
                  <span key={a} className="rounded-full border border-line px-3 py-1 text-[12px] capitalize">
                    {a}
                  </span>
                ))}
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-4 font-mono text-[12px] leading-relaxed text-muted">
        One permission map, one can(role, action) check. In a real app the server enforces the same
        map; the UI only mirrors it.
      </p>
    </div>
  );
}
