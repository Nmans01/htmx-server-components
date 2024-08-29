import Elysia from "elysia";

type MethodType = "GET" | "POST";
type HxProp<Method extends MethodType, R extends string> = Method extends "GET"
    ? { "hx-get": R }
    : { "hx-post": R };

export const createServerComponent = <
    App extends Elysia<any, any, any, any, any, any, any, any> = Elysia,
    P extends Record<string, any> = {},
>() => <
    const Route extends string,
    Method extends MethodType,
    Handler = Parameters<App[Method extends "GET" ? 'get' : "post"]>[1],
    Context = Handler extends (...args: any) => any
    ? Parameters<Handler>[0]
    : never
>(
    method: Method,
    route: Route,
    handlerComponent: Context extends never ? never : (c: Context) => JSX.Element,
    component: (props: P & (Method extends "GET"
        ? { "hx-get": Route }
        : { "hx-post": Route })
    ) => JSX.Element,
    options?: Parameters<App[Method extends "GET" ? 'get' : 'post']>[2] & { swapOob?: string },
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
                    ? app.get(route, c => handlerComponent(c), options)
                    : app.post(route, c => handlerComponent(c), options)
                )
            ),
            ((p) => component({ ...p, ...hxProps })) as ((p: P & Omit<Parameters<typeof component>[0], "hx-get" | "hx-post">) => JSX.Element)
        ] as const;
    };