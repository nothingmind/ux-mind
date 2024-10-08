import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

import { PAGES } from '@/lib/pages';

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers
    }
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));

          response = NextResponse.next({ request });

          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        }
      }
    }
  );

  const {
    error,
    data: { user }
  } = await supabase.auth.getUser();

  if (request.nextUrl.pathname.startsWith(PAGES.RECIPES) && error) {
    return NextResponse.redirect(new URL(PAGES.SIGN_IN, request.url));
  }

  if (user && [PAGES.SIGN_IN, PAGES.SIGN_UP].includes(request.nextUrl.pathname as PAGES)) {
    return NextResponse.redirect(new URL(PAGES.RECIPES, request.url));
  }

  return response;
}
