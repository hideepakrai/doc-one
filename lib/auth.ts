import { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export type AuthRole = "admin" | "doctor" | "patient";

export async function getAuthContext(request: NextRequest): Promise<{ authenticated: boolean; role?: AuthRole; payload?: any }> {
  const token = request.cookies.get('admin_token')?.value;

  if (!token) {
    return { authenticated: false };
  }

  try {
    const secretText = process.env.JWT_SECRET || 'fallback_secret_for_dev';
    const secret = new TextEncoder().encode(secretText);

    const { payload } = await jwtVerify(token, secret);
    return {
      authenticated: true,
      role: payload.role as AuthRole | undefined,
      payload,
    };
  } catch (error) {
    console.warn("API Auth failed:", error);
    return { authenticated: false };
  }
}

export async function isAdmin(request: NextRequest) {
  const auth = await getAuthContext(request);
  return auth.authenticated && auth.role === "admin";
}

export async function hasRole(request: NextRequest, roles: AuthRole[]) {
  const auth = await getAuthContext(request);
  return auth.authenticated && !!auth.role && roles.includes(auth.role);
}

/**
 * Higher-order function to protect admin-only API routes
 */
export function withAdminAuth(handler: Function) {
  return async (req: NextRequest, ...args: any[]) => {
    const authorized = await isAdmin(req);
    if (!authorized) {
      return new Response(JSON.stringify({ error: "Unauthorized. Admin access required." }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return handler(req, ...args);
  };
}
