import { readFileSync } from "node:fs";
import path from "node:path";

import Canvas from "@/components/Canvas";

function getCubeArray(): number[][] {
  const csv = readFileSync(
    path.join(__dirname, "../../../posthog_cleaned.csv")
  );
  const lines = csv.toString().split("\n").slice(1);
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const rowCache = new Map();
  let nextRow = 0;
  const data: number[][] = [];
  for (const line of lines) {
    const [email, dateStr, ct] = line.split(",");
    if (!rowCache.has(email)) {
      rowCache.set(email, nextRow++);
    }
    const rowId = rowCache.get(email);
    const dt = new Date(dateStr);
    const daysAgo = (+today - +dt) / (24 * 60 * 60 * 1000);
    data[rowId] ??= [];
    if (daysAgo > 100) continue;
    data[rowId][99 - daysAgo] = parseInt(ct);
  }

  return data;
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Canvas data={getCubeArray()} />
    </main>
  );
}
