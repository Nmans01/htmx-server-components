import { p } from "@common/utils/pipe";
import Elysia, { InferContext } from "elysia";

type MethodType = "GET" | "POST";
type HxProp<Method extends MethodType, R extends string> = Method extends "GET"
    ? { "hx-get": R }
    : { "hx-post": R };

const createServerComponent = <
    App extends Elysia<any, any, any, any, any, any, any, any>,
>() => <
    const Route extends string,
    Method extends MethodType,
    P extends Record<string, any> = {},
>(
    method: Method,
    route: Route,
    handlerComponent: (c: InferContext<App>) => JSX.Element,
    component: (props: P & Method extends "GET"
        ? { "hx-get": Route }
        : { "hx-post": Route }
    ) => JSX.Element,
    options?: Parameters<App['get']>[2],
) => {

        // If route contains params...
        // Have to require params object as property of component for typesafety
        // Then hx-get/hx-post must become a function that takes in params object and 

        const hxProps = (method === "GET"
            ? { "hx-get": route }
            : { "hx-post": route }
        ) as HxProp<Method, Route>;

        return [
            (app: App) => (
                (method === "GET"
                    ? app.get
                    : app.post
                )
                    (route, c => handlerComponent(c), options)
            ),
            ((p) => component({ ...p, ...hxProps })) as ((p: Parameters<typeof component>) => JSX.Element)
        ] as const;
    };

const dependency = new Elysia()
    .decorate({ test: "Hello" })

const [mountTestComponent, TestComponent] = createServerComponent<typeof dependency>()(

    "GET", "/test", c => <>{c.test}</>,

    (props) =>
        <button {...props}>
            Click me to see Hello.
        </button>
);

const app = p(new Elysia()
    .use(dependency),
    mountTestComponent,
)