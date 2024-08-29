import { createPage } from "../../../createPage";
import { Page } from "./Page";
import { LinkToPage2 } from "./Page2";
import { TestComponent } from "./TestComponent";

export const [mountPage, LinkToPage] = createPage()(
  "/",
  () => <Page>
    <LinkToPage2>Go to page 2.</LinkToPage2>
    <br />
    <TestComponent message="Hi" />
  </Page>
);
