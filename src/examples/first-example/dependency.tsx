import { html } from "@elysiajs/html";
import Elysia from "elysia";

export const dependency = new Elysia()
  .use(html({}))
  .decorate({ test: "Hello" })
  .derive({ as: "global" }, c => ({
    getUrl: () => c.request.url
  }));
