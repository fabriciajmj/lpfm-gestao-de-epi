const SNAP_KEY = "gestao-epi-snapshot-v1";
const QUEUE_KEY = "gestao-epi-queue-v1";

export function saveSnapshot(data: unknown) {
  localStorage.setItem(SNAP_KEY, JSON.stringify({ data, ts: Date.now() }));
}
export function loadSnapshot<T>(): { data: T | null; ts: number | null } {
  const raw = localStorage.getItem(SNAP_KEY);
  if (!raw) return { data: null, ts: null };
  try {
    const parsed = JSON.parse(raw);
    return { data: parsed.data as T, ts: parsed.ts ?? null };
  } catch { return { data: null, ts: null }; }
}
export function clearSnapshot() { localStorage.removeItem(SNAP_KEY); }

export function pushQueue(op: unknown) {
  const arr = JSON.parse(localStorage.getItem(QUEUE_KEY) || "[]");
  arr.push(op);
  localStorage.setItem(QUEUE_KEY, JSON.stringify(arr));
}
export function loadQueue<T=unknown[]>(): T {
  return JSON.parse(localStorage.getItem(QUEUE_KEY) || "[]");
}
export function clearQueue() { localStorage.removeItem(QUEUE_KEY); }
export function setQueue(arr: unknown[]) {
  localStorage.setItem(QUEUE_KEY, JSON.stringify(arr));
}
