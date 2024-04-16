import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // this is a quicl fix for an issue between clerk auth middleware and uploadthing
  // to replicate simply remove this route from public routes
  // you should be looking into solving this in the future
  publicRoutes: ["/api/uploadthing", "/", "/logo.svg", "/favicon.ico"],
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
