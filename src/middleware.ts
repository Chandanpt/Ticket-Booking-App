import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { store } from "./redux/store";

export function middleware(request: NextRequest) {
  const isAuthenticated = store.getState().auth.isAuthenticated;
  console.log("isAuthenticated", isAuthenticated);

  // if (isAuthenticated) {
    return NextResponse.next();
  // } else {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }
}

export const config = {
  matcher: '/login',
};
