import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico?v=2" />
        <meta
          name="googlebot"
          content="A simple football organizer showing payments based on emails"
        />
        <meta
          name="robots"
          content="A simple football organizer showing payments based on emails"
        />
      </Head>
      <body className="dark:bg-slate-900 dark:text-slate-50 min-h-screen bg-white font-sans text-slate-900 antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}