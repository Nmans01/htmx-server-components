import { PropsWithChildren } from "@kitajs/html";
import Elysia from "elysia";

export const createPage = <
    App extends Elysia<any, any, any, any, any, any, any, any> = Elysia,
>() => <
    const Route extends string,
    Handler = Parameters<App['get']>[1],
    Context = Handler extends (...args: any) => any
    ? Parameters<Handler>[0]
    : never
>(
    route: Route,
    handlerComponent: Context extends never ? never : (c: Context) => JSX.Element,
    options?: Parameters<App['get']>[2],
) => {

        return [
            (app: App) =>
                app.get(route, c => handlerComponent(c), options),

            ({ children, ...props }: PropsWithChildren) =>
                <a href={route} {...props}>
                    {children}
                </a>
        ] as const;
    }