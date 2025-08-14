import { hmac } from '@noble/hashes/hmac';
import { sha256 } from '@noble/hashes/sha2';
import { utf8ToBytes, bytesToHex } from '@noble/hashes/utils';
import { AxiosHeaders, AxiosRequestConfig } from 'axios';

const IGNORE_HEADER = new Set([
  'authorization',
  'content-type',
  'content-length',
  'user-agent',
  'presigned-expires',
  'expect'
]);

const accessKeyId = import.meta.env.VITE_ACCESS_ID || '';
const secretAccessKey = import.meta.env.VITE_ACCESS_SECRET || '';

export function signer(config: AxiosRequestConfig) {
  const date = new Date().toISOString().replace(/[:-]|\.\d{3}/g, '');
  const shortDate = date.substring(0, 8);
  const fingerprint = localStorage.getItem('fingerprint') || '';

  config.headers['X-Fingerprint'] = fingerprint;
  config.headers['X-Date'] = date;

  const { method, url, headers = {}, params, data } = config;
  const u = new URL(url!, 'http://localhost');
  const apiPath = u.pathname;
  const queryString = buildQueryString(u, params);
  const [signedHeaders, canonicalHeaders] = buildHeaders(headers);
  const payloadHash = hashBody(data, headers['Content-Type']);

  const canonicalRequest = [
    method.toUpperCase(),
    apiPath,
    queryString,
    `${canonicalHeaders}\n`,
    signedHeaders,
    payloadHash
  ].join('\n');

  const credential = [shortDate, fingerprint, 'oljc'].join('/');
  const stringToSign = ['LJC-HMAC-SHA256', date, credential, hashHex(canonicalRequest)].join('\n');

  const kDate = hmacHex(secretAccessKey, date);
  const kFingerprint = hmacHex(kDate, fingerprint);
  const kSigning = hmacHex(kFingerprint, 'oljc');
  const signature = hmacHex(kSigning, stringToSign);

  config.headers['Authorization'] = [
    'LJC-HMAC-SHA256',
    `Credential=${accessKeyId}/${credential},`,
    `SignedHeaders=${signedHeaders},`,
    `Signature=${signature}`
  ].join(' ');
}

function toBytes(data: string | Uint8Array): Uint8Array {
  return typeof data === 'string' ? utf8ToBytes(data) : new Uint8Array(data);
}
function hmacHex(key: string | Uint8Array, message: string): string {
  return bytesToHex(hmac(sha256, toBytes(key), toBytes(message)));
}
function hashHex(data: string | Uint8Array): string {
  return bytesToHex(sha256(toBytes(data)));
}
function stableJsonStringify(obj: any): string {
  if (obj === null || typeof obj !== 'object') return String(obj ?? '');
  const keys = Object.keys(obj).sort();
  const result: any = {};
  for (const k of keys) result[k] = obj[k];
  return JSON.stringify(result);
}

function buildQueryString(url: URL, params?: Record<string, any>): string {
  const entries: [string, string][] = [...url.searchParams.entries()];

  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v === undefined || v === null) return;
      if (Array.isArray(v))
        v.slice()
          .sort()
          .forEach(val => entries.push([k, String(val)]));
      else entries.push([k, String(v)]);
    });
  }

  return entries
    .sort(([aKey, aVal], [bKey, bVal]) => {
      const keyCompare = aKey.localeCompare(bKey);
      return keyCompare !== 0 ? keyCompare : aVal.localeCompare(bVal);
    })
    .map(([k, v]) => `${uriEscape(k)}=${uriEscape(v)}`)
    .join('&');
}

function buildHeaders(headers: AxiosHeaders | Record<string, any>) {
  const trim = (v: string) => v?.trim().replace(/\s+/g, ' ') ?? '';
  const keys = Object.keys(headers)
    .filter(k => !IGNORE_HEADER.has(k.toLowerCase()))
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

  const signedHeaderKeys = keys.map(k => k.toLowerCase()).join(';');
  const canonicalHeaders = keys.map(k => `${k.toLowerCase()}:${trim(headers[k])}`).join('\n');

  return [signedHeaderKeys, canonicalHeaders];
}

function hashBody(data: any, contentType: string = ''): string {
  if (!data) return hashHex('');
  contentType = (contentType || '').toLowerCase();
  if (typeof data === 'string') return hashHex(data);
  if (contentType.includes('application/json')) return hashHex(stableJsonStringify(data));
  if (contentType.includes('form-urlencoded')) return hashHex(buildFormQuery(data));
  return hashHex(stableJsonStringify(data));
}

function buildFormQuery(params: Record<string, any>): string {
  return Object.keys(params)
    .sort()
    .map(k => {
      const val = params[k];
      const escapedKey = uriEscape(k);
      if (Array.isArray(val)) return val.map(v => `${escapedKey}=${uriEscape(v)}`).join('&');
      return `${escapedKey}=${uriEscape(val)}`;
    })
    .join('&');
}

function uriEscape(str: string): string {
  return encodeURIComponent(str).replace(
    /[!*'()]/g,
    c => `%${c.charCodeAt(0).toString(16).toUpperCase()}`
  );
}
