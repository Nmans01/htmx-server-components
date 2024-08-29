import { t } from "elysia";
import { createPage } from "../../../createPage";
import { Page } from "./Page";
import { LinkToPage } from "./Page1";
import { TestComponent } from "./TestComponent";

export const [mountPage2, LinkToPage2] = createPage()(
    "/2",
    ({ query: { q } }) =>
      <Page>
        Query: {q}
        <br />
        This is a different page.
        <TestComponent />
        <LinkToPage>Go to home page.</LinkToPage>
      </Page>,
    {
      query: t.Object({ q: t.Optional(t.String()) })
    }
  );