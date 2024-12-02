import { createRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";

// Export routes for Next App Router
export const { GET: getMedia, POST: uploadMedia } = createRouteHandler({
  router: ourFileRouter,

  config: {
		token: process.env.NEXT_PUBLIC_UPLOADTHING_TOKEN
	}
});
