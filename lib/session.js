import { randomUUID } from "crypto";

export function getOrSetSessionId(reqHeaders, resHeaders) {
  // read existing cookie
  const cookieHeader = reqHeaders.get("cookie") || "";
  const match = cookieHeader.match(/cb_session=([^;]+)/);
  if (match) return match[1];

  // set new cookie
  const sid = randomUUID();
  const cookie = `cb_session=${sid}; Path=/; Max-Age=${60*60*24*365}; SameSite=Lax`;
  resHeaders.append("Set-Cookie", cookie);
  return sid;
}
