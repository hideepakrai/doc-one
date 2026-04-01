import { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function isAdmin(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;

  if (!token) {
    return false;
  }

  try {
    const secretText = process.env.JWT_SECRET || 'fallback_secret_for_dev';
    const secret = new TextEncoder().encode(secretText);

    // Verify the JWT
    await jwtVerify(token, secret);
    return true;
  } catch (error) {
    console.warn("API Auth failed:", error);
    return false;
  }
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
