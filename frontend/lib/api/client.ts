import { clearToken, getToken } from "@/lib/auth";
import type { ApiResponse } from "@/lib/api/types";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
  "http://localhost:4000";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

type RequestOptions = {
  method?: string;
  body?: unknown;
  auth?: boolean;
  formData?: FormData;
};

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { method = "GET", body, auth = true, formData } = options;
  const headers: HeadersInit = {};

  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  if (!formData && body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: formData ?? (body !== undefined ? JSON.stringify(body) : undefined),
  });

  let payload: ApiResponse<T> | { success: false; message: string } | null =
    null;

  try {
    payload = await res.json();
  } catch {
    payload = null;
  }

  if (!res.ok) {
    if (res.status === 401 && auth) {
      clearToken();
    }
    throw new ApiError(
      payload?.message || `Request failed (${res.status})`,
      res.status,
    );
  }

  if (!payload || typeof payload !== "object" || !("data" in payload)) {
    throw new ApiError("Unexpected API response", res.status);
  }

  return payload.data;
}
