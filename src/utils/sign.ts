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
  const api = url.split('?')[0];
  const [signedHeaders, canonicalHeaders] = getSignHeaders(headers as Record<string, string>);
  const hexHashBody = hexEncodedBodyHash(data, headers['Content-Type']);
  const canonicalRequest = [
    method.toUpperCase(),
    api.startsWith('/') ? api : `/${api}`,
    queryParamsToString(params) || '',
    `${canonicalHeaders}\n`,
    signedHeaders,
    hexHashBody
  ].join('\n');

  const credential = [shortDate, fingerprint, 'oljc'].join('/');
  const signString = ['LJC-HMAC-SHA256', date, credential, hexHash(canonicalRequest)].join('\n');
  const kDate = hexHmac(secretAccessKey, date);
  const kFingerprint = hexHmac(kDate, fingerprint);
  const kSigning = hexHmac(kFingerprint, 'oljc');
  const signature = hexHmac(kSigning, signString).toString();

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

function hexHmac(key: string | Buffer, string: string): string {
  const keyBytes = toBytes(key);
  const stringBytes = toBytes(string);
  const hash = hmac(sha256, keyBytes, stringBytes);
  return bytesToHex(hash);
}

function hexHash(data: string | Buffer): string {
  const dataBytes = toBytes(data);
  const hash = sha256(dataBytes);
  return bytesToHex(hash);
}

function getDateTimeNow() {
  const now = new Date();
  return now.toISOString().replace(/[:-]|\.\d{3}/g, '');
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

const uriEscape = (str: string): string => {
  try {
    return encodeURIComponent(str).replace(/[^A-Za-z0-9_.~\-%]/g, char => {
      const hex = char.charCodeAt(0).toString(16).toUpperCase();
      return `%${hex.padStart(2, '0')}`;
    });
  } catch {
    return '';
  }
};

function getSignHeaders(headers: Record<string, string>) {
  function trimHeader(header: string) {
    return header.toString?.().trim().replace(/\s+/g, ' ') ?? '';
  }

  let h = Object.keys(headers);
  h = h.filter(k => !IGNORE_HEADER.has(k.toLowerCase()));
  const signedHeaderKeys = h
    .slice()
    .map(k => k.toLowerCase())
    .sort()
    .join(';');
  const canonicalHeaders = h
    .sort((a, b) => (a.toLowerCase() < b.toLowerCase() ? -1 : 1))
    .map(k => `${k.toLowerCase()}:${trimHeader(headers[k])}`)
    .join('\n');
  return [signedHeaderKeys, canonicalHeaders];
}

function hexEncodedBodyHash(data: any, contentType: string = ''): string {
  if (!data) return hexHash('');
  if (typeof data === 'string') return hexHash(data);

  contentType = contentType.toLowerCase();
  if (contentType.includes('application/json')) {
    return hexHash(JSON.stringify(data, Object.keys(data).sort()));
  }

  if (contentType.includes('form-urlencoded')) {
    return hexHash(queryParamsToString(data));
  }

  return hexHash(JSON.stringify(data, Object.keys(data).sort()));
}
