import { authMiddleware } from "@clerk/nextjs";
export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/webhooks(.*)",
    "/(api|trpc)(.*)",
    "/services",
    "/services/(.*)",
    "/developers",
    "/about",
    "/contact",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
