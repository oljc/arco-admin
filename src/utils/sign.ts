import { hmac } from '@noble/hashes/hmac';
import { sha256 } from '@noble/hashes/sha2';
import { utf8ToBytes, bytesToHex } from '@noble/hashes/utils';
import { AxiosRequestConfig } from 'axios';

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
  const date = getDateTimeNow();
  const shortDate = date.substring(0, 8);
  const fingerprint = localStorage.getItem('fingerprint');
  config.headers['X-Fingerprint'] = fingerprint;
  config.headers['X-Date'] = date;

  const { method, url, headers, params, data } = config;
  const u = new URL(url!, 'http://localhost');
  const api = u.pathname;
  const queryString = getQueryParams(u, params);

  const [signedHeaders, canonicalHeaders] = getSignHeaders(headers as Record<string, string>);
  const hexHashBody = hexEncodedBodyHash(data, headers?.['Content-Type']);
  const canonicalRequest = [
    method.toUpperCase(),
    api,
    queryString,
    `${canonicalHeaders}\n`,
    signedHeaders,
    hexHashBody
  ].join('\n');

  const credential = [shortDate, fingerprint, 'oljc'].join('/');
  const signString = ['LJC-HMAC-SHA256', date, credential, hexHash(canonicalRequest)].join('\n');
  const kDate = hexHmac(secretAccessKey, date);
  const kFingerprint = hexHmac(kDate, fingerprint);
  const kSigning = hexHmac(kFingerprint, 'oljc');
  const signature = hexHmac(kSigning, signString);

  config.headers['Authorization'] = [
    'LJC-HMAC-SHA256',
    `Credential=${accessKeyId}/${credential},`,
    `SignedHeaders=${signedHeaders},`,
    `Signature=${signature}`
  ].join(' ');
}

function toBytes(data: string | Buffer): Uint8Array {
  return typeof data === 'string' ? utf8ToBytes(data) : new Uint8Array(data);
}

function hexHmac(key: string | Buffer, message: string): string {
  return bytesToHex(hmac(sha256, toBytes(key), toBytes(message)));
}

function hexHash(data: string | Buffer): string {
  return bytesToHex(sha256(toBytes(data)));
}

function getDateTimeNow(): string {
  return new Date().toISOString().replace(/[:-]|\.\d{3}/g, '');
}

function stableJsonStringify(obj: any): string {
  if (typeof obj !== 'object' || obj === null) return String(obj);
  return JSON.stringify(obj, Object.keys(obj).sort());
}

function getQueryParams(urlObj: URL, params?: Record<string, any>): string {
  const searchParams = new URLSearchParams(urlObj.search);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (Array.isArray(value)) {
        for (const v of value) searchParams.append(key, v);
      } else if (value !== undefined && value !== null) {
        searchParams.set(key, value);
      }
    }
  }

  return [...searchParams.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${uriEscape(k)}=${uriEscape(v)}`)
    .join('&');
}

function queryParamsToString(params) {
  return Object.keys(params)
    .sort()
    .map(key => {
      const val = params[key];
      if (typeof val === 'undefined' || val === null) {
        return undefined;
      }
      const escapedKey = uriEscape(key);
      if (!escapedKey) {
        return undefined;
      }
      if (Array.isArray(val)) {
        return `${escapedKey}=${val.map(uriEscape).sort().join(`&${escapedKey}=`)}`;
      }
      return `${escapedKey}=${uriEscape(val)}`;
    })
    .filter(v => v)
    .join('&');
}

function uriEscape(str: string): string {
  try {
    return encodeURIComponent(str).replace(
      /[^A-Za-z0-9_.~\-%]/g,
      c => `%${c.charCodeAt(0).toString(16).toUpperCase().padStart(2, '0')}`
    );
  } catch {
    return '';
  }
}

function getSignHeaders(headers: Record<string, string>) {
  const trim = (val: string) => val?.toString()?.trim()?.replace(/\s+/g, ' ') ?? '';
  const keys = Object.keys(headers).filter(k => !IGNORE_HEADER.has(k.toLowerCase()));

  const signedHeaderKeys = keys
    .map(k => k.toLowerCase())
    .sort()
    .join(';');
  const canonicalHeaders = keys
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
    .map(k => `${k.toLowerCase()}:${trim(headers[k])}`)
    .join('\n');

  return [signedHeaderKeys, canonicalHeaders];
}

function hexEncodedBodyHash(data: any, contentType: string = ''): string {
  if (!data) return hexHash('');
  if (typeof data === 'string') return hexHash(data);

  contentType = contentType.toLowerCase();
  if (contentType.includes('application/json')) {
    return hexHash(stableJsonStringify(data));
  }

  if (contentType.includes('form-urlencoded')) {
    return hexHash(queryParamsToString(data));
  }

  return hexHash(stableJsonStringify(data));
}
