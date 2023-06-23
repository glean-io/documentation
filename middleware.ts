import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // never redirect requests against files with extensions, as those include
  // hashes that may be case sensitive
  const pathComponents = request.nextUrl.pathname.split("/");
  const lastPathComponent = pathComponents[pathComponents.length - 1];
  if (lastPathComponent.includes(".")) return NextResponse.next();

  // Otherwise, redirect to the same request with a lowercase path
  if (request.nextUrl.pathname === request.nextUrl.pathname.toLowerCase())
    return NextResponse.next();
  return NextResponse.redirect(
    `${request.nextUrl.origin}${request.nextUrl.pathname.toLowerCase()}`
  );
}
