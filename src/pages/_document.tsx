import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" className="h-full">
      <Head>
        <link rel="icon" href="/favicon.ico?v=2" />
        <meta
          name="googlebot"
          content="A simple Event Wizard showing payments based on emails"
        />
        <meta
          name="robots"
          content="A simple Event Wizard showing payments based on emails"
        />
        <meta
          name="description"
          content="A simple Event Wizard showing payments based on emails"
        />

        <meta name="title" content="Event Wizard" />
      </Head>
      <body className="h-full dark:bg-slate-900 dark:text-slate-50 min-h-screen bg-white font-sans text-slate-900 antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
