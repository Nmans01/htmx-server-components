import Elysia from "elysia";
import { p } from "../../utils";
import { mountPage } from "./components/Page1";
import { mountPage2 } from "./components/Page2";
import { mountTestComponent } from "./components/TestComponent";
import { dependency } from "./dependency";
import { mountTestComponent2 } from "./components/TestComponent2";

const compsToMount = [
  mountTestComponent,
  mountPage,
  mountPage2,
  mountTestComponent2
] as const;

const app = p(new Elysia()
  .use(dependency),
  ...compsToMount
)
  .listen(4000, () => { console.log("Listening on 4000") });