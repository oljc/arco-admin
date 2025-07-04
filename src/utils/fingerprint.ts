import { load } from '@fingerprintjs/fingerprintjs';

export async function initFingerprint() {
  try {
    const fp = await load();
    const result = await fp.get();
    localStorage.setItem('fingerprint', result.visitorId);
  } catch (error) {
    //
  }
}