import { createServerComponent } from "../../../createServerComponent";
import { dependency } from "../dependency";
import { TestComponent2 } from "./TestComponent2";

export const [mountTestComponent, TestComponent] =
  createServerComponent<typeof dependency, { message?: string; }>()(
    "GET", "/test",

    // Result of pressing button
    ({ test, getUrl }) => {

      const url = getUrl();

      return <>
        <br />
        {test}. You requested {url}.
        <br />
        <TestComponent2 />
      </>;
    },

    // To be placed in page
    ({ message, ...props }) => <>
      {message}
      <br />
      <button {...props} hx-swap="afterend">
        Click me to see Hello.
      </button>
    </>
  );
