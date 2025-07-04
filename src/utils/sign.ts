import { hmac } from '@noble/hashes/hmac';
import { sha256 } from '@noble/hashes/sha2';
import { utf8ToBytes, bytesToHex } from "@noble/hashes/utils";

function toBytes(data: string | Buffer): Uint8Array {
  return typeof data === 'string' ? utf8ToBytes(data) : new Uint8Array(data);
}

function hmacSHA256(key: string | Buffer, string: string): string {
  const keyBytes = toBytes(key);
  const stringBytes = toBytes(string);
  const hash = hmac(sha256, keyBytes, stringBytes);
  return bytesToHex(hash);
}

function hexEncodedHash(data: string | Buffer): string {
  const dataBytes = toBytes(data);
  const hash = sha256(dataBytes);
  return bytesToHex(hash);
}


interface RequestObj {
  region: string;
  method: string;
  params?: any;
  pathname?: string;
  headers?: any;
  body?: any;
}

interface Credentials {
  accessKeyId: string;
  secretKey: string;
  sessionToken?: string;
}

const unsignableHeaders = [
  "authorization",
  "content-type",
  "content-length",
  "user-agent",
  "presigned-expires",
  "expect",
];


const uriEscape = (str: string): string => {
  try {
    return encodeURIComponent(str)
      .replace(/[^A-Za-z0-9_.~\-%]+/g, (match) => {
        return match.split('').map(ch =>
          `%${ch.charCodeAt(0).toString(16).toUpperCase().padStart(2, '0')}`
        ).join('');
      })
      .replace(/[*]/g, (ch) => `%${ch.charCodeAt(0).toString(16).toUpperCase()}`);
  } catch (e) {
    return "";
  }
};

export const queryParamsToString = (params: Record<string, any>): string =>
  Object.keys(params)
    .map((key) => {
      const val = params[key];
      if (typeof val === "undefined" || val === null) {
        return;
      }

      const escapedKey = uriEscape(key);
      if (!escapedKey) {
        return;
      }

      if (Array.isArray(val)) {
        return `${escapedKey}=${val.map(uriEscape).sort().join(`&${escapedKey}=`)}`;
      }

      return `${escapedKey}=${uriEscape(val)}`;
    })
    .filter((v) => v)
    .join("&");

export default class Signer {
  request: RequestObj;

  constructor(request: RequestObj) {
    this.request = request;
    this.request.headers = request.headers || {};
    this.request.params = this.sortParams(this.request.params);
  }

  sortParams(params: Record<string, any>): Record<string, any> {
    const newParams: Record<string, any> = {};
    if (params) {
      Object.keys(params)
        .filter((key) => {
          const value = params[key];
          return typeof value !== "undefined" && value !== null;
        })
        .sort()
        .map((key) => {
          newParams[key] = params[key];
        });
    }
    return newParams;
  }

  addAuthorization(credentials: Credentials, date?: Date): void {
    const datetime = this.getDateTime(date);
    this.addHeaders(credentials, datetime);
    this.request.headers["Authorization"] = this.authorization(credentials, datetime);
  }

  authorization(credentials: Credentials, datetime: string): string {
    const parts: string[] = [];
    const credString = this.credentialString(datetime);
    parts.push(`OLJC-HMAC-SHA256 Credential=${credentials.accessKeyId}/${credString}`);
    parts.push(`SignedHeaders=${this.signedHeaders()}`);
    parts.push(`Signature=${this.signature(credentials, datetime)}`);
    return parts.join(", ");
  }

  getSignUrl(credentials: Credentials, date?: Date): string {
    const datetime = this.getDateTime(date);
    let query = { ...this.request.params };
    const params = this.request.params;
    const headers = this.request.headers;
    if (credentials.sessionToken) {
      query['X-Security-Token'] = credentials.sessionToken;
    }
    query['X-Date'] = datetime;
    query['X-Credential'] = `${credentials.accessKeyId}/${this.credentialString(datetime)}`;
    query['X-Algorithm'] = 'HMAC-SHA256';
    query['X-SignedHeaders'] = "";
    query['X-SignedQueries'] = undefined;
    query['X-Signature'] = undefined;
    query = this.sortParams(query);
    this.request.params = query;
    this.request.headers = {};
    const sig = this.signature(credentials, datetime);
    this.request.params = params;
    this.request.headers = headers;
    query['X-SignedQueries'] = Object.keys(query).sort().join(";");
    query['X-Signature'] = sig;
    return queryParamsToString(query);
  }

  getDateTime(date?: Date): string {
    return this.iso8601(date).replace(/[:\-]|\.\d{3}/g, "");
  }

  addHeaders(credentials: Credentials, datetime: string): void {
    this.request.headers['X-Date'] = datetime;
    if (credentials.sessionToken) {
      this.request.headers['X-Security-Token'] = credentials.sessionToken;
    }
    if (this.request.body) {
      let body = this.request.body;
      if (typeof body !== "string") {
        if (body instanceof URLSearchParams) {
          body = body.toString();
        } else if (body instanceof FormData) {
          body = '[FormData]';
        } else {
          body = JSON.stringify(body);
        }
      }
      this.request.headers['X-Content-Sha256'] = hexEncodedHash(body);
    }
  }

  signature(credentials: Credentials, datetime: string): string {
    const signingKey = this.getSigningKey(
      credentials,
      datetime.substring(0, 8),
      this.request.region
    );
    return hmacSHA256(signingKey, this.stringToSign(datetime));
  }

  stringToSign(datetime: string): string {
    const parts: string[] = [];
    parts.push('HMAC-SHA256');
    parts.push(datetime);
    parts.push(this.credentialString(datetime));
    parts.push(hexEncodedHash(this.canonicalString()));
    const result = parts.join("\n");
    return result;
  }

  canonicalString(): string {
    const parts: string[] = [];
    const path = (this.request.pathname || "/").split('?')[0];
    const pathname = path.startsWith('/') ? path : '/' + path;

    parts.push(this.request.method.toUpperCase());
    parts.push(pathname);
    const queryString = queryParamsToString(this.request.params) || "";
    parts.push(queryString);
    parts.push(`${this.canonicalHeaders()}\n`);
    parts.push(this.signedHeaders());
    parts.push(this.hexEncodedBodyHash());
    const result = parts.join("\n");
    return result;
  }

  canonicalHeaders(): string {
    const headers: [string, string][] = [];
    Object.keys(this.request.headers).forEach((key) => {
      headers.push([key, this.request.headers[key]]);
    });
    headers.sort((a, b) => (a[0].toLowerCase() < b[0].toLowerCase() ? -1 : 1));
    const parts: string[] = [];
    headers.forEach((item) => {
      const key = item[0].toLowerCase();
      if (this.isSignableHeader(key)) {
        const value = item[1];
        if (
          typeof value === "undefined" ||
          value === null ||
          typeof value.toString !== "function"
        ) {
          throw new Error(`Header ${key} contains invalid value`);
        }
        parts.push(`${key}:${this.canonicalHeaderValues(value.toString())}`);
      }
    });
    return parts.join("\n");
  }

  canonicalHeaderValues(values: string): string {
    return values.replace(/\s+/g, " ").replace(/^\s+|\s+$/g, "");
  }

  signedHeaders(): string {
    const keys: string[] = [];
    Object.keys(this.request.headers).forEach((key) => {
      key = key.toLowerCase();
      if (this.isSignableHeader(key)) {
        keys.push(key);
      }
    });
    return keys.sort().join(";");
  }

  signedQueries(): string {
    return Object.keys(this.request.params).join(";");
  }

  credentialString(datetime: string): string {
    return this.createScope(datetime.substring(0, 8), this.request.region);
  }


  hexEncodedBodyHash(): string {
    if (this.request.headers['X-Content-Sha256']) {
      return this.request.headers['X-Content-Sha256'];
    }

    if (this.request.body) {
      return hexEncodedHash(queryParamsToString(this.request.body));
    }
    return hexEncodedHash("");
  }

  isSignableHeader(key: string): boolean {
    return unsignableHeaders.indexOf(key) < 0;
  }

  iso8601(date?: Date): string {
    if (date === undefined) {
      date = new Date();
    }
    return date.toISOString().replace(/\.\d{3}Z$/, "Z");
  }

  getSigningKey(credentials: Credentials, date: string, region: string): string {
    const kDate = hmacSHA256(`${credentials.secretKey}`, date);
    const kRegion = hmacSHA256(kDate, region);
    const kService = hmacSHA256(kRegion, 'request');

    return hmacSHA256(kService, 'request');
  }

    createScope(date: string, region: string): string {
    return [date.substring(0, 8), region, 'request'].join("/");
  }
}
