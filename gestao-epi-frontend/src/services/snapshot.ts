import { loadSnapshot, saveSnapshot } from "./storage";
import type { Snapshot } from "../models/domain";

export async function getSnapshot(): Promise<Snapshot | null> {
  const { data } = loadSnapshot<Snapshot>();
  if (data) return data;
  try {
    const resp = await fetch("/snapshot.json", { cache: "no-store" });
    if (resp.ok) {
      const json: Snapshot = await resp.json();
      saveSnapshot(json);
      return json;
    }
  } catch {}
  return null;
}
