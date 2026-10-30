// First path segment -> target service name
// Left blank: no service currently available
const ROUTES = {
  "dog-map": "DOG_MAP",
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const first = url.pathname.split("/")[1];   // "/reborn/a.js" → "reborn"
    const binding = Object.hasOwn(ROUTES, first) ? ROUTES[first] : null;

    if (binding) {
      // Redirect to trailing slash if missing (e.g., "/reborn" -> "/reborn/")
      if (url.pathname === `/${first}`) {
        url.pathname = `/${first}/`;
        return Response.redirect(url.toString(), 301);
      }
      // Forward request as-is to the target service
      return env[binding].fetch(request);
    }

    // Serve gateway's own files (landing page, etc.) if not a registered service
    return env.ASSETS.fetch(request);
  },
};
