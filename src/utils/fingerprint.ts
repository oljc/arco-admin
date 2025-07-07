import { load } from '@fingerprintjs/fingerprintjs';

function randomId(): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 15);
  return `${timestamp}${randomStr}`;
}

export async function initFingerprint() {
  try {
    const fp = await load();
    const result = await fp.get();
    const id = result.visitorId || randomId();
    localStorage.setItem('fingerprint', id);
  } catch {
    localStorage.setItem('fingerprint', randomId());
  }
}
