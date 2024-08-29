import { PropsWithChildren } from "@kitajs/html";

export const Page = ({ children }: PropsWithChildren) =>
    <html>
        <head>
            <script src="https://unpkg.com/htmx.org@2.0.2"></script>
        </head>
        <body>{children}</body>
    </html>;