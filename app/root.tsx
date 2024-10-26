import {
    json,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import i18next from "@/i18next.server";
import { useTranslation } from "react-i18next";
import { useChangeLanguage } from "remix-i18next/react";
import { Toaster } from "sonner";

import { NextUIProvider } from "@nextui-org/react";
import "react-image-crop/dist/ReactCrop.css";
import "react-circular-progressbar/dist/styles.css";
import "./tailwind.css";

export async function loader({ request }: LoaderArgs) {
    const locale = await i18next.getLocale(request);
    return json({ locale });
}

export const links: LinksFunction = () => [
    {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
    },
];

export default function App() {
    // Get the locale from the loader
    const { locale } = useLoaderData<typeof loader>();
    const { i18n } = useTranslation();

    // This hook will change the i18n instance language to the current locale
    // detected by the loader, this way, when we do something to change the
    // language, this locale will change and i18next will load the correct
    // translation files
    useChangeLanguage(locale);

    return (
        <html lang={locale} dir={i18n.dir()}>
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <Meta />
                <Links />
            </head>
            <body>
                <NextUIProvider locale="es-ES">
                    <Outlet />
                    <Toaster richColors />
                </NextUIProvider>

                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}
