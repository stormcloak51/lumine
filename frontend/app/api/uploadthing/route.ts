import { createRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
	config: {
		token: process.env.NEXT_PUBLIC_UPLOADTHING_TOKEN
	}
});
