import { createServerComponent } from "../../../createServerComponent";

export const [mountTestComponent2, TestComponent2] =
  createServerComponent()(
    "GET", "/test/2",

    // Result of pressing button
    () => {

      return <>WHAT???</>;
    },

    // To be placed in page
    (props) => <>
      <button {...props}>
        Click me to see the next thing.
      </button>
    </>,
    {
      swapOob: ""
    }
  );
